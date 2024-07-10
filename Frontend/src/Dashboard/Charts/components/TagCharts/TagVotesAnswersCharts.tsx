import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { isIterable } from "../../../../utils/isIterable";
import Loading from "../../../../ui/Loading";
import ErrorModal from "../../../../ui/ErrorModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TagStat {
  _id: string;
  totalVotes: number;
  totalAnswers: number;
}

const TagVotesAnswersCharts: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = () => {
      try {
        const chartDataTemp = localStorage.getItem("chartData");
        if (!chartDataTemp) {
          setError("No chart data available");
          return;
        }

        const middleware = JSON.parse(chartDataTemp);
        const tagUpVotedStats = middleware.tagUpVotedStats as TagStat[];

        if (!isIterable(tagUpVotedStats)) {
          setChartData(createChartData(["No Data"], [0], [0]));
          return;
        }

        const { dataNames, dataTagsVotes, dataTagsAnswers } =
          processTagStats(tagUpVotedStats);
        setChartData(
          createChartData(dataNames, dataTagsVotes, dataTagsAnswers)
        );
      } catch (err) {
        setError("Failed to load chart data");
        console.error(err);
      }
    };

    fetchData();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processTagStats = (stats: TagStat[]) => {
    const dataNames = stats.map((dataObj) => dataObj._id);
    const dataTagsVotes = stats.map((dataObj) => dataObj.totalVotes);
    const dataTagsAnswers = stats.map((dataObj) => dataObj.totalAnswers);

    return { dataNames, dataTagsVotes, dataTagsAnswers };
  };

  const createChartData = (
    labels: string[],
    votes: number[],
    answers: number[]
  ): ChartData<"bar"> => ({
    labels,
    datasets: [
      {
        label: `Tag Votes:`,
        data: votes,
        backgroundColor: [
          "rgba(7,121,228,0.85)",
          "rgba(150, 110, 224,0.85)",
          "rgba(219, 94, 200,0.85)",
          "rgba(255, 84, 161,0.85)",
          "rgba(255, 97, 114,0.85)",
          "rgba(255, 129, 67,0.85)",
          "rgba(255, 166, 0,0.85)",
          "#42C0FB",
          "#82CFFD",
          "#67C8FF",
          "#7EC0EE",
          "#87CEFF",
        ],
        borderWidth: 2,
        borderColor: [
          "#0779e4",
          "#966ee0",
          "#db5ec8",
          "#ff54a1",
          "#ff6172",
          "#ff8143",
          "#ffa600",
          "#000",
        ],
      },
      {
        label: `Tag Answers:`,
        data: answers,
        backgroundColor: [
          "rgba(7,121,228,0.5)",
          "rgba(150, 110, 224,0.5)",
          "rgba(219, 94, 200,0.5)",
          "rgba(255, 84, 161,0.5)",
          "rgba(255, 97, 114,0.5)",
          "rgba(255, 129, 67,0.5)",
          "rgba(255, 166, 0,0.5)",
          "#42C0FB80",
          "#82CFFD80",
          "#67C8FF80",
          "#7EC0EE80",
          "#87CEFF80",
        ],
        borderWidth: 2,
        borderColor: [
          "#0779e4",
          "#966ee0",
          "#db5ec8",
          "#ff54a1",
          "#ff6172",
          "#ff8143",
          "#ffa600",
          "#000",
        ],
      },
    ],
  });

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          labels: {
            boxWidth: windowWidth > 480 ? 40 : 28,
            font: {
              size: windowWidth > 480 ? 14 : 8,
            },
          },
        },
      },
      scales: {
        y: {
          ticks: {
            font: {
              weight: 700 as const,
              size: windowWidth > 480 ? 14 : 8,
            },
          },
          grid: {
            display: false,
            drawOnChartArea: true,
            drawTicks: true,
          },
        },
        x: {
          ticks: {
            font: {
              weight: 700 as const,
              size: windowWidth > 480 ? 14 : 5,
            },
          },
          grid: {
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
          },
        },
      },
    }),
    [windowWidth]
  );

  if (error) return <ErrorModal message={error} />;

  return (
    <aside className="w-full p-3 bg-white rounded-2xl">
      <h3 className="text-black/70 text-xl pl-4 pb-3 pt-4">
        Answers and votes per tag
      </h3>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default TagVotesAnswersCharts;
