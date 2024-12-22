import mongoose, { Model, Schema } from "mongoose";
import { IBook } from "../interfaces/IBook";

const schema: Schema<IBook> = new mongoose.Schema<IBook>(
  {
    name: { type: String, required: true, index: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    ratings: { type: Number },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const BookModel: Model<IBook> = mongoose.model<IBook>("Books", schema);
