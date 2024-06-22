import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IAnswer extends Document {
  body: string;
  category: string;
  tags: string[];
  answeredBy: Schema.Types.ObjectId;
  answeredByUsername: string;
  answeredDate: string;
  queryAnsweredDate: Date;
  votes?: number;
  answers?: number;
  answeredQuestion: Schema.Types.ObjectId;
  tagsObjId: Schema.Types.ObjectId[];
}

const answerSchema = new Schema<IAnswer>({
  body: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  answeredBy: { type: Schema.Types.ObjectId, ref: "User" },
  answeredByUsername: { type: String, required: true },
  answeredDate: { type: String, required: true },
  queryAnsweredDate: { type: Date, required: true },
  votes: { type: Number, required: false },
  answers: { type: Number, required: false },
  answeredQuestion: { type: Schema.Types.ObjectId, ref: "Question" },
  tagsObjId: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

answerSchema.plugin(uniqueValidator);

const Answer = model<IAnswer>("Answer", answerSchema);

export default Answer;
