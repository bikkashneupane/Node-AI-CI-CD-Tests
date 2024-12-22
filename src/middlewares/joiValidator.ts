import { NextFunction, Request, Response } from "express";
import { IUser } from "../schema/userSchema";
import Joi from "joi";
import { IBookBase } from "../interfaces/IBook";

const joiValidator = (
  schema: Joi.ObjectSchema,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = schema.validate(req.body);
    !error ? next() : res.status(400).json({ error: error.details[0].message });
  } catch (error) {
    next(error);
  }
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<IUser>({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return joiValidator(schema, req, res, next);
};

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object<IBookBase>({
    name: Joi.string().required(),
    author: Joi.string().required(),
    publishedDate: Joi.date().required(),
    price: Joi.number().required(),
    ratings: Joi.number(),
  });

  return joiValidator(schema, req, res, next);
};
