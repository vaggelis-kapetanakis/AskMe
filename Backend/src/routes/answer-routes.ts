import { Router } from "express";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth";
import {
  newAnswer,
  deleteAnswer,
  answerVoted,
  isAnswerVotedByUser,
  getAnswersByQuestionId,
} from "../controllers/answer-controller";

const router = Router();

router.get("/:questionId", getAnswersByQuestionId);

router.use(checkAuth);

router.post(
  "/newanswer",
  [check("body").isLength({ min: 15 }), check("tags").not().isEmpty()],
  newAnswer
);

router.get("/isanswervoted/:aid/:uid/:vote", isAnswerVotedByUser);

router.post("/voted", answerVoted);

router.delete("/deleteanswer", deleteAnswer);

export default router;
