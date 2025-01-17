import JWT from "jsonwebtoken";
import { updateUser } from "../controllers/user";
import { insertSession } from "../controllers/session";

// Sign Access Token
export const signAccessJWT = async (email: string): Promise<string> => {
  try {
    const token: string = JWT.sign(
      { email },
      process.env.ACCESS_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    // Update the session table
    await insertSession({ token, associate: email });

    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

export interface VerifyTokenPayload {
  token: string;
  associate: string;
}

// Verify Access Token
export const verifyAccessJWT = (token: string): VerifyTokenPayload | string => {
  try {
    return JWT.verify(
      token,
      process.env.ACCESS_KEY as string
    ) as VerifyTokenPayload;
  } catch (error) {
    const errorMessage: string = (error as Error).message
      .toLocaleLowerCase()
      .includes("token expired")
      ? "Token Expired"
      : "Invalid Token";

    return errorMessage;
  }
};

// Sign Refresh JWT
export const signRefreshJWT = async (email: string): Promise<string> => {
  try {
    const token: string = JWT.sign(
      { email },
      process.env.REFRESH_KEY as string,
      { expiresIn: "30d" }
    );

    // Update user refresh JWT
    await updateUser({ email }, { refreshJWT: token });

    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

// Verify Refresh JWT
export const verifyRefreshJWT = (
  token: string
): VerifyTokenPayload | string => {
  try {
    return JWT.verify(
      token,
      process.env.REFRESH_KEY as string
    ) as VerifyTokenPayload;
  } catch (error) {
    const errorMessage: string = (error as Error).message
      .toLocaleLowerCase()
      .includes("token expired")
      ? "Token Expired"
      : "Invalid Token";

    return errorMessage;
  }
};

interface TokensObj {
  accessJWT: string;
  refreshJWT: string;
}
export const signTokens = async (email: string): Promise<TokensObj> => {
  const accessJWT: string = await signAccessJWT(email);
  const refreshJWT: string = await signRefreshJWT(email);
  return { accessJWT, refreshJWT };
};
