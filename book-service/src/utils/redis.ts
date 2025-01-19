import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

// Event listeners for logging
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error", err);
});

// Connect function to ensure a singleton connection
export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    try {
      console.log("Attempting to connect to Redis...");
      await redisClient.connect();
      console.log("Redis connection successful");
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      throw error;
    }
  } else {
    console.log("Redis client already connected");
  }
};

// Initialize connection when the module is loaded
(async () => {
  await connectRedis();
})();

export default redisClient;
