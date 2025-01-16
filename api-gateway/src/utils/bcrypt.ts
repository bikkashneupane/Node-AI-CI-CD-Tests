import bcrypt from "bcrypt";

export const hashPassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, process.env.SALT_ROUND || 10);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
