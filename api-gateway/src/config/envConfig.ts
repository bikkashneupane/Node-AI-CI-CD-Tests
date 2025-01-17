export const envConfig = {
  MONGO_URI:
    (process.env.MONGO_URI as string) ||
    "mongodb://localhost:27017/ultimate_node",
  SALT: process.env.SALT || 10,
};
