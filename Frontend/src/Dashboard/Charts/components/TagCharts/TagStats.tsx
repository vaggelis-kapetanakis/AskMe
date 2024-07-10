import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { isIterable } from "../../../../utils/isIterable";
import Loading from "../../../../ui/Loading";
import ErrorModal from "../../../../ui/ErrorModal";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TagStat {
  _id: string;
  totalQuestions: number;
}

const TagStats: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"pie"> | null>(null);
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
        const tagStats = middleware.tagStats as TagStat[];

        if (!isIterable(tagStats)) {
          setChartData(createChartData(["No Data"], [0]));
          return;
        }

        const { dataNames, dataTags } = processTagStats(tagStats);
        setChartData(createChartData(dataNames, dataTags));
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
    const tagsFirstMiddleware = stats.slice(0, 10);
    const tagsSecondMiddleware = stats.slice(16);

    const others = tagsSecondMiddleware.reduce(
      (sum, tag) => sum + tag.totalQuestions,
      0
    );

    const dataNames = tagsFirstMiddleware.map((tag) => tag._id);
    const dataTags = tagsFirstMiddleware.map((tag) => tag.totalQuestions);

    dataNames.push("others");
    dataTags.push(others);

    return { dataNames, dataTags };
  };

  const createChartData = (
    labels: string[],
    data: number[]
  ): ChartData<"pie"> => ({
    labels,
    datasets: [
      {
        label: `Tag:`,
        data,
        backgroundColor: [
          "#0779e4",
          "#966ee0",
          "#db5ec8",
          "#ff54a1",
          "#ff6172",
          "#ff8143",
          "#ffa600",
          "#42C0FB",
          "#82CFFD",
          "#67C8FF",
          "#7EC0EE",
          "#87CEFF",
        ],
        borderWidth: 4,
        borderColor: "#fff",
      },
    ],
  });

  const options: ChartOptions<"pie"> = useMemo(
    () => ({
      responsive: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem: TooltipItem<"pie">) {
              if (!chartData) return "";
              const dataset = chartData.datasets[0];
              const total = dataset.data.reduce(
                (acc, value) => acc + Number(value),
                0
              );
              const value = Number(dataset.data[tooltipItem.dataIndex]);
              const percent = Math.round((value / total) * 100);
              return ` ${tooltipItem.label}: ${value} (${percent}%)`;
            },
          },
        },
        legend: {
          display: true,
          position: "right" as const,
          labels: {
            boxWidth: windowWidth > 480 ? 40 : 28,
            font: {
              size: windowWidth > 480 ? 14 : 8,
            },
          },
        },
      },
    }),
    [windowWidth, chartData]
  );

  if (error) return <ErrorModal message={error} />;

  return (
    <aside className="w-full p-3 bg-white rounded-2xl">
      <h3 className="text-black/70 text-xl pl-4 pb-3 pt-4">
        From all the questions we show the division of the tags
      </h3>
      <div className="w-full flex items-center justify-center">
        {chartData ? (
          <Pie data={chartData} options={options} width={350} height={350} />
        ) : (
          <Loading />
        )}
      </div>
    </aside>
  );
};

export default TagStats;
