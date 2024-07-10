import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { QuestionTypeSec, TagReturnType } from "../../../types/global";
import Answers from "./Answers";
import Question from "./Question";
import { MainQuestionRelated } from "../MainQuestion/MainQuestion";
import Navbar from "../../Navbar/Navbar";
import { useAuth } from "../../../contexts/useAuth";
import Loading from "../../../ui/Loading";

const QuestionOverview: React.FC = () => {
  const { qid } = useParams<{ qid: string }>();
  const { sendRequest } = useHttpClient();
  const [quest, setQuest] = useState<QuestionTypeSec | null>(null);
  const [relatedTags, setRelatedTags] = useState<TagReturnType[]>([]);

  const { state } = useAuth();

  const fetchQuestion = useCallback(async () => {
    if (!qid) return;

    try {
      const response = await sendRequest<{ question: QuestionTypeSec[] }>(
        `${import.meta.env.VITE_APP_BACKEND_URL}/questions/getquestion/${qid}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${state.user.token}`,
        }
      );
      const question = response.data.question[0];
      setQuest(question);

      const relatedTagsPromises = question.tagsObjId.map(async (tagId) => {
        try {
          const tagResponse = await sendRequest<{ tag: TagReturnType }>(
            `${import.meta.env.VITE_APP_BACKEND_URL}/tags/${tagId}`,
            "GET",
            null,
            {
              Authorization: `Bearer ${state.user.token}`,
            }
          );
          return tagResponse.data.tag;
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      const relatedTags = (await Promise.all(relatedTagsPromises)).filter(
        (tag): tag is TagReturnType => tag !== null
      );

      // Flatten the array of arrays
      const flattenedRelatedTags = relatedTags.flat();

      // Remove the question itself from the related tags
      const filteredRelatedTags = flattenedRelatedTags.filter(
        (tag: TagReturnType) => {
          return tag.questions._id !== question._id; // Ensure to check if tag.questions is defined
        }
      );

      setRelatedTags(filteredRelatedTags.slice(0, 6));
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  }, [qid, sendRequest, state.user.token]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  if (!quest) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent">
        <Loading asOverlay />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div className="bg-white/20 rounded-xl h-full relative grid grid-cols-[0.75fr_0.25fr] divide-x-2 divide-white/40">
          <div className="flex flex-col p-3 divide-y-2 divide-white/40 overflow-y-scroll h-[90vh] rounded-xl">
            <Question quest={quest} />
            <Answers
              qid={quest._id}
              answerCount={quest.answerCount}
              category={quest.category}
              tags={quest.tags}
              title={quest.title}
              creator={quest.creator[0]._id}
            />
          </div>
          <RelatedQuestions relatedTags={relatedTags} />
        </div>
      </div>
    </div>
  );
};

const RelatedQuestions: React.FC<{ relatedTags: TagReturnType[] }> = ({
  relatedTags,
}) => (
  <div className="h-full">
    <div className="w-full flex items-center justify-start p-3">
      <h2 className="font-bold text-white text-4xl">Related Questions</h2>
    </div>
    <div className="overflow-y-scroll overflow-x-hidden h-[80vh] flex flex-col gap-y-3 p-3">
      {relatedTags.map((tag: TagReturnType) => (
        <MainQuestionRelated
          key={tag.questions._id}
          id={tag.questions._id}
          title={tag.questions.title}
          answerCount={tag.questions.answerCount}
          views={tag.questions.views}
          votes={tag.questions.votes}
        />
      ))}
    </div>
  </div>
);

export default QuestionOverview;
