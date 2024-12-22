import express, { NextFunction, Request, Response, Router } from "express";
import { validateBook } from "../middlewares/joiValidator";
import { getBooks, insertBook } from "../controllers/books";
import { IBook } from "../interfaces/IBook";
import redisClient from "../utils/redis";

const router = express.Router();

// GET
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check if cached data is present
    const cachKey: string = "cached_books";

    let cachedBooks: string | null = null;
    try {
      cachedBooks = await redisClient.get(cachKey);
    } catch (redisError) {
      console.error("Error fetching from Redis:", redisError);
    }

    if (cachedBooks) {
      res.status(200).json({
        books: JSON.parse(cachedBooks),
      });
      return;
    }

    // get book
    const books = await getBooks({});

    if (books?.length === 0) {
      next({ message: "Books not found", status: 404 });
    }

    // cach for 60 secs
    if (books?.length > 0) {
      await redisClient.setEx(cachKey, 60, JSON.stringify(books));
      res.status(200).json({
        books,
      });
    }
  } catch (error) {
    next(error);
  }
});

// POST
router.post(
  "/",
  validateBook,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, author, publishedDate, price, ratings }: Partial<IBook> =
        req.body;

      // Insert Book
      const book = await insertBook({
        name,
        author,
        publishedDate,
        price,
        ratings,
      });

      !book?.id
        ? next({ message: "Error Adding Book", status: 500 })
        : res.status(201).json({ message: "Book Added" });
    } catch (error) {
      next(error);
    }
  }
);

export const bookRouter: Router = router;
