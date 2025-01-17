import { createClient } from "redis";

const redis = createClient({
  url: "redis://127.0.0.1:6379",
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

(async () => {
  await redis.connect();
})();

export default redis;
