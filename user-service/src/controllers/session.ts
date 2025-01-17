import { FilterQuery } from "mongoose";
import { SessionModel, ISession, ISessionDocs } from "../schema/sessionSchema";

export const insertSession = (tokenObj: ISession): Promise<ISessionDocs> => {
  return new SessionModel(tokenObj).save();
};

export const findSession = (
  token: FilterQuery<Partial<ISessionDocs>>
): Promise<ISessionDocs | null> => {
  return SessionModel.findOne(token).exec();
};
