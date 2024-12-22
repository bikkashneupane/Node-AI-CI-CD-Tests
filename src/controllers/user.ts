import mongoose, { DeleteResult, FilterQuery, UpdateQuery } from "mongoose";
import { IUser, UserModel } from "../schema/userSchema";

export const insertUser = (userObj: IUser): Promise<IUser> => {
  return new UserModel(userObj).save();
};

export const getUsers = (
  filter: FilterQuery<Partial<IUser>>
): Promise<IUser[]> => {
  return UserModel.find(filter).exec();
};

export const getSingleUser = (
  filter: FilterQuery<Partial<IUser>>
): Promise<IUser | null> => {
  return UserModel.findOne(filter).exec();
};

export const updateUser = (
  filter: FilterQuery<Partial<IUser>>,
  updateObj: UpdateQuery<Partial<IUser>>
): Promise<IUser | null> => {
  return UserModel.findOneAndUpdate(filter, updateObj, { new: true }).exec();
};

export const deleteUser = (
  _id: mongoose.Types.ObjectId
): Promise<IUser | null> => {
  return UserModel.findByIdAndDelete(_id).exec();
};

export const deleteMultipleUsers = (
  ids: mongoose.Types.ObjectId[]
): Promise<DeleteResult> => {
  return UserModel.deleteMany({ _id: { $in: ids } });
};
