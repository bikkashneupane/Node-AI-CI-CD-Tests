import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const createProxyMiddleware = (url: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return next({
          status: error.response?.status || 500,
          message: error.response?.data?.error,
        });
      }
      next(error);
    }
  };
};
