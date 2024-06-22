import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IQuestion extends Document {
  title: string;
  body: string;
  category: string;
  tags: string[];
  creator: Schema.Types.ObjectId;
  dateCreated: string;
  queryDateCreated: Date;
  votes?: number;
  answerCount?: number;
  views?: number;
  answerObjId: Schema.Types.ObjectId[];
  tagsObjId: Schema.Types.ObjectId[];
}

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: String, required: true },
  queryDateCreated: { type: Date, required: true },
  votes: { type: Number, required: false },
  answerCount: { type: Number, required: false },
  views: { type: Number, required: false },
  answerObjId: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  tagsObjId: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

questionSchema.plugin(uniqueValidator);

const Question = model<IQuestion>("Question", questionSchema);

export default Question;
