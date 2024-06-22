import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { isIterable } from "../../../../utils/isIterable";
import Loading from "../../../../ui/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryStats = () => {
  const [chartData, setChartData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });

  const chartDataTemp = localStorage.getItem("chartData");
  if (!chartDataTemp) return;
  const middleware = JSON.parse(chartDataTemp);

  const fetching = async () => {
    let dataNames = [];
    let dataCategory = [];

    if (isIterable(middleware.categoryStats)) {
      for (const dataObj of middleware.categoryStats) {
        dataNames.push(dataObj._id);
        dataCategory.push(dataObj.count);
      }
    } else {
      dataNames = [0];
      dataCategory = [0];
    }

    setChartData({
      labels: dataNames,
      datasets: [
        {
          label: `Category:`,
          data: dataCategory,
          backgroundColor: [
            "#83B2FF",
            "#9BC1FF",
            "#2477FF",
            "#3C86FF",
            "#5394FF",
            "#6BA3FF",
            "#38aaff",
            "#42C0FB",
            "#82CFFD",
            "#67C8FF",
            "#7EC0EE",
            "#87CEFF",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    });
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: ChartOptions<"pie"> = {
    responsive: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const title = tooltipItem.label;
            const label =
              chartData["datasets"][0]["data"][tooltipItem["dataIndex"]];
            const dataset = chartData["datasets"][0];
            const percent = Math.round(
              (dataset["data"][tooltipItem["dataIndex"]] /
                // @ts-ignore
                tooltipItem.chart._metasets[0].total) *
                100
            );
            return " " + title + ": " + label + " (" + percent + "%)";
          },
        },
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: window.innerWidth > 480 ? 40 : 28,
          font: {
            size: window.innerWidth > 480 ? 14 : 8,
          },
        },
      },
    },
  };

  return (
    <aside className="w-full p-3 bg-white rounded-2xl">
      <h3 className="text-black/70 text-xl pl-4 pb-3 pt-4">
        From all the questions we show the division of the categories
      </h3>
      <br />
      <div className="w-full flex items-center justify-center">
        {chartData ? (
          <Pie
            data={chartData}
            // @ts-ignore
            options={options}
            width={350}
            height={350}
          />
        ) : (
          <Loading />
        )}
      </div>
    </aside>
  );
};

export default CategoryStats;
