import { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TagVotesAnswersCharts = () => {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const chartDataTemp = localStorage.getItem("chartData");
  if (!chartDataTemp) return;
  const middleware = JSON.parse(chartDataTemp);

  const fetching = async () => {
    let dataNames = [];
    let dataTagsAnswers = [];
    let dataTagsVotes = [];

    if (isIterable(middleware.tagUpVotedStats)) {
      for (const dataObj of middleware.tagUpVotedStats) {
        dataNames.push(dataObj._id);
        dataTagsVotes.push(dataObj.totalVotes);
        dataTagsAnswers.push(dataObj.totalAnswers);
      }
    } else {
      dataNames = [0];
      dataTagsAnswers = [0];
      dataTagsVotes = [0];
    }

    setChartData({
      labels: dataNames,
      datasets: [
        {
          label: `Tag Votes:`,
          data: dataTagsVotes,
          backgroundColor: [
            "rgba(7,121,228,0.85)",
            "rgba(150, 110, 224,0.85)",
            "rgba(219, 94, 200,0.85)",
            "rgba(255, 84, 161,0.85)",
            "rgba(255, 97, 114,0.85)",
            "rgba(255, 129, 67,0.85)",
            "rgba(255, 166, 0,0.85)",
            "#42C0FB",
            "#82CFFD",
            "#67C8FF",
            "#7EC0EE",
            "#87CEFF",
          ],
          borderWidth: 2,
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
      ],
    });
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: window.innerWidth > 480 ? 40 : 28,
          font: {
            size: window.innerWidth > 480 ? 14 : 8,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            weight: 700,
            size: window.innerWidth > 480 ? 14 : 8,
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
            weight: 700,
            size: window.innerWidth > 480 ? 14 : 5,
          },
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
      },
    },
  };

  return (
    <aside className="w-full p-3 bg-white rounded-2xl">
      <h3 className="text-black/70 text-xl pl-4 pb-3 pt-4">
        Answers and votes per tag
      </h3>
      <br></br>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default TagVotesAnswersCharts;
