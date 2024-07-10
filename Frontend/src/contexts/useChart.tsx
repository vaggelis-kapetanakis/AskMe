// src/hooks/useChart.ts
import { useContext } from "react";
import { ChartContext, ChartContextType } from "../contexts/ChartContext";

export const useChart = (): ChartContextType => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error("useChart must be used within a ChartProvider");
  }
  return context;
};
