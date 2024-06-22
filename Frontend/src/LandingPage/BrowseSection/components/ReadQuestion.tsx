import { FaArrowLeft } from "react-icons/fa";
import { Markup } from "interweave";
import { QuestionType } from "../../../types/global";
import notifierMiddleware from "../../../ui/notifierMiddleware";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

const ReadQuestion = ({
  goBackFunction,
  data,
}: {
  goBackFunction: () => void;
  data: QuestionType;
}) => {
  console.log(data);
  const youMustBeLoggedIn = () => {
    notifierMiddleware("info", "You must be logged in to vote");
  };

  return (
    <>
      <button
        className="absolute z-50 -left-20 bg-transparent text-white p-0"
        onClick={goBackFunction}
      >
        <FaArrowLeft className="text-4xl" />
      </button>
      <div className="h-[80vh] overflow-y-scroll relative">
        {" "}
        {data !== null && (
          <>
            <div className="rounded-xl bg-white/60 relative">
              <div className="h-full grid grid-cols-[0.1fr_0.9fr] bg-white/20 rounded-xl divide-x-2 divide-white/40">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-center flex-1">
                    <div className="rounded-full bg-white/60 p-3">
                      <BsPerson className="w-8 h-8 text-black/60" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3 items-center justify-center flex-1">
                    <button
                      onClick={youMustBeLoggedIn}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropup className="w-8 h-8 text-green-500" />
                    </button>
                    <p className="text-xl text-black font-semibold">
                      {data.votes}
                    </p>

                    <button
                      onClick={youMustBeLoggedIn}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropdown className="w-8 h-8 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 gap-y-2">
                    <p className="text-base text-primary-500 font-semibold">
                      {data.creator.username}
                    </p>
                    <p className="text-base text-primary-500 font-semibold text-center">
                      {data.category}
                    </p>
                    <p className="text-base text-primary-500 font-semibold">
                      {new Date(data.dateCreated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-5 px-3 py-2">
                  <h2 className="text-xl text-black bg-white/50 rounded-xl p-2 font-semibold">
                    <Markup content={data.title} />
                  </h2>
                  <div className="text-black bg-white/50 rounded-xl p-3 h-[27vh] overflow-y-scroll">
                    <Markup
                      content={data.body}
                      className="text-justify leading-7"
                    />
                  </div>
                  <div className="w-full flex gap-2 flex-grow-0 items-center justify-end">
                    {data.tags.map((tag) => (
                      <div
                        key={tag}
                        className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-primary-500" />
            <div className="bg-white/20 p-3 rounded-xl">
              <h2 className="text-white font-semibold text-lg">
                {data.answerCount} Answers
              </h2>
            </div>
            <div className="border-b-2 border-primary-500" />
          </>
        )}
        {data.answerObjId &&
          data.answerObjId.map((answer) => {
            return (
              <div
                key={answer._id}
                className="h-auto bg-white/60 grid grid-cols-[0.1fr_0.9fr] rounded-xl divide-x-2 divide-white/40"
              >
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-center flex-1">
                    <div className="rounded-full bg-white/60 p-3">
                      <BsPerson className="w-8 h-8 text-black/60" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3 items-center justify-center flex-1">
                    <button
                      onClick={youMustBeLoggedIn}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropup className="w-6 h-6 text-green-500" />
                    </button>
                    <p className="text-xl text-black font-semibold">
                      {answer.votes}
                    </p>
                    <button
                      onClick={youMustBeLoggedIn}
                      className="bg-white/40 disabled:bg-transparent"
                    >
                      <IoIosArrowDropdown className="w-8 h-8 text-red-500 cursor-pointer" />
                    </button>
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
            );
          })}
      </div>
    </>
  );
};

export default ReadQuestion;
