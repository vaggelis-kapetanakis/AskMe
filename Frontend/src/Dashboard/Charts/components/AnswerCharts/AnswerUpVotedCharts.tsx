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

interface AnswerStat {
  _id: { year: number; month: number };
  totalVotes: number;
  totalAnswers: unknown[];
}

const AnswerUpVotedCharts: React.FC = () => {
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
        const answerUpVotedStats =
          middleware.answerUpVotedStats as AnswerStat[];
        const answerStats = middleware.answerStats as AnswerStat[];

        if (!isIterable(answerUpVotedStats) || !isIterable(answerStats)) {
          setChartData(createChartData(["No Data"], [0], [0]));
          return;
        }

        const { dataDate, dataAnsNum, dataTotalAnsNum } = processAnswerStats(
          answerUpVotedStats,
          answerStats
        );
        setChartData(createChartData(dataDate, dataAnsNum, dataTotalAnsNum));
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

  const processAnswerStats = (
    upVotedStats: AnswerStat[],
    totalStats: AnswerStat[]
  ) => {
    const dataAnsNum = upVotedStats.length
      ? upVotedStats.map((dataObj) => dataObj.totalVotes)
      : [0];
    const dataTotalAnsNum = upVotedStats.map(
      (dataObj) => dataObj.totalAnswers.length
    );
    const dataDate = totalStats.map(
      (dataObj) => `${dataObj._id.year}-${dataObj._id.month}`
    );
    return { dataDate, dataAnsNum, dataTotalAnsNum };
  };

  const createChartData = (
    labels: string[],
    upvotedData: number[],
    totalData: number[]
  ): ChartData<"bar"> => ({
    labels,
    datasets: [
      {
        label: "Answers that have been upvoted per month",
        data: upvotedData,
        backgroundColor: "rgba(37,160,226, 0.4)",
        borderWidth: 2,
        borderColor: "#25A0E2",
      },
      {
        label: "Total answers provided per month",
        data: totalData,
        backgroundColor: "rgba(253,81,202, 0.4)",
        borderWidth: 2,
        borderColor: "#FD51CA",
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
              size: windowWidth > 480 ? 14 : 8,
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
        Answers that have been upvoted per month
      </h3>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default AnswerUpVotedCharts;
