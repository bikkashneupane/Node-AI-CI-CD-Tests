import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISession {
  token: string;
  associate?: string;
}

export interface ISessionDocs extends ISession, Document {}

const schema: Schema<ISessionDocs> = new mongoose.Schema<ISessionDocs>({
  token: {
    type: String,
    required: true,
  },
  associate: {
    type: String,
  },
});

export const SessionModel: Model<ISessionDocs> = mongoose.model<ISessionDocs>(
  "Session",
  schema
);
