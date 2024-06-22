import { useContext, useState } from "react";
import Loading from "../../../ui/Loading";
import { AuthContext } from "../../../contexts/AuthContext";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { Markup } from "interweave";
import EditorComp from "../../../ui/EditorComp";
import Button from "../../../ui/Button";
import {
  answerVote,
  fetchAnswers,
  submitAnswer,
} from "../../../utils/questionReqs";
import ErrorModal from "../../../ui/ErrorModal";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import notifierMiddleware from "../../../ui/notifierMiddleware";

type AnswerProps = {
  qid: string;
  answerCount: number | undefined;
  category: string;
  tags: string[];
  title: string;
  creator: string;
};

const Answers = ({
  qid,
  answerCount,
  category,
  creator,
  tags,
  title,
}: AnswerProps) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [votesState, setVotesState] = useState<{
    buttonUpClicked: boolean;
    buttonDownClicked: boolean;
    disabledButton: string;
  }>({
    buttonDownClicked: false,
    buttonUpClicked: false,
    disabledButton: "",
  });

  // TODO: Add a loading spinner for the interactions
  // TODO: Handle the Delete

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;
  const queryClient = useQueryClient();

  const {
    data: answerData,
    isLoading: answerLoading,
    error: answerError,
  } = fetchAnswers(state.user.token, qid);

  const voteMutation = answerVote(state.user.token);
  const submitMutation = submitAnswer(state.user.token);

  const handleAnswerVote = async (
    answerID: string,
    vote: number,
    whatButton: string
  ) => {
    setLoading(true);
    const { data: hasVoted } = await axios.get(
      `https://askmeback.onrender.com/qanda/answers/isanswervoted/${answerID}/${state.user.userId}/${vote}`,
      {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          "X-Content-Type-Options": "nosniff",
        },
      }
    );

    if (hasVoted) {
      setVotesState((prevState) => ({
        ...prevState,
        buttonUpClicked: whatButton === "up",
        buttonDownClicked: whatButton === "down",
        disabledButton: answerID,
      }));
      setLoading(false);
      notifierMiddleware("info", "You have already voted this answer");
      return;
    }

    voteMutation.mutate(
      { answerID, vote, userID: state.user.userId },
      {
        onSuccess: () => {
          setVotesState((prevState) => ({
            ...prevState,
            buttonUpClicked: whatButton === "up",
            buttonDownClicked: whatButton === "down",
          }));

          queryClient.invalidateQueries({ queryKey: ["fetchAnswers", qid] });
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
    setLoading(false);
  };

  if (answerLoading) {
    return <Loading asOverlay />;
  }

  if (answerError) {
    return <ErrorModal message={answerError.message} />;
  }

  const handleSubmit = () => {
    setLoading(true);
    submitMutation.mutate(
      {
        body: editorContent,
        category,
        tags,
        answeredBy: state.user.userId,
        answeredByUsername: state.user.username,
        questionID: qid,
        creator,
        title,
      },
      {
        onSuccess: () => {
          setEditorContent("");
          queryClient.invalidateQueries({ queryKey: ["fetchAnswers", qid] });
        },
        onError: (error) => {
          console.log(error);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="bg-white/20 p-3 rounded-xl">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-black font-semibold text-lg">
          {answerCount} Answers
        </h2>
        {answerData &&
          answerData.map((answer) => (
            <div
              key={answer._id}
              className="h-full grid grid-cols-[0.1fr_0.9fr] bg-white/20 rounded-xl divide-x-2 divide-white/40"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-center flex-1">
                  <div className="rounded-full bg-white/60 p-3">
                    <BsPerson className="w-8 h-8 text-black/60" />
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 items-center justify-center flex-1">
                  {loading ? (
                    <div className="relative w-8 h-8 scale-50">
                      <Loading />
                    </div>
                  ) : (
                    <button
                      disabled={
                        votesState.buttonUpClicked &&
                        votesState.disabledButton === answer._id
                      }
                      onClick={() => handleAnswerVote(answer._id, 1, "up")}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropup className="w-6 h-6 text-green-500" />
                    </button>
                  )}
                  <p className="text-xl text-black font-semibold">
                    {answer.votes}
                  </p>
                  {loading ? (
                    <div className="relative w-8 h-8 scale-50">
                      <Loading />
                    </div>
                  ) : (
                    <button
                      disabled={
                        votesState.buttonDownClicked &&
                        votesState.disabledButton === answer._id
                      }
                      onClick={() => handleAnswerVote(answer._id, -1, "down")}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropdown className="w-8 h-8 text-red-500 cursor-pointer" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center flex-1 gap-y-2">
                  <p className="text-base text-primary-500 font-semibold">
                    {answer.answeredByUsername}
                  </p>
                  <p className="text-base text-primary-500 font-semibold text-center">
                    {answer.category}
                  </p>
                  <p className="text-base text-primary-500 font-semibold">
                    {new Date(answer.answeredDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-5 px-3 py-2">
                <div className="text-black bg-white/50 rounded-xl p-3 h-[34vh] overflow-y-scroll">
                  <Markup
                    content={answer.body}
                    className="text-justify leading-7"
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="border-t-2 border-white/40">
          <h2 className="text-black text-xl font-semibold my-3">Your Answer</h2>
          <EditorComp value={editorContent} onChange={handleEditorChange} />
          <div className="w-full flex items-center justify-end py-3">
            <Button
              buttonVariant="solid"
              buttonStyle={{
                color: "primary",
                vPadding: "sm",
                rounded: "lg",
                size: "lg",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
