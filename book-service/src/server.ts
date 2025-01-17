import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { envConfig } from "./config/envConfig";
import { bookRouter } from "./routes/books";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/", bookRouter);

// Start the server
// This block of code will only run if the file is executed directly
if (require.main === module) {
  app.listen(envConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
  });
}

export default app;
