import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../user/user";

export const createToken = (user: User): string => {
  const serializedUser = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(serializedUser, config.jwt_secret, {
    expiresIn: "7d"
  });
};

export const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, config.jwt_secret) as User;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
