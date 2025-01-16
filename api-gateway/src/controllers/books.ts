import { BookModel, IBook } from "../schema/bookSchema";
import mongoose from "mongoose";

// Insert
export const insertBook = (bookObj: IBook): Promise<IBook> => {
  return new BookModel(bookObj).save();
};

// Read
export const getBooks = (filter: Partial<IBook>): Promise<IBook[]> => {
  return BookModel.find(filter).exec();
};

// Read single book
export const getSingleBook = (
  filter: Partial<IBook>
): Promise<IBook | null> => {
  return BookModel.findOne(filter).exec();
};
// Update
export const updateBook = (
  filter: Partial<IBook>,
  updateObj: Partial<IBook>
): Promise<IBook | null> => {
  return BookModel.findOneAndUpdate(filter, updateObj, { new: true }).exec();
};

// Delete
export const deleteBook = (
  _id: mongoose.Types.ObjectId
): Promise<IBook | null> => {
  return BookModel.findByIdAndDelete(_id).exec();
};
