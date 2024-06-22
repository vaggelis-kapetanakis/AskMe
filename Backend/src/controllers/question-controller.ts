import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import mongoose, { Types } from "mongoose";
import HttpError from "../models/http-error";
import User from "../models/user.model";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
// import moderator from '../utils/moderator'; // Uncomment if needed

export const newQuestion = async (
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
  const { title, body, tags, category, creator } = req.body;

  /* Content moderation logic can be added here if needed */

  let _user;
  let _tagAlreadyExists;
  let _createdTag;
  let _bool = false;

  try {
    _user = await User.findById(creator);
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

  const _createdQuestion = new Question({
    title,
    body,
    tags,
    category,
    creator: _user._id,
    dateCreated: new Date().toISOString(),
    queryDateCreated: new Date(),
    votes: 0,
    answerCount: 0,
    views: 0,
  });

  for (const tag of tags) {
    try {
      _tagAlreadyExists = await Tag.find({ name: tag });

      if (_tagAlreadyExists.length > 0) {
        _bool = _tagAlreadyExists[0].userQuestionObjId.some((el) =>
          el._id.equals(_user.id)
        );

        if (_bool) {
          await Promise.all([
            Tag.findByIdAndUpdate(
              _tagAlreadyExists[0]._id,
              {
                $inc: { questionsCount: 1 },
                $push: { questionObjId: _createdQuestion._id },
              },
              { useFindAndModify: false }
            ),
            Tag.findOneAndUpdate(
              {
                _id: _tagAlreadyExists[0]._id,
                "userQuestionObjId._id": _user._id,
              },
              { $inc: { "userQuestionObjId.$.count": 1 } }
            ),
            User.findByIdAndUpdate(
              _user._id,
              { $inc: { "tagsObjId.$[elem].count": 1 } },
              {
                arrayFilters: [{ "elem._id": _tagAlreadyExists[0]._id }],
                useFindAndModify: false,
              }
            ),
          ]);
        } else {
          await Promise.all([
            Tag.findByIdAndUpdate(
              _tagAlreadyExists[0]._id,
              {
                $inc: { questionsCount: 1 },
                $push: {
                  userQuestionObjId: { _id: _user._id, count: 1 },
                  questionObjId: _createdQuestion._id,
                },
              },
              { useFindAndModify: false }
            ),
            User.findByIdAndUpdate(
              _user._id,
              {
                $push: {
                  tagsObjId: { _id: _tagAlreadyExists[0]._id, count: 1 },
                  tags: _tagAlreadyExists[0].name,
                },
              },
              { useFindAndModify: false }
            ),
          ]);
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        _createdQuestion.tagsObjId.push(_tagAlreadyExists[0].id);
        await _createdQuestion.save({ session: sess });
        await sess.commitTransaction();
      } else {
        _createdTag = new Tag({
          name: tag,
          dateCreated: new Date().toISOString(),
          queryDateCreated: new Date(),
          userQuestionObjId: { _id: _user._id, count: 1 },
          questionsCount: 1,
          answersCount: 0,
        });

        try {
          const sess = await mongoose.startSession();
          sess.startTransaction();
          _createdQuestion.tagsObjId.push(_createdTag.id);
          await _createdQuestion.save({ session: sess });
          _createdTag.questionObjId.push(_createdQuestion.id);
          await _createdTag.save({ session: sess });
          _user.tagsObjId.push({
            _id: _createdTag.id,
            count: 1,
          });
          if (_user.tags) {
            _user.tags.push(tag);
          }
          await _user.save({ session: sess });
          await sess.commitTransaction();
        } catch (err) {
          console.log(err);
          return next(
            new HttpError("Creating Tags failed, please try again", 400)
          );
        }
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

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    _user.questions.push(_createdQuestion.id);
    await _user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("We could not update user document, please try again", 400)
    );
  }

  res.status(201).json({ question: _createdQuestion });
};

export const getTwentyNewQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let newQuestions;

  try {
    newQuestions = await Question.find({})
      .populate("creator")
      .sort({ queryDateCreated: -1 })
      .limit(20);
  } catch (err) {
    return next(
      new HttpError("Getting newest Questions failed, please try again", 400)
    );
  }

  res.status(200).json({ questions: newQuestions });
};

export const getLimitQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.params.page, 10);
  let newQuestions;

  try {
    newQuestions = await Question.find({})
      .populate("creator")
      .skip(page * 20)
      .sort({ queryDateCreated: -1 })
      .limit(20);
  } catch (err) {
    return next(
      new HttpError("Getting newest Questions failed, please try again", 400)
    );
  }

  res.status(200).json({ questions: newQuestions });
};

export const questionVoted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { questionID, vote, userID } = req.body;
  let question;
  let user;

  const votedQuestion = { _id: questionID, vote };

  try {
    question = await Question.findByIdAndUpdate(questionID, {
      $inc: { votes: vote },
    });
    user = await User.findById(userID);
    if (!user) {
      return next(new HttpError("User not found", 400));
    }
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user.votedQuestions.push(votedQuestion);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Finding question failed, please try again", 400)
    );
  }

  res.status(201).json("ok");
};

export const isQuestionVotedByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const questionID = req.params.qid;
  const userID = req.params.uid;
  const vote = parseInt(req.params.vote, 10);
  let user;

  try {
    user = await User.findById(userID);
    if (!user) {
      return next(
        new HttpError("Could not find user for the provided id", 400)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Created Question failed, please try again", 400)
    );
  }

  let found = false;

  if (user.votedQuestions) {
    for (const votedQuestion of user.votedQuestions) {
      if (
        String(votedQuestion._id) === questionID &&
        votedQuestion.vote !== vote
      ) {
        try {
          await User.updateOne(
            { _id: userID },
            { $pull: { votedQuestions: { _id: votedQuestion._id } } }
          );
          found = false;
          break;
        } catch (err) {
          return next(
            new HttpError("Created Question failed, please try again", 400)
          );
        }
      } else if (
        String(votedQuestion._id) === questionID &&
        votedQuestion.vote === vote
      ) {
        found = true;
        break;
      }
    }
  }

  res.status(201).json(found);
};

export const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const questionID = req.params.qid;
  let question;
  let aggrQuestion;

  try {
    question = await Question.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(questionID) },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $project: {
          tags: 1,
          title: 1,
          body: 1,
          creator: 1,
          votes: 1,
          category: 1,
          answers: 1,
          answerCount: 1,
          dateCreated: 1,
          tagsObjId: 1,
        },
      },
    ]);

    if (question.length === 0) {
      aggrQuestion = await Question.findById(questionID);
      question = [aggrQuestion];
    }
  } catch (err) {
    return next(
      new HttpError("Finding Question failed, please try again", 400)
    );
  }

  res.status(200).json({ question });
};

export const filterQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let questions;

  try {
    questions = await Question.find({})
      .select("title tagsObjId tags votes answerCount views dateCreated")
      .sort({ votes: -1 })
      .limit(20);

    if (!questions) {
      return next(
        new HttpError("Finding Question failed, please try again", 400)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Finding Question failed, please try again", 400)
    );
  }

  res.status(200).json({ questions });
};

export const searchQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let questions;

  try {
    questions = await Question.find({})
      .select("title tagsObjId tags votes answerCount views dateCreated")
      .sort({ votes: -1 });

    if (!questions) {
      return next(
        new HttpError("Finding Question failed, please try again", 400)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Finding Question failed, please try again", 400)
    );
  }

  res.status(200).json({ questions });
};

export const getRandomQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let randomQuestions;
  const random = Math.floor(Math.random() * 10);

  try {
    randomQuestions = await Question.find({})
      .populate("creator answerObjId")
      .skip(random)
      .limit(10);
  } catch (err) {
    return next(
      new HttpError("Finding Question failed, please try again", 400)
    );
  }

  res.status(200).send({ randomQuestions });
};
