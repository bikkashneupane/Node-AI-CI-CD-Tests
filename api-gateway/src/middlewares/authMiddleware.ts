import { NextFunction, Request, Response } from "express";
import { verifyAccessJWT, VerifyTokenPayload } from "../utils/jwt";
import { IUserDocs } from "../schema/userSchema";
import { findSession } from "../controllers/session";
import { ISessionDocs } from "../schema/sessionSchema";
import { getSingleUser } from "../controllers/user";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      userInfo?: IUserDocs;
    }
  }
}

// Access Auth
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next({ message: "Authorization Header Missing", status: 400 });
    }

    const decoded: VerifyTokenPayload | string = verifyAccessJWT(
      authorization as string
    );

    // type === string, error message
    // type === object, it includes email, associate/ it is verified
    if (typeof decoded === "string") {
      return next({ message: decoded, status: 401 });
    }

    // Check if session token is present in db
    const tokenObj: ISessionDocs | null = await findSession({
      token: authorization,
    });

    if (!tokenObj) {
      return next({ message: "Token Not Found", status: 404 });
    }

    // Fetch User
    const user: IUserDocs | null = await getSingleUser({
      email: decoded.associate,
    });

    if (!user?._id) {
      return next({ message: "User Not Found", status: 404 });
    }

    req.userInfo = {
      ...user.toObject(),
      password: undefined,
      refreshJWT: undefined,
      __v: undefined,
    };

    return next();
  } catch (error) {
    next(error);
  }
};

// Refresh JWT AUTH
