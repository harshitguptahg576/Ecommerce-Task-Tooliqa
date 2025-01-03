import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decodeToken, verifyToken } from "../utils/helpers";
import { httpStatus } from "../utils/httpService";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (verifyToken(token)) {
      req.user = decodeToken(token) as AuthRequest["user"];
      next();
    } else {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    return res.status(httpStatus.UNAUTHORISED).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(httpStatus.UNAUTHORISED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  };
};
