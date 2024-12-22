import { BookModel } from "../schema/bookSchema";
import { IBook, IBookBase } from "../interfaces/IBook";
import mongoose, { FilterQuery, UpdateQuery } from "mongoose";

// Insert
export const insertBook = (bookObj: IBookBase): Promise<IBook> => {
  return new BookModel(bookObj).save();
};

// Read
export const getBooks = (
  filter: FilterQuery<Partial<IBook>>
): Promise<IBook[]> => {
  return BookModel.find(filter).exec();
};

// Read single book
export const getSingleBook = (
  filter: FilterQuery<Partial<IBook>>
): Promise<IBook | null> => {
  return BookModel.findOne(filter).exec();
};
// Update
export const updateBook = (
  filter: FilterQuery<Partial<IBook>>,
  updateObj: UpdateQuery<Partial<IBook>>
): Promise<IBook | null> => {
  return BookModel.findOneAndUpdate(filter, updateObj, { new: true }).exec();
};

// Delete
export const deleteBook = (
  _id: mongoose.Types.ObjectId
): Promise<IBook | null> => {
  return BookModel.findByIdAndDelete(_id).exec();
};
