import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import UserChartsTags from "./components/UserCharts/UserPieTagChart";
import UserQuestMonth from "./components/UserCharts/UserQuestMonth";
import UserChartVotes from "./components/UserCharts/UserChartVotes";
import { UserChartsAnswerTags } from "./components/UserCharts/UserAnswerTags";
import QuestionCharts from "./components/QuestionCharts/QuestionCharts";
import QuestionAnswerCharts from "./components/QuestionCharts/QuestionAnswerCharts";
import QuestionUpVotedCharts from "./components/QuestionCharts/QuestionUpVotedCharts";
import AnswerCharts from "./components/AnswerCharts/AnswerCharts";
import AnswerUpVotedCharts from "./components/AnswerCharts/AnswerUpVotedCharts";
import CategoryStats from "./components/Categories/CategoryStats";
import CategoryExtraStats from "./components/Categories/CategoryExtraStats";
import TagStats from "./components/TagCharts/TagStats";
import TagVotesAnswersCharts from "./components/TagCharts/TagVotesAnswersCharts";

const Chart = () => {
  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div className="backdrop-blur-md bg-white/20 rounded-xl relative overflow-y-scroll overflow-x-hidden h-full px-5">
          <div className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">Your Stats</h2>
            </div>
            <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
              <div>
                <UserQuestMonth />
                <UserChartsTags />
              </div>
              <div>
                <UserChartVotes />
                <UserChartsAnswerTags />
              </div>
            </div>
          </div>
          <div className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">
                Regarding Questions
              </h2>
            </div>
            <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
              <div>
                <QuestionCharts />
                <QuestionUpVotedCharts />
              </div>
              <div>
                <QuestionAnswerCharts />
              </div>
            </div>
          </div>
          <div className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">
                Regarding Answers
              </h2>
            </div>
            <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
              <div>
                <AnswerCharts />
              </div>
              <div>
                <AnswerUpVotedCharts />
              </div>
            </div>
          </div>
          <div className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">
                Regarding Answers
              </h2>
            </div>
            <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
              <div>
                <CategoryStats />
              </div>
              <div>
                <CategoryExtraStats />
              </div>
            </div>
          </div>
          <div className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
            <div className="w-full flex items-center justify-start p-3">
              <h2 className="font-bold text-white text-4xl">Regarding Tags</h2>
            </div>
            <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
              <div>
                <TagStats />
              </div>
              <div>
                <TagVotesAnswersCharts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
