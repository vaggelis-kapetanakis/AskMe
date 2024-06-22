import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import axios from "axios";

interface ChartState {
  chartData: any;
}

type ChartAction =
  | { type: "SET_CHART_DATA"; payload: any }
  | { type: "CLEAR_CHART_DATA" };

interface ChartContextType {
  chartState: ChartState;
  chartDispatch: Dispatch<ChartAction>;
  fetchChartData: (userId: string) => void;
}

interface ChartProviderProps {
  children: ReactNode;
}

const initialState: ChartState = {
  chartData: null,
};

const chartReducer = (state: ChartState, action: ChartAction): ChartState => {
  switch (action.type) {
    case "SET_CHART_DATA":
      return {
        ...state,
        chartData: action.payload,
      };
    case "CLEAR_CHART_DATA":
      return {
        ...state,
        chartData: null,
      };
    default:
      return state;
  }
};

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined
);

const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
  const [chartState, chartDispatch] = useReducer(chartReducer, initialState);

  const fetchChartData = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8765/qanda/charts/user/${userId}`
      );
      chartDispatch({ type: "SET_CHART_DATA", payload: response.data });
      localStorage.setItem("chartData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  useEffect(() => {
    const storedChartData = localStorage.getItem("chartData");
    if (storedChartData) {
      chartDispatch({
        type: "SET_CHART_DATA",
        payload: JSON.parse(storedChartData),
      });
    }
  }, []);

  return (
    <ChartContext.Provider
      value={{ chartState, chartDispatch, fetchChartData }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export { ChartProvider };
