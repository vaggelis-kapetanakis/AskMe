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

const QuestionUpVotedCharts = () => {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const chartDataTemp = localStorage.getItem("chartData");
  if (!chartDataTemp) return;
  const middleware = JSON.parse(chartDataTemp);

  const fetching = async () => {
    let dataDate = [];
    let dataQuestNum = [];
    let dataTotalQuestNum = [];
    if (
      isIterable(middleware.questionUpVotedStats) &&
      isIterable(middleware.questionStats)
    ) {
      for (const dataObj of middleware.questionUpVotedStats) {
        dataQuestNum.push(dataObj.totalQuestions.length);
      }

      for (const dataObj of middleware.questionStats) {
        dataTotalQuestNum.push(dataObj.totalQuestions.length);
      }

      for (const dataObj of middleware.questionStats) {
        dataDate.push(dataObj._id.year + "-" + dataObj._id.month);
      }
    } else {
      dataDate = [0];
      dataQuestNum = [0];
      dataTotalQuestNum = [0];
    }

    setChartData({
      labels: dataDate,
      datasets: [
        {
          label: "Questions that have been upvoted per month",
          data: dataQuestNum,
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
        {
          label: "Total questions asked per month",
          data: dataTotalQuestNum,
          backgroundColor: [
            "rgba(0, 162, 247,0.85)",
            "rgba(236, 104, 197,0.85)",
            "rgba(255, 100, 166,0.85)",
            "rgba(255, 107, 133,0.85)",
            "rgba(215, 90, 145,0.85)",
            "rgba(238, 98, 114,0.85)",
            "rgba(154, 169, 21,0.85)",
            "#42C0FB",
            "#82CFFD",
            "#67C8FF",
            "#7EC0EE",
            "#87CEFF",
          ],
          borderWidth: 2,
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
  };

  useEffect(() => {
    fetching();
    /* localStorage.setItem('myValueInLocalStorage', value); */
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
            size: window.innerWidth > 480 ? 14 : 8,
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
        Questions that have been upvoted per month
      </h3>
      <br></br>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default QuestionUpVotedCharts;
