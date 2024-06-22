import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

const data = {
  labels: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
  datasets: [
    {
      label: "Answered questions per user count",
      data: [20, 65, 88, 110, 187, 281, 458, 613, 798, 912],
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
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    title: {
      text: "Answered questions per user count",
      position: "top",
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

const LineChartHero = () => {
  return (
    <aside className="w-[40vw] p-3 bg-white rounded-2xl">
      <Line data={data} options={options} />
    </aside>
  );
};

export default LineChartHero;
