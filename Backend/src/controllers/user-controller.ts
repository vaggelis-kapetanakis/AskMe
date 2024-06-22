import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";
import User from "../models/user.model";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 400)
    );
  }
  const { email, username, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead", 400)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again", 500));
  }

  const createdUser = new User({
    email,
    username,
    password: hashedPassword,
    apiKey: null,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
      },
      process.env.JWT_KEY!,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  createdUser.apiKey = token;

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }

  res.status(201).json({
    userId: createdUser._id,
    email: createdUser.email,
    username: createdUser.username,
    token,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ username }).populate(
      "notifications questions"
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 400)
    );
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 400)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      process.env.JWT_KEY!,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again", 500));
  }

  existingUser.apiKey = token;

  try {
    await existingUser.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update api key.", 500)
    );
  }

  res.json({
    userId: existingUser._id,
    email: existingUser.email,
    username: existingUser.username,
    token,
    notifications: existingUser.notifications,
    userQuestions: existingUser.questions,
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const userId = res.locals.userId;

  if (!userId) {
    return next(new HttpError("Authentication failed", 401));
  }

  let existingUser;
  try {
    existingUser = await User.findById(userId);
    if (!existingUser) {
      return next(new HttpError("User not found", 404));
    }
    existingUser.apiKey = null;
    await existingUser.save();
  } catch (err) {
    return next(
      new HttpError("Logging out failed, please try again later.", 500)
    );
  }

  res.status(200).json({ message: "User logged out" });
};

export const updateUserCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldUsername, newUsername, oldEmail, newEmail } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ username: oldUsername });
  } catch (err) {
    return next(
      new HttpError("Changing credentials failed, please try again later.", 500)
    );
  }

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials, could not change credentials.", 400)
    );
  }

  try {
    await User.findOneAndUpdate(
      { username: oldUsername },
      { username: newUsername, email: newEmail }
    );
  } catch (err) {
    return next(
      new HttpError("Changing credentials failed, please try again later.", 500)
    );
  }

  res.status(200).send("ok");
};

export default {
  signup,
  login,
  logout,
  updateUserCredentials,
};
