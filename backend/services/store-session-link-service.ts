import { RedisDatabase } from "../databases/redis-database.js";

export const StoreSessionLinkService = async (
  sessionId: string,
  sessionData: any,
  ttl: number = 300
): Promise<void> => {
  try {
    await RedisDatabase?.setex(sessionId, ttl, JSON.stringify(sessionData));
    console.info(`Session stored in Redis with sessionId: ${sessionId}`);
  } catch (error) {
    console.error("Error storing session in Redis:", error);
  }
};
