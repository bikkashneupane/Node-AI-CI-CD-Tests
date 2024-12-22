import { Document } from "mongoose";

export interface IBookBase {
  name: string;
  author: string;
  publishedDate: Date;
  ratings?: number;
  price: number;
}

export interface IBook extends IBookBase, Document {}
