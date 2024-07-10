import { useCallback, useMemo, useRef } from "react";
import Loading from "../../ui/Loading";
import { QuestionType } from "../../types/global";
import MainQuestion from "../components/MainQuestion/MainQuestion";
import ErrorModal from "../../ui/ErrorModal";
import { useFetchInfiniteQuestions } from "../../utils/questionReqs";
import { useAuth } from "../../contexts/useAuth";

const MainInfScroll = () => {
  const observer = useRef<IntersectionObserver>();

  const { state } = useAuth();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFetchInfiniteQuestions(state.user.token);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const questions = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (isLoading)
    return (
      <div className="fixed z-50 bg-white/20 w-full h-full rounded-2xl flex items-center justify-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="fixed z-50 bg-white/20 w-full h-full rounded-2xl flex items-center justify-center">
        <ErrorModal message={error.message} />
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-full flex items-center justify-start p-3">
        <h2 className="font-bold text-white text-4xl">New Questions</h2>
      </div>
      <div
        className="relative w-full h-[82vh]
    p-5 overflow-y-scroll overflow-x-hidden flex flex-col gap-y-2"
      >
        {questions &&
          questions.map((question: QuestionType) => (
            <div key={question._id} ref={lastElementRef}>
              <MainQuestion
                id={question._id}
                category={question.category}
                creator={question.creator}
                dateCreated={question.dateCreated}
                tags={question.tags}
                tagsObjId={question.tagsObjId}
                title={question.title}
                answerCount={question.answerCount}
                views={question.views}
                votes={question.votes}
              />
            </div>
          ))}
        {isFetching && (
          <div className="fixed z-50 bg-white/20 w-full h-[88%] rounded-2xl flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainInfScroll;
