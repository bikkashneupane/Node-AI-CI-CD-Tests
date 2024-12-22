import { createClient } from "redis";

// Create a Redis client
const redisClient = createClient({
  url: "redis://localhost:6379", // Redis server URL (default is localhost and port 6379)
});

// Connect to Redis
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Error handling
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redisClient;
