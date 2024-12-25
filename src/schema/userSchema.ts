import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshJWT?: string;
}

export interface IUserDocs extends IUser, Document {}
const schema: Schema<IUserDocs> = new mongoose.Schema<IUserDocs>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    refreshJWT: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUserDocs> = mongoose.model<IUserDocs>(
  "User",
  schema
);
