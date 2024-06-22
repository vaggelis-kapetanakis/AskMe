import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { isIterable } from "../../../../utils/isIterable";
import Loading from "../../../../ui/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserChartsTags = () => {
  const [chartData, setChartData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });

  const fetching = async () => {
    let dataNames = [];
    let dataTags = [];

    const chartDataTemp = localStorage.getItem("chartData");
    if (!chartDataTemp) return;
    const middleware = JSON.parse(chartDataTemp);

    if (isIterable(middleware.userTagsStats)) {
      let tagsFirstMiddleware = middleware.userTagsStats.slice(0, 12);
      let tagsSecondMiddleware = middleware.userTagsStats.slice(
        16,
        middleware.userTagsStats.size
      );

      let others = 0;
      for (var i = 0; i < tagsSecondMiddleware.length; i++) {
        others = others + tagsSecondMiddleware[i].userQuestionObjId.count;
      }
      for (const dataObj of tagsFirstMiddleware) {
        dataNames.push(dataObj.name);
        dataTags.push(dataObj.userQuestionObjId.count);
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
          label: `Tag: `,
          data: dataTags,
          backgroundColor: [
            "#ff6b85",
            "#fa72a9",
            "#ea7ec9",
            "#d28de4",
            "#b29df7",
            "#8dabff",
            "#66b7ff", //1
            "#42c0fb", //2
            "#5cb4fc",
            "#79a7f8",
            "#9598ee",
            "#ae89de",
            "#c278c9",
          ],
          borderWidth: 2,
          borderColor: "#fff",
          type: "pie",
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
          label: function (tooltipItem: TooltipItem<"pie">) {
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
    <aside className="w-full p-3 rounded-2xl">
      <h3 className="text-black/70 text-xl pl-4 pb-3 pt-4">
        From all the questions you asked we show the tags you have asked about
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

export default UserChartsTags;
