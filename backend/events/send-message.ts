import { PublishToRedisChannel } from "../databases/redis-database.js";

const SendMessage = (socket: any) => {
  socket.on(
    "sendMessage",
    (data: { sessionId: string; sender: string; message: string }) => {
      const { sessionId, sender, message } = data;

      const payload = JSON.stringify({
        sender,
        message,
        timestamp: Date.now(),
      });

      PublishToRedisChannel(`chatRoom:${sessionId}`, payload);

      console.info(`Message from ${sender} published to chatRoom:${sessionId}`);
    }
  );
};

export { SendMessage };
