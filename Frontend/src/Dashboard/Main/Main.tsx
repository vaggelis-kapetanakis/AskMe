import { MainQuestionTitleOnly } from "../components/MainQuestion/MainQuestion";
import { QuestionType, TagType } from "../../types/global";
import Loading from "../../ui/Loading";
import ErrorModal from "../../ui/ErrorModal";
import { usePopularTags, useTopQuestions } from "../../utils/questionReqs";
import MainInfScroll from "./MainInfScroll";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

const Main: React.FC = () => {
  const { state } = useAuth();

  const {
    data: topData,
    error: topError,
    isFetching: isFetchingTop,
  } = useTopQuestions(state.user.token);

  const {
    data: tagsData,
    error: tagsError,
    isFetching: isFetchingTags,
  } = usePopularTags(state.user.token);

  if (isFetchingTags || isFetchingTop) {
    return <Loading asOverlay />;
  }

  if (tagsError) {
    return <ErrorModal message={tagsError?.message} />;
  }

  if (topError) {
    return <ErrorModal message={topError?.message} />;
  }

  return (
    <>
      <div className="w-full grid grid-cols-[0.6fr_0.4fr] divide-x-2 divide-white/40 gap-x-5 h-full py-2 overflow-hidden">
        <MainInfScroll />
        <div className="grid grid-rows-[0.2fr_0.8fr] gap-y-3 overflow-x-hidden">
          <div className="flex flex-col gap-y-2">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">Tags</h2>
            </div>
            <div className="p-5 flex flex-wrap gap-3">
              {tagsData.map((tag: TagType) => (
                <Link
                  to={`/signedin/tags/${tag._id}`}
                  key={tag._id}
                  className="hover:text-sky-500 cursor-pointer hover:scale-105 hover:bg-white/80 will-change-transform transition-all ease-in-out duration-300 rounded-lg px-2 py-1 bg-white/60 text-sky-600 w-fit h-fit"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">
                Popular Questions
              </h2>
            </div>
            <div className="pr-5 py-5 pl-3 flex flex-col gap-3 overflow-y-scroll h-[60vh]">
              {topData.map((question: QuestionType, index: number) => (
                <MainQuestionTitleOnly
                  key={index}
                  id={question._id}
                  title={question.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
