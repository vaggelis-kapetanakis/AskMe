import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AnswerType,
  TagReturnType,
} from "../types/global";

const API_URL = "http://localhost:8765/qanda";

export const useTopQuestions = (userToken: string | null) => {
  return useQuery({
    queryKey: ["topQuestions"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8765/qanda/questions/filter",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data.questions;
    },
    enabled: !!userToken,
    refetchOnWindowFocus: false,
  });
};

export const usePopularTags = (userToken: string) => {
  return useQuery({
    queryKey: ["popularTags"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8765/qanda/tags/popular/tags",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data.popularTags;
    },
    enabled: !!userToken,
    refetchOnWindowFocus: false,
  });
};

export const questionVote = (userToken: string) => {
  return useMutation<
    void,
    Error,
    { questionID: string; vote: number; userID: string }
  >({
    mutationFn: async ({ questionID, vote, userID }) => {
      await axios.post(
        `${API_URL}/questions/voted`,
        {
          questionID,
          vote,
          userID,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    },
  });
};

export const useSearchQuestions = (userToken: string) => {
  return useQuery({
    queryKey: ["searchQuestions"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8765/qanda/questions/searchquestions",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data.questions;
    },
    enabled: !!userToken,
    refetchOnWindowFocus: false,
  });
};

/* ---------------------- ANSWER ------------------------------- */

export const fetchAnswers = (userToken: string, questionID: string) => {
  return useQuery({
    queryKey: ["fetchAnswers", questionID],
    queryFn: async () => {
      const { data } = await axios.get<AnswerType[]>(
        `http://localhost:8765/qanda/answers/${questionID}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
      return data;
    },
    enabled: !!userToken,
  });
};

export const answerVote = (userToken: string) => {
  return useMutation<
    void,
    Error,
    { answerID: string; vote: number; userID: string }
  >({
    mutationFn: async ({ answerID, vote, userID }) => {
      await axios.post(
        `${API_URL}/answers/voted`,
        {
          answerID,
          vote,
          userID,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    },
  });
};

export const submitAnswer = (userToken: string) => {
  return useMutation<
    void,
    Error,
    {
      body: string;
      category: string;
      tags: string[];
      answeredBy: string;
      answeredByUsername: string;
      questionID: string;
      creator: string;
      title: string;
    }
  >({
    mutationFn: async (newAnswer) => {
      await axios.post(`${API_URL}/answers/newanswer`, newAnswer, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "X-Content-Type-Options": "nosniff",
        },
      });
    },
  });
};

export const answerDelete = (
  answerID: string,
  userID: string,
  username: string,
  questionID: string,
  userToken: string
) => {
  return useQuery({
    queryKey: ["answerDelete", answerID, questionID],
    queryFn: async () => {
      const { data } = await axios.delete(
        `http://localhost:8765/qanda/answers/deleteanswer`,
        {
          data: {
            answerID: answerID,
            questionID: questionID,
            userID: userID,
            username: username,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
      return data;
    },
    enabled: !!userToken,
  });
};

/* --------XXX----------- ANSWER ------------XXX--------------- */

/* ---------------------- TAGS ------------------------------- */

export const fetchTagById = (tagID: string, userToken: string) => {
  return useQuery({
    queryKey: ["answerDelete", tagID, userToken],
    queryFn: async () => {
      const { data } = await axios.get<{ tag: TagReturnType[] }>(
        `http://localhost:8765/qanda/tags/${tagID}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
      return data.tag;
    },
    enabled: !!userToken,
  });
};
