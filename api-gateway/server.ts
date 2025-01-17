import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import axios from "axios";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// express-rate-limit => 5min, 100 api request allowed
const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// applies to all api(s)
app.use(globalLimiter);

const userLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Routes
// Use axios to make a request to chat-service, user-service and book-service
app.use("/books", async (req: Request, res: Response, next: NextFunction) => {
  axios
    .get("http://localhost:3003/api/v1/books")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
});

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
