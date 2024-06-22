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

const UserQuestMonth = () => {
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
    if (isIterable(middleware.userStats)) {
      for (const dataObj of middleware.userStats) {
        dataQuestNum.push(dataObj.totalQuestions.length);
        dataDate.push(dataObj._id.year + "-" + dataObj._id.month); // dataObj._id.year + "-" + dataObj._id.month
      }
    } else {
      dataQuestNum = [0];
      dataDate = ["0"];
    }

    console.log(dataDate);

    setChartData({
      labels: dataDate,
      datasets: [
        {
          label: "Questions asked per month",
          data: dataQuestNum,
          barThickness: 25,
          backgroundColor: ["rgba(37,160,226, 0.4)"],
          borderWidth: 2,
          borderColor: "#25A0E2",
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
        position: "top" as const,
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
          maxRotation: 60,
          minRotation: 60,
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
        Questions asked per month by you
      </h3>
      <br></br>
      {chartData ? <Bar data={chartData} options={options} /> : <Loading />}
    </aside>
  );
};

export default UserQuestMonth;
