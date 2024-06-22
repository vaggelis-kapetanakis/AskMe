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

const QuestionCharts = () => {
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
    if (isIterable(middleware.questionStats)) {
      for (const dataObj of middleware.questionStats) {
        dataQuestNum.push(dataObj.totalQuestions.length);
        dataDate.push(dataObj._id.year + "-" + dataObj._id.month); // dataObj._id.year + "-" + dataObj._id.month
      }
    } else {
      dataDate = [0];
      dataQuestNum = [0];
    }

    setChartData({
      labels: dataDate,
      datasets: [
        {
          label: "Questions asked per month",
          data: dataQuestNum,
          backgroundColor: "rgba(7, 121, 228, 0.4)",
          borderWidth: 4,
          borderColor: "#0779e4",
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
        Questions asked per month
      </h3>
      <br></br>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default QuestionCharts;
