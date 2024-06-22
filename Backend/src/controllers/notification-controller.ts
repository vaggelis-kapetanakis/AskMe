import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpError from "../models/http-error";
import User from "../models/user.model";
import Notification from "../models/notification.model";

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, notificationID } = req.body;

  let notification, user;

  try {
    notification = await Notification.findByIdAndDelete(notificationID);
    if (!notification) {
      return next(new HttpError("Notification not found", 404));
    }

    user = await User.findOneAndUpdate(
      { username: username },
      { $pull: { notifications: notificationID } }
    );

    if (!user) {
      return next(new HttpError("User not found", 404));
    }
  } catch (err) {
    return next(
      new HttpError("Deleting notification failed, please try again", 500)
    );
  }

  res.status(200).json({ message: "Notification deleted successfully" });
};

export default {
  deleteNotification,
};
