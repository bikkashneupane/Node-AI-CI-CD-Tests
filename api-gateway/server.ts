import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { userRouter, chatRouter, bookRouter } from "./src/routes/appRoutes";
import morgan from "morgan";
import logger from "./src/utils/logger";
const morganFormat = ":method :url :status :response-time ms";

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

// morgan logger middleware
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
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

// express-rate-limit for user api
const userLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Routes
// user, chat, book services
app.use("/users", userLimiter, userRouter);
app.use("/chat", chatRouter);
app.use("/books", bookRouter);

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
