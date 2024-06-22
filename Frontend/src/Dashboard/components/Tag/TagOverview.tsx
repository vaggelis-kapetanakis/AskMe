import { useContext } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../../ui/Loading";
import { fetchTagById } from "../../../utils/questionReqs";
import MainQuestion from "../MainQuestion/MainQuestion";
import ErrorModal from "../../../ui/ErrorModal";
import Navbar from "../../Navbar/Navbar";

const TagOverview = () => {
  let { tagid } = useParams();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }
  if (!tagid) {
    return;
  }

  const { state } = authContext;

  const {
    data: tagData,
    error: tagError,
    isFetching: isFetchingTag,
  } = fetchTagById(tagid, state.user.token);

  if (isFetchingTag) {
    return <Loading />;
  }

  if (tagError) {
    return <ErrorModal message={tagError.message} />;
  }

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div className="bg-white/20 rounded-xl h-full relative flex flex-col gap-y-5 divide-x-2 divide-white/40">
          <div className="w-full flex items-center justify-start p-3">
            <h2 className="font-bold text-white text-4xl">
              {tagData && tagData[0].name.toUpperCase()}
            </h2>
          </div>
          <div className="flex flex-col gap-y-3 overflow-y-scroll h-[80vh] px-5 overflow-x-hidden">
            {tagData?.map((tag) => (
              <MainQuestion
                key={tag.questions._id}
                id={tag.questions._id}
                category={tag.questions.category}
                creator={tag.questions.creator}
                dateCreated={tag.questions.dateCreated}
                tags={tag.questions.tags}
                tagsObjId={tag.questions.tagsObjId}
                title={tag.questions.title}
                answerCount={tag.questions.answerCount}
                views={tag.questions.views}
                votes={tag.questions.votes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagOverview;
