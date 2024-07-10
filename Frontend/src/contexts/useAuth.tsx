// src/context/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./AuthContext"; // You might need to export this type from AuthContext.tsx

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
