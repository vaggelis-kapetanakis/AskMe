import { BsPerson } from "react-icons/bs";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { Markup } from "interweave";
import { QuestionTypeSec } from "../../../types/global";
import { useContext, useState } from "react";
import Loading from "../../../ui/Loading";
import { AuthContext } from "../../../contexts/AuthContext";
import { questionVote } from "../../../utils/questionReqs";
import axios from "axios";
import { Link } from "react-router-dom";
import notifierMiddleware from "../../../ui/notifierMiddleware";

const Question = ({ quest }: { quest: QuestionTypeSec }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;
  const [loading, setLoading] = useState<boolean>(false);
  const [votes, setVotes] = useState<number>(quest.votes);
  const [votesState, setVotesState] = useState<{
    buttonUpClicked: boolean;
    buttonDownClicked: boolean;
  }>({
    buttonDownClicked: false,
    buttonUpClicked: false,
  });

  const voteMutation = questionVote(state.user.token);

  const handleQuestVote = async (vote: number, whatButton: string) => {
    setLoading(true);
    const { data: hasVoted } = await axios.get(
      `https://askmeback.onrender.com/qanda/questions/isquestionvoted/${quest._id}/${state.user.userId}/${vote}`,
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
      }));
      setLoading(false);
      notifierMiddleware("info", "You have already voted this answer");
      return;
    }

    if (whatButton === "up") {
      setVotes((prevVotes) => prevVotes + 1);
    } else {
      setVotes((prevVotes) => prevVotes - 1);
    }

    voteMutation.mutate(
      { questionID: quest._id, vote, userID: state.user.userId },
      {
        onSuccess: () => {
          setVotesState((prevState) => ({
            ...prevState,
            buttonUpClicked: whatButton === "up",
            buttonDownClicked: whatButton === "down",
          }));
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
    setLoading(false);
  };

  return (
    <div className="h-full grid grid-cols-[0.1fr_0.9fr] bg-white/20 rounded-xl divide-x-2 divide-white/40">
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
              disabled={votesState.buttonUpClicked}
              onClick={() => handleQuestVote(1, "up")}
              className="bg-white/40 disabled:bg-transparent"
            >
              <IoIosArrowDropup className="w-8 h-8 text-green-500" />
            </button>
          )}
          <p className="text-xl text-black font-semibold">{votes}</p>
          {loading ? (
            <div className="relative w-8 h-8 scale-50">
              <Loading />
            </div>
          ) : (
            <button
              disabled={votesState.buttonDownClicked}
              onClick={() => handleQuestVote(-1, "down")}
              className="bg-white/40 disabled:bg-transparent"
            >
              <IoIosArrowDropdown className="w-8 h-8 text-red-500 cursor-pointer" />
            </button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-y-2">
          <p className="text-base text-primary-500 font-semibold">
            {quest.creator[0].username}
          </p>
          <p className="text-base text-primary-500 font-semibold text-center">
            {quest.category}
          </p>
          <p className="text-base text-primary-500 font-semibold">
            {new Date(quest.dateCreated).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5 px-3 py-2">
        <h2 className="text-xl text-black bg-white/50 rounded-xl p-2 font-semibold">
          <Markup content={quest.title} />
        </h2>
        <div className="text-black bg-white/50 rounded-xl p-3 h-[27vh] overflow-y-scroll">
          <Markup content={quest.body} className="text-justify leading-7" />
        </div>
        <div className="w-full flex gap-2 flex-grow-0 items-center justify-end">
          {quest.tags.map((tag, idx) => (
            <Link
              to={`/signedin/tags/${quest.tagsObjId[idx]}`}
              key={quest.tagsObjId[idx]}
              className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
