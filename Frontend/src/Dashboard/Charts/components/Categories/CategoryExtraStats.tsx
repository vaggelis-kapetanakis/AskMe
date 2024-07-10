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

interface CategoryStat {
  _id: string;
  totalAnswers: number;
  totalVotes: number;
}

const CategoryExtraStats: React.FC = () => {
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
        const categoryStats = middleware.categoryStats as CategoryStat[];

        if (!isIterable(categoryStats)) {
          setChartData(createChartData(["No Data"], [0], [0]));
          return;
        }

        const { dataNames, dataScience, dataScienceVotes } =
          processCategoryStats(categoryStats);
        setChartData(createChartData(dataNames, dataScience, dataScienceVotes));
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

  const processCategoryStats = (stats: CategoryStat[]) => {
    const dataNames = stats.map((dataObj) => dataObj._id);
    const dataScience = stats.map((dataObj) => dataObj.totalAnswers);
    const dataScienceVotes = stats.map((dataObj) => dataObj.totalVotes);
    return { dataNames, dataScience, dataScienceVotes };
  };

  const createChartData = (
    labels: string[],
    answers: number[],
    votes: number[]
  ): ChartData<"bar"> => ({
    labels,
    datasets: [
      {
        label: `Answers provided for this category`,
        data: answers,
        backgroundColor: [
          "rgba(7,121,228,0.85)",
          "rgba(150, 110, 224,0.85)",
          "rgba(219, 94, 200,0.85)",
          "rgba(255, 84, 161,0.85)",
          "rgba(255, 97, 114,0.85)",
          "rgba(255, 129, 67,0.85)",
          "rgba(255, 166, 0,0.85)",
          "rgba(0,0,0,0.85)",
        ],
        borderWidth: 4,
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
        label: `Total votes of this category`,
        data: votes,
        backgroundColor: [
          "rgba(0, 162, 247,0.85)",
          "rgba(236, 104, 197,0.85)",
          "rgba(255, 100, 166,0.85)",
          "rgba(255, 107, 133,0.85)",
          "rgba(215, 90, 145,0.85)",
          "rgba(238, 98, 114,0.85)",
          "rgba(154, 169, 21,0.85)",
          "rgba(65, 39, 40,0.85)",
        ],
        borderWidth: 4,
        borderColor: [
          "#00A2F7",
          "#EC68C5",
          "#FF64A6",
          "#FF6B85",
          "#D75A91",
          "#EE6272",
          "#9AA915",
          "#412728",
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
        Answers and votes per category
      </h3>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default CategoryExtraStats;
