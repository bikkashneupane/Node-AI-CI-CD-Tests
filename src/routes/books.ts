import express, { NextFunction, Request, Response, Router } from "express";
import { validateBook } from "../middlewares/joiValidator";
import { getBooks, insertBook } from "../controllers/books";
import { IBookBase } from "../interfaces/IBook";

const router = express.Router();

// GET
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get book
    const books = await getBooks({});

    books?.length === 0
      ? next({ message: "Books not found", status: 404 })
      : res.status(200).json({
          books,
        });
    // response
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
      const { name, author, publishedDate, price, ratings }: IBookBase =
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
