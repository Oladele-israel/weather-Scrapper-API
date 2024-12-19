import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClientInstance = null;

const createRedisClient = async () => {
  if (redisClientInstance) {
    console.log("Reusing existing Redis client instance.");
    return redisClientInstance;
  }

  const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
  const REDIS_PORT = process.env.REDIS_PORT || "6379";

  const redisClient = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis successfully.");
  });

  try {
    await redisClient.connect();
    redisClientInstance = redisClient;
    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};

export default createRedisClient;
