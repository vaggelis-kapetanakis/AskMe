import React, { useEffect, useState, useMemo } from "react";
import Loading from "../../../../ui/Loading";
import { isIterable } from "../../../../utils/isIterable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ErrorModal from "../../../../ui/ErrorModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserStat {
  _id: { year: number; month: number };
  totalVotes: number;
  totalAnswers: number;
  totalViews: number;
}

const UserChartVotes: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const processUserStats = (stats: UserStat[]) => {
    const dataDate = stats.map(
      (dataObj) => `${dataObj._id.year}-${dataObj._id.month}`
    );
    const dataVotesNum = stats.map((dataObj) => dataObj.totalVotes);
    const dataAnswersNum = stats.map((dataObj) => dataObj.totalAnswers);
    const dataViewsNum = stats.map((dataObj) => dataObj.totalViews);

    return { dataDate, dataVotesNum, dataAnswersNum, dataViewsNum };
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const chartDataTemp = localStorage.getItem("chartData");
        if (!chartDataTemp) {
          setError("No chart data available");
          return;
        }

        const middleware = JSON.parse(chartDataTemp);
        const userStats = middleware.userStats as UserStat[];

        if (!isIterable(userStats)) {
          setError("Invalid user stats data");
          return;
        }

        const { dataDate, dataVotesNum, dataAnswersNum, dataViewsNum } =
          processUserStats(userStats);
        setChartData(
          createChartData(dataDate, dataVotesNum, dataAnswersNum, dataViewsNum)
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
  });

  const createDataset = (
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string
  ) => ({
    label,
    data,
    backgroundColor,
    borderWidth: 2,
    borderColor,
    pointBorderColor: borderColor,
    pointBackgroundColor: borderColor,
    pointHoverBackgroundColor: borderColor,
    pointHoverBorderColor: borderColor,
    pointBorderWidth: windowWidth > 480 ? 5 : 3,
    pointHoverRadius: windowWidth > 480 ? 5 : 3,
    pointHoverBorderWidth: 1,
    pointRadius: 2,
  });

  const createChartData = (
    labels: string[],
    votes: number[],
    answers: number[],
    views: number[]
  ): ChartData<"line"> => ({
    labels,
    datasets: [
      createDataset("Total Votes", votes, "rgba(37,160,226,0.85)", "#25A0E2"),
      createDataset(
        "Total Answers",
        answers,
        "rgba(253,81,202,0.85)",
        "#FD51CA"
      ),
      createDataset("Total Views", views, "rgba(253,90,107,0.85)", "#FD5A6B"),
    ],
  });

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
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
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
          },
        },
        x: {
          ticks: {
            maxRotation: 60,
            minRotation: 60,
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
        Total Votes/Answers/Views per month
      </h3>
      {chartData ? <Line data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default UserChartVotes;
