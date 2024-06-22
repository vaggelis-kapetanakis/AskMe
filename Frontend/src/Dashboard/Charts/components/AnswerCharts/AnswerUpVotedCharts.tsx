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

const AnswerUpVotedCharts = () => {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const chartDataTemp = localStorage.getItem("chartData");
  if (!chartDataTemp) return;
  const middleware = JSON.parse(chartDataTemp);

  const fetching = async () => {
    let dataDate = [];
    let dataAnsNum = [];
    let dataTotalAnsNum = [];
    if (
      isIterable(middleware.answerUpVotedStats) &&
      isIterable(middleware.answerStats)
    ) {
      if (middleware.answerUpVotedStats.length === 0) {
        dataAnsNum = [0];
      } else {
        for (const dataObj of middleware.answerUpVotedStats) {
          dataAnsNum.push(dataObj.totalVotes);
        }
      }

      for (const dataObj of middleware.answerUpVotedStats) {
        dataTotalAnsNum.push(dataObj.totalAnswers.length);
      }

      for (const dataObj of middleware.answerStats) {
        dataDate.push(dataObj._id.year + "-" + dataObj._id.month);
      }
    } else {
      dataAnsNum = [0];
      dataDate = [0];
      dataTotalAnsNum = [0];
    }

    setChartData({
      labels: dataDate,
      datasets: [
        {
          label: "Answers that have been upvoted per month",
          data: dataAnsNum,
          backgroundColor: "rgba(37,160,226, 0.4)",
          borderWidth: 2,
          borderColor: "#25A0E2",
        },
        {
          label: "Total answers provided per month",
          data: dataTotalAnsNum,
          backgroundColor: "rgba(253,81,202, 0.4)",
          borderWidth: 2,
          borderColor: "#FD51CA",
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
        Answers that have been upvoted per month
      </h3>
      <br></br>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default AnswerUpVotedCharts;
