import { io } from "../socket.js";

import { SubscribeToRedisChannel } from "../databases/redis-database.js";

const MessageReceived = () => {
  SubscribeToRedisChannel("chatRoom:*", (message: string) => {
    const parsedMessage = JSON.parse(message);

    const { sender, message: msg, timestamp } = parsedMessage;

    io.to(`chatRoom:${parsedMessage.sessionId}`).emit("receiveMessage", {
      sender,
      message: msg,
      timestamp,
    });

    console.info(
      `Message from ${sender} sent to clients in chatRoom:${parsedMessage.sessionId}`
    );
  });
};

export { MessageReceived };
