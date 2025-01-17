const envConfig = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ultimate_node",
  PORT: process.env.PORT || 3001,
};

export default envConfig;
