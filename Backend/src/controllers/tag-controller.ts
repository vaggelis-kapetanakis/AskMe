import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpError from "../models/http-error";
import Tag from "../models/tag.model";

export const fetchTagsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tagID = req.params.tid;

  let tag, aggrTag;

  try {
    tag = await Tag.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(tagID) } },
      {
        $lookup: {
          from: "questions",
          localField: "questionObjId",
          foreignField: "_id",
          as: "questions",
        },
      },
      { $unwind: "$questions" },
      { $sort: { "questions.votes": -1 } },
      {
        $project: {
          name: 1,
          questionsCount: 1,
          answersCount: 1,
          "questions.tags": 1,
          "questions.title": 1,
          "questions.body": 1,
          "questions.creator": 1,
          "questions.votes": 1,
          "questions.answerCount": 1,
          "questions.views": 1,
          "questions.dateCreated": 1,
          "questions._id": 1,
          "questions.tagsObjId": 1,
          "questions.category": 1,
        },
      },
    ]);

    if (tag.length === 0) {
      aggrTag = await Tag.findById(tagID);
      tag = [aggrTag];
    }
  } catch (err) {
    const error = new HttpError(
      "Finding Questions based on tag failed, please try again",
      400
    );
    return next(error);
  }

  res.status(200).json({ tag });
};

export const fetchPopularTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let popularTags;

  try {
    popularTags = await Tag.find({})
      .select("name questionsCount answersCount")
      .sort({ questionsCount: -1 })
      .limit(10);
  } catch (err) {
    const error = new HttpError("Fetching tags failed, please try again", 400);
    return next(error);
  }

  res.status(200).json({ popularTags });
};

export const getTagsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  let _answeredTags, _questionTags;

  try {
    _answeredTags = await Tag.aggregate([
      {
        $match: { "userAnswerObjId._id": new mongoose.Types.ObjectId(userId) },
      },
      { $sort: { "userAnswerObjId.count": -1 } },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
      { $limit: 5 },
    ]);

    _questionTags = await Tag.aggregate([
      {
        $match: {
          "userQuestionObjId._id": new mongoose.Types.ObjectId(userId),
        },
      },
      { $sort: { "userQuestionObjId.count": -1 } },
      {
        $project: {
          _id: 1,
          name: 1,
        },
      },
      { $limit: 5 },
    ]);

    if (!_answeredTags) {
      _answeredTags = [];
    }
    if (!_questionTags) {
      _questionTags = [];
    }
  } catch (err) {
    return next(
      new HttpError(
        "Finding Questions based on tag failed, please try again",
        400
      )
    );
  }

  res.status(200).json({ _answeredTags, _questionTags });
};

export default {
  fetchTagsById,
  fetchPopularTags,
  getTagsByUserId,
};
