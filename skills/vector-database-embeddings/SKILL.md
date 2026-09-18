---
name: vector-database-embeddings
description: Use when building Retrieval-Augmented Generation (RAG) systems, vector similarity search with pgvector or Pinecone, HNSW indexing, and text embeddings.
---

# Vector Database Embeddings & Semantic Search (pgvector)

Vector databases store high-dimensional mathematical representations (embeddings) of text, images, and documents to perform semantic similarity search.

---

## 1. Setting up `pgvector` in PostgreSQL

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table with 1536-dimensional vector (OpenAI text-embedding-3-small)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding vector(1536) NOT NULL
);

-- Build HNSW (Hierarchical Navigable Small World) index for fast sub-millisecond search
CREATE INDEX idx_documents_embedding_hnsw 
ON documents USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

---

## 2. Performing Cosine Similarity Search (`<=>`)

```typescript
import { db } from './db';

export async function searchSimilarDocuments(queryEmbedding: number[], limit: number = 5) {
  const formattedEmbedding = `[${queryEmbedding.join(',')}]`;

  // Cosine distance operator: <=>
  const results = await db.$queryRaw`
    SELECT id, content, metadata, 
           1 - (embedding <=> ${formattedEmbedding}::vector) AS similarity_score
    FROM documents
    WHERE 1 - (embedding <=> ${formattedEmbedding}::vector) > 0.75
    ORDER BY embedding <=> ${formattedEmbedding}::vector
    LIMIT ${limit};
  `;

  return results;
}
```
