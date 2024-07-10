import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnswerType, TagProfileType, TagReturnType } from "../types/global";

export const useFetchInfiniteQuestions = (userToken: string) => {
  return useInfiniteQuery({
    queryKey: ["fetchQuestions", userToken],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      if (!userToken) {
        return;
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/questions/getlimit/${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data.questions;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    enabled: !!userToken,
  });
};

export const useTopQuestions = (userToken: string) => {
  return useQuery({
    queryKey: ["topQuestions", userToken],
    queryFn: async () => {
      if (!userToken) {
        return;
      }
      const { data } = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + `/questions/filter`,
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
    queryKey: ["popularTags", userToken],
    queryFn: async () => {
      if (!userToken) {
        return;
      }
      const { data } = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + `/tags/popular/tags`,
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

export const useQuestionVote = (userToken: string) => {
  return useMutation<
    void,
    Error,
    { questionID: string; vote: number; userID: string }
  >({
    mutationFn: async ({ questionID, vote, userID }) => {
      if (!userToken) {
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/questions/voted`,
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
    queryKey: ["searchQuestions", userToken],
    queryFn: async () => {
      if (!userToken) {
        return;
      }
      const { data } = await axios.get(
        import.meta.env.VITE_APP_BACKEND_URL + `/questions/searchquestions`,
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

export const useFetchAnswers = (userToken: string, questionID: string) => {
  return useQuery({
    queryKey: ["fetchAnswers", questionID, userToken],
    queryFn: async () => {
      if (!userToken || !questionID) {
        return;
      }
      const { data } = await axios.get<AnswerType[]>(
        import.meta.env.VITE_APP_BACKEND_URL + `/answers/${questionID}`,
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

export const useAnswerVote = (userToken: string) => {
  return useMutation<
    void,
    Error,
    { answerID: string; vote: number; userID: string }
  >({
    mutationFn: async ({ answerID, vote, userID }) => {
      if (!userToken) {
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/answers/voted`,
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

export const useSubmitAnswer = (userToken: string) => {
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
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/answers/newanswer`,
        newAnswer,
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

export const useAnswerDelete = (
  answerID: string,
  userID: string,
  username: string,
  questionID: string,
  userToken: string
) => {
  return useQuery({
    queryKey: [
      "answerDelete",
      answerID,
      questionID,
      userID,
      userToken,
      username,
    ],
    queryFn: async () => {
      if (!userToken || !userID || !username || !questionID || !answerID) {
        return;
      }
      const { data } = await axios.delete(
        import.meta.env.VITE_APP_BACKEND_URL + `/answers/deleteanswer`,
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

export const useFetchTagById = (
  tagID: string | undefined,
  userToken: string
) => {
  return useQuery({
    queryKey: ["answerDelete", tagID, userToken],
    queryFn: async () => {
      if (!tagID) {
        return;
      }
      const { data } = await axios.get<{ tag: TagReturnType[] }>(
        `${import.meta.env.VITE_APP_BACKEND_URL}/tags/${tagID}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
      return data.tag;
    },
    enabled: !!userToken && !!tagID,
  });
};

export const useFetchUserTags = (userId: string, userToken: string) => {
  return useQuery({
    queryKey: ["answerDelete", userId, userToken],
    queryFn: async () => {
      if (!userId || !userToken) {
        return;
      }
      const { data } = await axios.get<{
        _answeredTags: TagProfileType[];
        _questionTags: TagProfileType[];
      }>(`${import.meta.env.VITE_APP_BACKEND_URL}/tags/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "X-Content-Type-Options": "nosniff",
        },
      });
      return data;
    },
    enabled: !!userToken && !!userId,
  });
};
