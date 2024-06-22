import { useContext, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { useSearchQuestions } from "../../utils/questionReqs";
import { AuthContext } from "../../contexts/AuthContext";
import Loading from "../../ui/Loading";
import { MainQuestionReduced } from "../components/MainQuestion/MainQuestion";
import { QuestionTypeThrd } from "../../types/global";
import ErrorModal from "../../ui/ErrorModal";

const arraySearch = ({ data, value }: { data: any[]; value: string }) => {
  const searchTerm = value.toLowerCase();
  return data.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
    );
  });
};

const QuestSearch = () => {
  const authContext = useContext(AuthContext);
  const [val, setVal] = useState<QuestionTypeThrd[]>();
  const [open, setOpen] = useState<boolean>(false);

  if (!authContext) {
    return <Loading />;
  }

  const { state } = authContext;

  const { data, isLoading, error } = useSearchQuestions(state.user.token);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorModal message={error.message} />;
  }

  const handleChange = (value: string) => {
    if (value.length > 2) {
      const search = arraySearch({ data, value });
      setVal(search);
      setOpen(true);
    } else {
      setVal([]);
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="mx-auto max-w-sm">
        <form action="" className="relative mx-auto w-max">
          <input
            type="search"
            className="peer cursor-pointer relative z-10 h-10 w-10 rounded-full border bg-transparent pl-10 outline-none focus:w-full focus:cursor-text
             focus:border-sky-500 focus:pl-16 focus:pr-4 transition-all ease-in-out duration-300 text-black"
            onChange={(e) => handleChange(e.target.value)}
          />
          <BsSearch className="absolute inset-y-0 my-auto h-10 w-10 border-r border-transparent text-sky-500 px-3.5 peer-focus:border-sky-500 peer-focus:stroke-sky-500" />
        </form>
      </div>
      <div
        className={`${
          open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400%]"
        } grid grid-rows-[0.05fr_0.95fr] top-12 gap-y-3 w-[25vw] h-[55vh] fixed transition-all ease-in-out duration-300 bg-white/40 backdrop-blur-lg
                    rounded-xl p-5 z-50`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-sky-500 font-semibold">Results</h2>
          <BsX
            className="w-8 h-8 text-red-500 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className="flex flex-col gap-y-3 overflow-y-scroll overflow-x-hidden">
          {open &&
            val &&
            val.map((question: QuestionTypeThrd) => (
              <MainQuestionReduced
                id={question._id}
                key={question._id}
                title={question.title}
                answerCount={question.answerCount}
                dateCreated={question.dateCreated}
                tags={question.tags}
                tagsObjId={question.tagsObjId}
                views={question.views}
                votes={question.votes}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestSearch;
