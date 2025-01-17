import { createClient } from "redis";

// Initialize Redis client
const redisClient = createClient({
  url: "redis://localhost:6379", // Redis server URL (default is localhost and port 6379)
});

// Handle connection events
redisClient
  .on("connect", () => console.log("Connected to Redis"))
  .on("error", (err) => console.error("Redis error:", err));

// Export the Redis client
export default redisClient;
