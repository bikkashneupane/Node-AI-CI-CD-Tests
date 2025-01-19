import express, { NextFunction, Request, Response } from "express";
import { validateBook } from "../middlewares/joiValidator";
import { getBooks, insertBook } from "../controllers/books";
import redisClient from "../utils/redis";
import { IBook, IBookDocs } from "../schema/bookSchema";

const router = express.Router();

// GET
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cacheKey = "cached_books";
    try {
      // Attempt to fetch cached data
      const cachedBooks = await redisClient.get(cacheKey);
      if (cachedBooks) {
        res.status(200).json(JSON.parse(cachedBooks));
        return;
      }

      // Fetch books from database
      const books = await getBooks({});
      if (!books || books.length === 0) {
        next({ message: "Books not found", status: 404 });
        return;
      }

      // Cache books and respond
      await redisClient.setEx(cacheKey, 60, JSON.stringify(books));
      res.status(200).json({ books: [{ name: "Banana" }] });
    } catch (error) {
      next(error);
    }
  }
);

// POST
router.post(
  "/",
  validateBook,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, author, publishedDate, price, ratings }: IBook = req.body;

      // Insert Book
      const book: Partial<IBookDocs> = await insertBook({
        name,
        author,
        publishedDate,
        price,
        ratings,
      });

      !book?._id
        ? next({ message: "Error Adding Book", status: 500 })
        : res.status(201).json({ message: "Book Added" });
    } catch (error) {
      next(error);
    }
  }
);

export const bookRouter = router;
