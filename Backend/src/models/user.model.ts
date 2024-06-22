import { Schema, model, Document } from "mongoose";

interface IVotedQuestion {
  _id: Schema.Types.ObjectId;
  vote?: number;
}

interface IVotedAnswer {
  _id: Schema.Types.ObjectId;
  vote?: number;
}

interface INotification {
  _id: Schema.Types.ObjectId;
  body?: string;
  title?: string;
}

interface ITagObj {
  _id: Schema.Types.ObjectId;
  count?: number;
}

interface ITagAnsweredObj {
  _id: Schema.Types.ObjectId;
  name?: string;
  count?: number;
}

export interface IUser extends Document {
  email?: string;
  username: string;
  password: string;
  userID?: number;
  apiKey?: string | null;
  tags?: string[];
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  votedQuestions: IVotedQuestion[];
  votedAnswers: IVotedAnswer[];
  notifications: INotification[];
  tagsObjId: ITagObj[];
  tagsAnsweredObjId: ITagAnsweredObj[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: false },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  userID: { type: Number, required: false },
  apiKey: { type: String, required: false },
  tags: { type: [String], required: false },
  questions: [
    { type: Schema.Types.ObjectId, ref: "Question", required: false },
  ],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer", required: false }],
  votedQuestions: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Question", required: false },
      vote: { type: Number, required: false },
    },
  ],
  votedAnswers: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Answer", required: false },
      vote: { type: Number, required: false },
    },
  ],
  notifications: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Notification",
        required: false,
      },
      body: { type: String, required: false },
      title: { type: String, required: false },
    },
  ],
  tagsObjId: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Tag" },
      count: { type: Number, required: false },
    },
  ],
  tagsAnsweredObjId: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Tag" },
      name: { type: String, required: false },
      count: { type: Number, required: false },
    },
  ],
});

// userSchema.plugin(uniqueValidator);

const User = model<IUser>("User", userSchema);

export default User;
