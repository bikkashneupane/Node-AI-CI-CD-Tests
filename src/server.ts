import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./routes/user";
import { bookRouter } from "./routes/books";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

// Server route
app.get("/", (req: Request, res: Response) => {
  const uptime = process.uptime();
  const hours: number = Math.floor(uptime / 3600);
  const minutes: number = Math.floor((uptime % 3600) / 60);
  const seconds: number = Math.floor(uptime % 60);

  res.status(200).json({
    message: "Server Is Live.",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
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
// If this file is the entrypoint/ called directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
