import { useEffect, useState } from "react";
import Loading from "../../../../ui/Loading";
import { isIterable } from "../../../../utils/isIterable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserChartVotes = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const fetching = async () => {
    let dataDate = [];
    let dataVotesNum = [];
    let dataAnswersNum = [];
    let dataViewsNum = [];

    const chartDataTemp = localStorage.getItem("chartData");
    if (!chartDataTemp) return;
    const middleware = JSON.parse(chartDataTemp);

    if (isIterable(middleware.userStats)) {
      for (const dataObj of middleware.userStats) {
        dataVotesNum.push(dataObj.totalVotes);
        dataAnswersNum.push(dataObj.totalAnswers);
        dataViewsNum.push(dataObj.totalViews);
        dataDate.push(dataObj._id.year + "-" + dataObj._id.month); // dataObj._id.year + "-" + dataObj._id.month
      }
    }

    setChartData({
      labels: dataDate,
      datasets: [
        {
          label: "Total Votes",
          data: dataVotesNum,
          backgroundColor: ["rgba(37,160,226,0.85)"],
          borderWidth: 2,
          borderColor: "#25A0E2",
          pointBorderColor: "#25A0E2",
          pointBackgroundColor: "#25A0E2",
          pointHoverBackgroundColor: "#25A0E2",
          pointHoverBorderColor: "#25A0E2",
          pointBorderWidth: window.innerWidth > 480 ? 5 : 3,
          pointHoverRadius: window.innerWidth > 480 ? 5 : 3,
          pointHoverBorderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "Total Answers",
          data: dataAnswersNum,
          backgroundColor: "rgba(253,81,202,0.85)",
          borderWidth: 2,
          borderColor: "#FD51CA",
          pointBorderColor: "#FD51CA",
          pointBackgroundColor: "#FD51CA",
          pointHoverBackgroundColor: "#FD51CA",
          pointHoverBorderColor: "#FD51CA",
          pointBorderWidth: window.innerWidth > 480 ? 5 : 3,
          pointHoverRadius: window.innerWidth > 480 ? 5 : 3,
          pointHoverBorderWidth: 1,
          pointRadius: 2,
        },
        {
          label: "Total Views",
          data: dataViewsNum,
          backgroundColor: "rgba(253,90,107,0.85)",
          borderWidth: 2,
          borderColor: "#FD5A6B",
          pointBorderColor: "#FD5A6B",
          pointBackgroundColor: "#FD5A6B",
          pointHoverBackgroundColor: "#FD5A6B",
          pointHoverBorderColor: "#FD5A6B",
          pointBorderWidth: window.innerWidth > 480 ? 5 : 3,
          pointHoverRadius: window.innerWidth > 480 ? 5 : 3,
          pointHoverBorderWidth: 1,
          pointRadius: 2,
        },
      ],
    });
  };

  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
          display: true,
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
        Total Votes/Answers/Views per month
      </h3>
      <br></br>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <Loading />
      )}
    </aside>
  );
};

export default UserChartVotes;
