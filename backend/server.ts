import "dotenv/config";

import { createServer } from "http";

import { app } from "./app.js";
import { InitializeSocket } from "./socket.js";

import { ConnectMongooseDatabase } from "databases/mongoose-database.js";
import { ConnectRedis } from "databases/redis-database.js";

import { HandleException } from "./middlewares/exception-handler.js";
import { HandleRejection } from "./middlewares/rejection-handler.js";
import { GracefullyShutdown } from "middlewares/gracefully-shutdown.js";

HandleException();
const server = createServer(app);
InitializeSocket(server);
const PORT = process.env.PORT || 8000;

const StartServer = async (): Promise<void> => {
  try {
    server.listen(PORT, () => {
      console.info(`Server is running on port: ${PORT}`);
    });

    await ConnectMongooseDatabase();
    await ConnectRedis();

    HandleRejection(server);
    GracefullyShutdown(server);
  } catch (error) {
    console.error(`Failed to start the server: ${(error as Error).message}`);
    process.exit(1);
  }
};

StartServer();
