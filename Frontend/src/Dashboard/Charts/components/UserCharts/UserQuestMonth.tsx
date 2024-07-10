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

interface UserStat {
  _id: { year: number; month: number };
  totalQuestions: unknown[];
}

const UserQuestMonth: React.FC = () => {
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
        const userStats = middleware.userStats as UserStat[];

        const createChartData = (labels: string[], data: number[]) => ({
          labels,
          datasets: [
            {
              label: "Questions asked per month",
              data,
              barThickness: 25,
              backgroundColor: ["rgba(37,160,226, 0.4)"],
              borderWidth: 2,
              borderColor: "#25A0E2",
            },
          ],
        });

        if (!isIterable(userStats)) {
          setChartData(createChartData(["0"], [0]));
        } else {
          const dataDate = userStats.map(
            (dataObj) => `${dataObj._id.year}-${dataObj._id.month}`
          );
          const dataQuestNum = userStats.map(
            (dataObj) => dataObj.totalQuestions.length
          );
          setChartData(createChartData(dataDate, dataQuestNum));
        }
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

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
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
            display: false,
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
        Questions asked per month by you
      </h3>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default UserQuestMonth;
