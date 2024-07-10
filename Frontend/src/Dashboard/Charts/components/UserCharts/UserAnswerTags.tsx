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
  name: string;
  userAnswerObjId: { count: number };
}

export const UserChartsAnswerTags: React.FC = () => {
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
        const userAnswerTags = middleware.userAnswerTags as TagStat[];

        if (!isIterable(userAnswerTags)) {
          setChartData(createChartData(["No Data"], [0]));
          return;
        }

        const { dataNames, dataTags } = processTagStats(userAnswerTags);
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
    const tagsFirstMiddleware = stats.slice(0, 12);
    const tagsSecondMiddleware = stats.slice(16);

    const others = tagsSecondMiddleware.reduce(
      (sum, tag) => sum + tag.userAnswerObjId.count,
      0
    );

    const dataNames = tagsFirstMiddleware.map((tag) => tag.name);
    const dataTags = tagsFirstMiddleware.map(
      (tag) => tag.userAnswerObjId.count
    );

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
          "#00FF00",
          "#72f400",
          "#9ce800",
          "#bbdb00",
          "#d3ce00",
          "#e6c100",
          "#f4b300",
          "#ffa600",
          "#eab320",
          "#d6bd3b",
          "#c6c454",
          "#b8ca6d",
          "#aece85",
        ],
        borderWidth: 2,
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
        From all the answers you have given we show the tags you have answered
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
