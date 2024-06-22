import { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import HttpError from "../models/http-error";
import User from "../models/user.model";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import Answer from "../models/answer.model";

export const userChart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  if (!userId) {
    return next(new HttpError("Invalid user id, please check your data", 400));
  }

  const userIdMiddleware = new Types.ObjectId(userId);
  let userStats, userTagsStats, userAnswerStats, userAnswerTags;
  let questionStats, questionAnswerStats, questionUpVotedStats;
  let answerStats, answerUpVotedStats, categoryStats, tagStats, tagUpVotedStats;

  try {
    userStats = await Question.aggregate([
      { $match: { creator: userIdMiddleware } },
      {
        $group: {
          _id: {
            year: { $year: "$queryDateCreated" },
            month: { $month: "$queryDateCreated" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
          totalViews: { $sum: "$views" },
          totalQuestions: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    questionStats = await Question.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$queryDateCreated" },
            month: { $month: "$queryDateCreated" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
          totalViews: { $sum: "$views" },
          totalQuestions: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    questionAnswerStats = await Question.aggregate([
      { $match: { answerCount: { $gte: 1 } } },
      {
        $group: {
          _id: {
            year: { $year: "$queryDateCreated" },
            month: { $month: "$queryDateCreated" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
          totalViews: { $sum: "$views" },
          totalQuestions: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    questionUpVotedStats = await Question.aggregate([
      { $match: { votes: { $gte: 1 } } },
      {
        $group: {
          _id: {
            year: { $year: "$queryDateCreated" },
            month: { $month: "$queryDateCreated" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
          totalViews: { $sum: "$views" },
          totalQuestions: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    answerStats = await Answer.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$queryAnsweredDate" },
            month: { $month: "$queryAnsweredDate" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    answerUpVotedStats = await Answer.aggregate([
      { $match: { votes: { $gte: 1 } } },
      {
        $group: {
          _id: {
            year: { $year: "$queryAnsweredDate" },
            month: { $month: "$queryAnsweredDate" },
          },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $push: "$_id" },
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    userTagsStats = await Tag.aggregate([
      { $unwind: "$userQuestionObjId" },
      { $match: { "userQuestionObjId._id": userIdMiddleware } },
      {
        $project: {
          "userQuestionObjId.count": 1,
          name: 1,
        },
      },
    ]).sort({ "userQuestionObjId.count": -1 });

    userAnswerTags = await Tag.aggregate([
      { $unwind: "$userAnswerObjId" },
      { $match: { "userAnswerObjId._id": userIdMiddleware } },
      {
        $project: {
          "userAnswerObjId.count": 1,
          name: 1,
        },
      },
    ]).sort({ "userAnswerObjId.count": -1 });

    userAnswerStats = await Answer.aggregate([
      { $match: { answeredBy: userIdMiddleware } },
      {
        $project: {
          votes: 1,
          answeredQuestion: 1,
          tags: 1,
        },
      },
    ]);

    categoryStats = await Question.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
        },
      },
    ]);

    tagStats = await Tag.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
          totalQuestions: { $sum: "$questionsCount" },
          totalAnswers: { $sum: "$answersCount" },
        },
      },
      { $sort: { totalQuestions: -1 } },
    ]);

    tagUpVotedStats = await Question.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
          totalVotes: { $sum: "$votes" },
          totalAnswers: { $sum: "$answerCount" },
        },
      },
    ])
      .sort({ count: -1 })
      .limit(10);

    if (!userStats || !userTagsStats || !userAnswerStats) {
      return next(
        new HttpError("Could not find user stats, please check your data", 400)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Fetching data failed, please try again later.", 500)
    );
  }

  res.status(200).json({
    userStats,
    userTagsStats,
    userAnswerStats,
    userAnswerTags,
    questionStats,
    questionAnswerStats,
    questionUpVotedStats,
    answerStats,
    answerUpVotedStats,
    categoryStats,
    tagStats,
    tagUpVotedStats,
  });
};

export default {
  userChart,
};
