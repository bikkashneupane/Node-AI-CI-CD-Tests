import mongoose, { DeleteResult, FilterQuery, UpdateQuery } from "mongoose";
import { IUser, IUserDocs, UserModel } from "../schema/userSchema";

export const insertUser = (userObj: IUser): Promise<IUserDocs> => {
  return new UserModel(userObj).save();
};

export const getUsers = (
  filter: FilterQuery<Partial<IUserDocs>>
): Promise<IUserDocs[]> => {
  return UserModel.find(filter).exec();
};

export const getSingleUser = (
  filter: FilterQuery<Partial<IUserDocs>>
): Promise<IUserDocs | null> => {
  return UserModel.findOne(filter).exec();
};

export const updateUser = (
  filter: FilterQuery<Partial<IUserDocs>>,
  updateObj: UpdateQuery<Partial<IUserDocs>>
): Promise<IUserDocs | null> => {
  return UserModel.findOneAndUpdate(filter, updateObj, { new: true }).exec();
};

export const deleteUser = (
  _id: mongoose.Types.ObjectId
): Promise<IUserDocs | null> => {
  return UserModel.findByIdAndDelete(_id).exec();
};

export const deleteMultipleUsers = (
  ids: mongoose.Types.ObjectId[]
): Promise<DeleteResult> => {
  return UserModel.deleteMany({ _id: { $in: ids } });
};
