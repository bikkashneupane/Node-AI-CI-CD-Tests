import { Document } from "mongoose";

export interface IBook extends Document {
  name: string;
  author: string;
  publishedDate: Date;
  ratings?: number;
  price: number;
}
