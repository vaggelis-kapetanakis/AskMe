import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../models/http-error";

interface JwtPayload {
  userId: string;
}

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload; // Validating
    res.locals.userId = decodedToken.userId; // Store userId in res.locals
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};

export default checkAuth;
