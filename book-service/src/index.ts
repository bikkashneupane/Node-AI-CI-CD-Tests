import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { envConfig } from "./config/envConfig";
import { bookRouter } from "./routes/books";
import { connectMongo } from "./config/mongo";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// connect to mongo
connectMongo();

// Routes
app.use("/api/v1/books", bookRouter);

// Server route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server Is Live.",
  });
});

// 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 404,
    message: "404 Not Found",
  });
});

class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

// Global Error handler
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: error.message,
  });
});

// Start the server
// This block of code will only run if the file is executed directly
if (require.main === module) {
  app.listen(envConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
  });
}

export default app;
