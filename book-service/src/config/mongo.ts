import mongoose from "mongoose";
import { envConfig } from "./envConfig";

export const connectMongo = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
