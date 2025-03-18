import { Server as SocketServer } from "socket.io";

import { JoinRoom } from "./events/join-room.js";
import { SendMessage } from "./events/send-message.js";
import { Disconnect } from "./events/disconnect.js";
import { MessageReceived } from "./events/message-received.js";
import { ErrorHandler } from "./events/error-handler.js";
import { LeaveRoom } from "events/leave-room.js";

let io: SocketServer;

const InitializeSocket = (server: any) => {
  io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.info(`New socket connection: ${socket.id}`);

    JoinRoom(io, socket);
    SendMessage(socket);
    Disconnect(socket);
    LeaveRoom(io, socket);
    ErrorHandler(socket);
  });

  MessageReceived();
};

export { io, InitializeSocket };
