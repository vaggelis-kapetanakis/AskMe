// src/contexts/ChartContext.tsx
import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
  useCallback,
} from "react";
import axios from "axios";
import { ChartData } from "chart.js";

type ChartType = "bar" | "line" | "pie";
type ChartDataType = (number | [number, number] | null)[];

export interface ChartState {
  chartData: ChartData<ChartType, ChartDataType, unknown>;
}

type ChartAction =
  | {
      type: "SET_CHART_DATA";
      payload: ChartData<ChartType, ChartDataType, unknown>;
    }
  | { type: "CLEAR_CHART_DATA" };

export interface ChartContextType {
  chartState: ChartState;
  chartDispatch: Dispatch<ChartAction>;
  fetchChartData: (userId: string) => Promise<void>;
}

interface ChartProviderProps {
  children: ReactNode;
}

const initialState: ChartState = {
  chartData: {
    labels: [],
    datasets: [{ data: [] }],
  },
};

const chartReducer = (state: ChartState, action: ChartAction): ChartState => {
  switch (action.type) {
    case "SET_CHART_DATA":
      return { ...state, chartData: action.payload };
    case "CLEAR_CHART_DATA":
      return { ...initialState };
    default:
      return state;
  }
};

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined
);

export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
  const [chartState, chartDispatch] = useReducer(chartReducer, initialState);

  const fetchChartData = useCallback(async (userId: string) => {
    try {
      const response = await axios.get<
        ChartData<ChartType, ChartDataType, unknown>
      >(`${import.meta.env.VITE_APP_BACKEND_URL}/charts/user/${userId}`);
      chartDispatch({ type: "SET_CHART_DATA", payload: response.data });
      localStorage.setItem("chartData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  }, []);

  useEffect(() => {
    const storedChartData = localStorage.getItem("chartData");
    if (storedChartData) {
      try {
        const parsedData = JSON.parse(storedChartData) as ChartData<
          ChartType,
          ChartDataType,
          unknown
        >;
        chartDispatch({ type: "SET_CHART_DATA", payload: parsedData });
      } catch (error) {
        console.error("Failed to parse stored chart data:", error);
      }
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
