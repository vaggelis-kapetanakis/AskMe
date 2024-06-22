import { Router } from "express";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth";
import {
  filterQuestions,
  getLimitQuestions,
  getQuestionById,
  getRandomQuestions,
  getTwentyNewQuestions,
  isQuestionVotedByUser,
  newQuestion,
  questionVoted,
  searchQuestions,
} from "../controllers/question-controller";

const router = Router();

router.get("/browse", getRandomQuestions);

router.use(checkAuth);

router.post(
  "/newquestion",
  [
    check("title").isLength({ min: 15 }), // Test@test.com => test@test.com with normalization
    check("body").isLength({ min: 25 }),
    check("tags").not().isEmpty(),
  ],
  newQuestion
);

router.get("/getnewest", getTwentyNewQuestions);

router.get("/getlimit/:page", getLimitQuestions);

router.get("/searchquestions", searchQuestions);

router.get("/getquestion/:qid", getQuestionById);

router.get("/isquestionvoted/:qid/:uid/:vote", isQuestionVotedByUser);

router.get("/filter", filterQuestions);

router.post("/voted", questionVoted);

export default router;
