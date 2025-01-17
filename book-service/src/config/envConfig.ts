export const envConfig = {
  PORT: 3003,
  MONGO_URI:
    (process.env.MONGO_URI as string) ||
    "mongodb://localhost:27017/ultimate_node",
};
