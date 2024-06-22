import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose, { ObjectId, Types } from "mongoose";
import HttpError from "../models/http-error";
import User from "../models/user.model";
import Notification, { INotification } from "../models/notification.model";
import Question from "../models/question.model";
import Answer, { IAnswer } from "../models/answer.model";
import Tag, { ITag } from "../models/tag.model";
import moderator from "../utils/moderator";

export const newAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.time("ending");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 400)
    );
  }
  const {
    body,
    category,
    tags,
    answeredBy,
    answeredByUsername,
    questionID,
    creator,
    title,
  } = req.body;

  /* let _checking = await moderator.contentModerator(body);
  if (_checking === 1) {
    const error = new HttpError('The text you submitted is not a valid text', 200);
    return next(error);
  } else if (_checking === -1) {
    const error = new HttpError("Now it's not nice to swear", 200);
    return next(error);
  } */

  let _user, _creator, _question;
  let _bool = false;

  const _createdNotification = new Notification({
    creator,
    answeredBy,
    body: `User <h7>${answeredByUsername}</h7> just answered your question with title <h8>"${title}</h8>"`,
    title,
  });

  try {
    [_user, _creator] = await Promise.all([
      User.findById(answeredBy),
      User.findById(creator),
    ]);
  } catch (err) {
    return next(new HttpError("Finding User failed, please try again", 400));
  }

  if (!_user) {
    return next(
      new HttpError(
        "We could not find user for provided id, please try again",
        400
      )
    );
  }

  try {
    _question = await Question.findByIdAndUpdate(questionID, {
      $inc: { answerCount: 1 },
    });
  } catch (err) {
    return next(
      new HttpError("Finding question failed, please try again", 400)
    );
  }

  if (!_question) {
    return next(
      new HttpError(
        "We could not find question for provided id, please try again",
        400
      )
    );
  }

  const _createdAnswer:IAnswer = new Answer({
    body,
    category,
    tags,
    answeredBy,
    answeredByUsername,
    answeredDate: new Date().toISOString(),
    queryAnsweredDate: new Date(),
    votes: 0,
    answers: 0,
    answeredQuestion: questionID,
  });

  for (const tag of tags) {
    try {
      const _tag = await Tag.findOne({ name: tag });

      if (_tag) {
        _bool = _tag.userAnswerObjId.some(
          (el) => String(el._id) === String(answeredBy)
        );

        if (_bool) {
          await Promise.all([
            Tag.findByIdAndUpdate(
              _tag._id,
              {
                $inc: { answersCount: 1 },
                $push: { answerObjId: _createdAnswer._id },
              },
              { useFindAndModify: false }
            ),
            Tag.findOneAndUpdate(
              { _id: _tag._id, "userAnswerObjId._id": answeredBy },
              { $inc: { "userAnswerObjId.$.count": 1 } },
              { useFindAndModify: false }
            ),
            User.findByIdAndUpdate(
              answeredBy,
              { $inc: { "tagsAnsweredObjId.$[elem].count": 1 } },
              {
                arrayFilters: [{ "elem._id": _tag._id }],
                useFindAndModify: false,
              }
            ),
          ]);
        } else {
          await Promise.all([
            Tag.findByIdAndUpdate(
              _tag._id,
              {
                $inc: { answersCount: 1 },
                $push: {
                  userAnswerObjId: { _id: answeredBy, count: 1 },
                  answerObjId: _createdAnswer._id,
                },
              },
              { useFindAndModify: false }
            ),
            User.findByIdAndUpdate(
              answeredBy,
              {
                $push: {
                  tagsAnsweredObjId: {
                    _id: _tag._id,
                    name: _tag.name,
                    count: 1,
                  },
                },
              },
              { useFindAndModify: false }
            ),
          ]);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        _createdAnswer.tagsObjId.push(_tag._id as ObjectId);
        await _createdAnswer.save({ session: sess });
        await sess.commitTransaction();
      }
    } catch (err) {
      return next(
        new HttpError(
          "We could not update tags document, please try again",
          400
        )
      );
    }
  }

  if (!_creator) {
    return next(new HttpError("Creator not found", 400));
  }

  try {
    const sessOne = await mongoose.startSession();
    sessOne.startTransaction();
    await _createdNotification.save({ session: sessOne });
    _creator.notifications.push(_createdNotification.id);
    await _creator.save({ session: sessOne });
    await sessOne.commitTransaction();

    const sess = await mongoose.startSession();
    sess.startTransaction();
    _user.answers.push(_createdAnswer.id);
    _question.answerObjId.push(_createdAnswer.id);
    await _user.save({ session: sess });
    await _question.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("We could not update user document, please try again", 400)
    );
  }

  console.timeEnd("ending");
  res.status(201).json({ answer: _createdAnswer });
};

export const deleteAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answerID, questionID, username } = req.body;

  try {
    const [answer, question, user] = await Promise.all([
      Answer.findByIdAndDelete(answerID),
      Question.findByIdAndUpdate(questionID, { $inc: { answerCount: -1 } }),
      User.findOneAndUpdate(
        { username },
        { $pull: { answers: { _id: answerID } } }
      ),
    ]);

    if (!answer) {
      return next(
        new HttpError(
          "We could not find answer for provided id, please try again",
          400
        )
      );
    }
  } catch (err) {
    return next(new HttpError("Deleting answer failed, please try again", 400));
  }

  res.status(201).json("ok");
};

export const answerVoted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answerID, vote, userID } = req.body;

  try {
    const [answer, user] = await Promise.all([
      Answer.findByIdAndUpdate(answerID, { $inc: { votes: vote } }),
      User.findById(userID),
    ]);

    if (user) {
      const votedAnswer = { _id: answerID, vote };
      const sess = await mongoose.startSession();
      sess.startTransaction();
      user.votedAnswers.push(votedAnswer);
      await user.save({ session: sess });
      await sess.commitTransaction();
    }
  } catch (err) {
    return next(new HttpError("Finding answer failed, please try again", 400));
  }

  res.status(201).json("ok");
};

export const isAnswerVotedByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { aid: answerID, uid: userID, vote } = req.params;

  try {
    const user = await User.findById(userID);

    if (user) {
      const found = user.votedAnswers.some(
        (va) => va._id.toString() === answerID && va.vote === Number(vote)
      );

      if (!found) {
        await User.updateOne(
          { _id: userID },
          { $pull: { votedAnswers: { _id: answerID } } }
        );
      }

      res.status(201).json(found);
    } else {
      return next(new HttpError("User not found", 400));
    }
  } catch (err) {
    return next(new HttpError("Finding user failed, please try again", 400));
  }
};

export const getAnswersByQuestionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const questionID = req.params.questionId;

  try {
    const answers = await Answer.aggregate([
      { $match: { answeredQuestion: new mongoose.Types.ObjectId(questionID) } },
      { $sort: { votes: -1 } },
    ]);

    if (!answers) {
      return next(
        new HttpError(
          "Could not find answers for the provided question Id, please try again",
          400
        )
      );
    }

    res.send(answers);
  } catch (err) {
    return next(
      new HttpError("Fetching answers failed, please try again", 400)
    );
  }
};
