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

interface QuestionAnswerStat {
  _id: { year: number; month: number };
  totalQuestions: unknown[];
}

const QuestionAnswerCharts: React.FC = () => {
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
        const questionAnswerStats =
          middleware.questionAnswerStats as QuestionAnswerStat[];

        if (!isIterable(questionAnswerStats)) {
          setChartData(createChartData(["No Data"], [0]));
          return;
        }

        const { dataDate, dataQuestNum } =
          processQuestionAnswerStats(questionAnswerStats);
        setChartData(createChartData(dataDate, dataQuestNum));
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

  const processQuestionAnswerStats = (stats: QuestionAnswerStat[]) => {
    const dataDate = stats.map(
      (dataObj) => `${dataObj._id.year}-${dataObj._id.month}`
    );
    const dataQuestNum = stats.map((dataObj) => dataObj.totalQuestions.length);
    return { dataDate, dataQuestNum };
  };

  const createChartData = (
    labels: string[],
    data: number[]
  ): ChartData<"bar"> => ({
    labels,
    datasets: [
      {
        label: "Questions answered per month",
        data,
        backgroundColor: "rgba(144, 238, 144, 0.4)",
        borderWidth: 4,
        borderColor: "#32CD32",
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
        Questions that have been answered per month
      </h3>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default QuestionAnswerCharts;
