import mongoose, { Document, Model, Schema } from "mongoose";
export interface IBook {
  name: string;
  author: string;
  publishedDate: Date;
  ratings?: number;
  price: number;
}

export interface IBookDocs extends IBook, Document {}

const schema: Schema<IBookDocs> = new mongoose.Schema<IBookDocs>(
  {
    name: { type: String, required: true, index: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    ratings: { type: Number },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const BookModel: Model<IBookDocs> = mongoose.model<IBookDocs>(
  "Books",
  schema
);
