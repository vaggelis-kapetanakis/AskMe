import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUserQuestion {
  _id: Types.ObjectId;
  count?: number;
}

interface IUserAnswer {
  _id: Types.ObjectId;
  count?: number;
}

export interface ITag extends Document {
  name: string;
  dateCreated: string;
  queryDateCreated: Date;
  questionsCount?: number;
  answersCount?: number;
  answerObjId: Types.ObjectId[];
  questionObjId: Types.ObjectId[];
  userQuestionObjId: IUserQuestion[];
  userAnswerObjId: IUserAnswer[];
}

const tagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  dateCreated: { type: String, required: true },
  queryDateCreated: { type: Date, required: true },
  questionsCount: { type: Number, required: false },
  answersCount: { type: Number, required: false },
  answerObjId: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  questionObjId: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  userQuestionObjId: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
      count: { type: Number, required: false },
    },
  ],
  userAnswerObjId: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
      count: { type: Number, required: false },
    },
  ],
});

tagSchema.plugin(uniqueValidator);

const Tag = model<ITag>("Tag", tagSchema);

export default Tag;
