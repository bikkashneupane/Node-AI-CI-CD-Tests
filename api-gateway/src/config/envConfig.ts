export const envConfig = {
  MONGO_URI: process.env.MONGO_URI as string,
  SALT: process.env.SALT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};
