import express from "express";
import { createProxyMiddleware } from "../utils/proxyMiddleware";

const userRouter = express.Router();
const chatRouter = express.Router();
const bookRouter = express.Router();

userRouter.use(
  "/",
  createProxyMiddleware("http://localhost:3001/api/v1/users")
);
chatRouter.use("/", createProxyMiddleware("http://localhost:3002/api/v1/chat"));
bookRouter.use(
  "/",
  createProxyMiddleware("http://localhost:3002/api/v1/books")
);

export { userRouter, chatRouter, bookRouter };
