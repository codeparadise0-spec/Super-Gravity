---
name: nodejs-streams-and-buffers
description: Use when processing large file payloads, CSV parsing, data transformations, and high-throughput network pipelines using Node.js Streams and backpressure.
---

# High-Throughput Node.js Streams & Backpressure

Loading an entire 1GB file into a memory buffer (`fs.readFile`) crashes the Node.js process with an Out-Of-Memory (OOM) error. Use Node.js Streams to process unbounded data in small chunks with backpressure management.

---

## 1. The Modern `stream.pipeline` Pattern

Always use `pipeline` from `stream/promises` because it automatically handles cleanup, backpressure, and destroys all streams if an error occurs:

```typescript
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { Transform } from 'stream';

// Custom transformation stream (e.g. upper-casing data chunks)
const uppercaseTransformer = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

async function compressAndTransformFile(inputPath: string, outputPath: string) {
  try {
    await pipeline(
      createReadStream(inputPath),
      uppercaseTransformer,
      createGzip(),
      createWriteStream(outputPath)
    );
    console.log('Stream pipeline completed successfully!');
  } catch (err) {
    console.error('Pipeline failed:', err);
  }
}
```

---

## 2. Streaming CSV Parsing with Backpressure
```typescript
import { pipeline } from 'stream/promises';
import fs from 'fs';
import csv from 'csv-parser';
import { Writable } from 'stream';

const batchDatabaseWriter = new Writable({
  objectMode: true,
  async write(record, encoding, callback) {
    try {
      await db.insertRecord(record);
      callback(); // Signals readiness for the next row
    } catch (err: any) {
      callback(err); // Halts pipeline on DB failure
    }
  },
});

await pipeline(
  fs.createReadStream('million-users.csv'),
  csv(),
  batchDatabaseWriter
);
```
