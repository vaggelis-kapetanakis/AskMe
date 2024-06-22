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

const TagStats = () => {
  const [chartData, setChartData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });

  const chartDataTemp = localStorage.getItem("chartData");
  if (!chartDataTemp) return;
  const middleware = JSON.parse(chartDataTemp);

  const fetching = async () => {
    let dataNames = [];
    let dataTags = [];

    if (isIterable(middleware.tagStats)) {
      let tagsFirstMiddleware = middleware.tagStats.slice(0, 10);
      let tagsSecondMiddleware = middleware.tagStats.slice(
        16,
        middleware.tagStats.size
      );

      let others = 0;
      for (var i = 0; i < tagsSecondMiddleware.length; i++) {
        others = others + tagsSecondMiddleware[i].totalQuestions;
      }
      for (const dataObj of tagsFirstMiddleware) {
        dataNames.push(dataObj._id);
        dataTags.push(dataObj.totalQuestions);
      }
      dataNames.push("others");
      dataTags.push(others);
    } else {
      dataNames = [0];
      dataTags = [0];
    }

    setChartData({
      labels: dataNames,
      datasets: [
        {
          label: `Tag:`,
          data: dataTags,
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
        From all the questions we show the division of the tags
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

export default TagStats;
