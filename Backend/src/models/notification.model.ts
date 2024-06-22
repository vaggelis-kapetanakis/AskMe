import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface INotification extends Document {
  creator?: Schema.Types.ObjectId;
  answeredBy?: Schema.Types.ObjectId;
  body: string;
  title: string;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  answeredBy: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, expires: 86400, default: Date.now },
});

notificationSchema.plugin(uniqueValidator);

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
