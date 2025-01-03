import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export const generateToken = (
  data: Record<string, unknown>,
  time: number | false = false
) => {
  if (time) return jwt.sign(data, JWT_SECRET, { expiresIn: time });
  else return jwt.sign(data, JWT_SECRET);
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
