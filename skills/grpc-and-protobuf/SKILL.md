---
name: grpc-and-protobuf
description: Use when building high-performance inter-service communication with gRPC, defining Protocol Buffers schemas, streaming RPCs, and binary serialization.
---

# High-Performance gRPC & Protocol Buffers

gRPC uses HTTP/2 multiplexing and compact binary Protocol Buffers (Protobuf) serialization, delivering up to 7-10x higher throughput and lower CPU overhead than JSON/REST for internal microservice communication.

---

## 1. Protocol Buffers Schema Definition (`user_service.proto`)

```protobuf
syntax = "proto3";

package users.v1;

service UserService {
  rpc GetUser (GetUserRequest) returns (UserResponse);
  rpc StreamUserActivities (UserActivityRequest) returns (stream ActivityEvent);
}

message GetUserRequest {
  string user_id = 1;
}

message UserResponse {
  string id = 1;
  string email = 2;
  string full_name = 3;
  int64 created_at_unix = 4;
}

message UserActivityRequest {
  string user_id = 1;
}

message ActivityEvent {
  string event_id = 1;
  string action = 2;
  int64 timestamp = 3;
}
```

---

## 2. Implementing the Server in Node.js

```typescript
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, './user_service.proto'),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const server = new grpc.Server();

server.addService(proto.users.v1.UserService.service, {
  GetUser: async (call: any, callback: any) => {
    const user = await db.findUser(call.request.user_id);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'User does not exist',
      });
    }
    callback(null, user);
  },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server listening on port 50051');
});
```
