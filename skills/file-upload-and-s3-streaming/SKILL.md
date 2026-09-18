---
name: file-upload-and-s3-streaming
description: Use when handling secure file uploads, direct-to-S3 presigned URLs, streaming multipart uploads, file type validation, and virus scanning.
---

# Secure File Uploads & S3 Direct Streaming

Handling multi-gigabyte file uploads directly through Node.js web servers exhausts server RAM and monopolizes worker connections. Use S3 Presigned URLs for direct browser-to-cloud uploads.

---

## 1. Direct-to-S3 Presigned URL Pattern (Recommended)

```
[Client] ── 1. Request Presigned Upload URL ──> [Node.js API]
   │                                                    │ (Validates permissions & file size limit)
   │ <─── 2. Returns Signed S3 PUT URL + S3 Key ────────┘
   │
   └── 3. Direct Binary PUT Upload (Bypasses Backend RAM) ──> [AWS S3 Bucket]
```

```typescript
// services/s3.service.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function generatePresignedUploadUrl(userId: string, filename: string, contentType: string) {
  // Enforce allowed MIME types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (!allowedTypes.includes(contentType)) {
    throw new BadRequestError('Invalid file type');
  }

  const s3Key = `uploads/${userId}/${crypto.randomUUID()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: s3Key,
    ContentType: contentType,
  });

  // URL expires in 15 minutes
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

  return { presignedUrl, s3Key };
}
```

---

## 2. Streaming Multipart Uploads through Node.js (`busboy`)

If the file must pass through backend validation first, stream it directly to S3 using `busboy` and `@aws-sdk/lib-storage` with zero disk/RAM buffering:

```typescript
import { Upload } from '@aws-sdk/lib-storage';
import busboy from 'busboy';

export function handleStreamingUpload(req: Request, s3Key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB

    bb.on('file', (name, fileStream, info) => {
      const parallelUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: s3Key,
          Body: fileStream,
          ContentType: info.mimeType,
        },
      });

      parallelUpload.done().then(resolve).catch(reject);
    });

    req.pipe(bb);
  });
}
```
