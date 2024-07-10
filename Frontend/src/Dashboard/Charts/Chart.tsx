import React, { useEffect, useState, useMemo } from "react";
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

interface ChartComponent {
  Component: React.ComponentType;
}

interface ChartSection {
  title: string;
  components: ChartComponent[];
}

const Chart: React.FC = () => {
  const [userHasChartData, setUserHasChartData] = useState<boolean>(false);

  useEffect(() => {
    const chartDataTemp = localStorage.getItem("chartData");
    setUserHasChartData(!!chartDataTemp);
  }, []);

  const chartSections = useMemo(
    () => [
      {
        title: "Your Stats",
        components: [
          { Component: UserQuestMonth },
          { Component: UserChartsTags },
          { Component: UserChartVotes },
          { Component: UserChartsAnswerTags },
        ],
      },
      {
        title: "Regarding Questions",
        components: [
          { Component: QuestionCharts },
          { Component: QuestionUpVotedCharts },
          { Component: QuestionAnswerCharts },
        ],
      },
      {
        title: "Regarding Answers",
        components: [
          { Component: AnswerCharts },
          { Component: AnswerUpVotedCharts },
        ],
      },
      {
        title: "Regarding Categories",
        components: [
          { Component: CategoryStats },
          { Component: CategoryExtraStats },
        ],
      },
      {
        title: "Regarding Tags",
        components: [
          { Component: TagStats },
          { Component: TagVotesAnswersCharts },
        ],
      },
    ],
    []
  );

  const renderChartSection = ({
    title,
    components,
  }: ChartSection): JSX.Element => (
    <div key={title} className="grid grid-rows[0.2fr_1.8fr] gap-y-3 mt-5">
      <div className="w-full flex items-center justify-start p-3">
        <h2 className="font-bold text-white text-4xl">{title}</h2>
      </div>
      <div className="rounded-xl relative grid grid-cols-2 grid-rows-1 gap-x-3 bg-white px-5">
        {components.map(({ Component }, index) => (
          <div key={index}>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        {!userHasChartData ? (
          <div className="backdrop-blur-md bg-white/20 rounded-xl relative overflow-y-scroll overflow-x-hidden h-full px-5 flex items-center justify-center">
            <h1 className="text-black text-2xl bg-white/70 px-5 py-2 rounded-lg">

            Looks like you don't have any chart Data yet! Start by generating
            your own. Go and interact!
            </h1>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/20 rounded-xl relative overflow-y-scroll overflow-x-hidden h-full px-5">
            {chartSections.map(renderChartSection)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
