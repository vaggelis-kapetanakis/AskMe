import React, { useState, useCallback, useMemo } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { useSearchQuestions } from "../../utils/questionReqs";
import Loading from "../../ui/Loading";
import { MainQuestionReduced } from "../components/MainQuestion/MainQuestion";
import { QuestionTypeThrd } from "../../types/global";
import ErrorModal from "../../ui/ErrorModal";
import { useAuth } from "../../contexts/useAuth";

const arraySearch = (
  data: QuestionTypeThrd[],
  value: string
): QuestionTypeThrd[] => {
  const searchTerm = value.toLowerCase();
  return data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
  );
};

const QuestSearch: React.FC = () => {
  const { state } = useAuth();
  const [searchResults, setSearchResults] = useState<QuestionTypeThrd[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useSearchQuestions(state.user.token);

  const handleChange = useCallback(
    (value: string) => {
      if (value.length > 2 && data) {
        const search = arraySearch(data, value);
        setSearchResults(search);
        setIsOpen(true);
      } else {
        setSearchResults([]);
        setIsOpen(false);
      }
    },
    [data]
  );

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const searchResultsComponent = useMemo(
    () => (
      <div
        className={`
      grid grid-rows-[0.05fr_0.95fr] top-12 gap-y-3 w-[25vw] h-[55vh] fixed 
      transition-all ease-in-out duration-300 bg-white/40 backdrop-blur-lg
      rounded-xl p-5 z-50
      ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400%]"}
    `}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-sky-500 font-semibold">Results</h2>
          <BsX
            className="w-8 h-8 text-red-500 cursor-pointer"
            onClick={toggleOpen}
          />
        </div>
        <div className="flex flex-col gap-y-3 overflow-y-scroll overflow-x-hidden">
          {searchResults.map((question: QuestionTypeThrd) => (
            <MainQuestionReduced
              key={question._id}
              id={question._id}
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
    ),
    [isOpen, searchResults, toggleOpen]
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorModal message={error.message} />;

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
      {searchResultsComponent}
    </div>
  );
};

export default QuestSearch;
