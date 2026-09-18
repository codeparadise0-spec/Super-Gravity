---
name: websocket-realtime-architecture
description: Use when building real-time applications with WebSockets, Socket.io, heartbeat ping/pong protocols, room multiplexing, and Redis Pub/Sub scaling.
---

# Real-Time WebSocket & Socket.io Architecture

WebSockets establish full-duplex, persistent TCP connections for real-time collaboration, chat, live streaming metrics, and instant notification feeds.

---

## 1. Multi-Server Scaling with Redis Pub/Sub Adapter

When running multiple Node.js instances behind a load balancer, clients connected to Server A cannot emit events to clients connected to Server B unless synchronized via a Redis Pub/Sub adapter:

```typescript
// server.ts
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server({
  cors: { origin: 'https://app.example.com', credentials: true },
  pingInterval: 25000, // 25s heartbeat
  pingTimeout: 20000,  // 20s timeout before drop
});

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);
io.adapter(createAdapter(pubClient, subClient));
```

---

## 2. Room Multiplexing & Authentication Middleware

```typescript
// Authenticate socket handshake via JWT
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = verifyToken(token);
    socket.data.user = payload;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.data.user.id;
  console.log(`User connected: ${userId}`);

  // Join private personal notification channel
  socket.join(`user:${userId}`);

  // Join collaborative room
  socket.on('join_document', ({ documentId }) => {
    socket.join(`doc:${documentId}`);
  });

  // Broadcast edits to room (excluding sender)
  socket.on('edit_document', ({ documentId, delta }) => {
    socket.to(`doc:${documentId}`).emit('document_updated', delta);
  });
});
```
