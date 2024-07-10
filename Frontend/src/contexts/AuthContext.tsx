// src/context/AuthContext.tsx
import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { ChartContext } from "./ChartContext";
import { AuthProps } from "../types/authTypes";

interface AuthState {
  isAuthenticated: boolean;
  user: AuthProps;
}

type AuthAction =
  | { type: "LOGIN"; payload: AuthProps }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: AuthProps };

export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  login: (userData: AuthProps) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    userId: "",
    email: "",
    token: "",
    username: "",
    userQuestions: undefined,
    notifications: [],
  },
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: initialState.user,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const chartContext = useContext(ChartContext);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    if (chartContext) {
      chartContext.chartDispatch({ type: "CLEAR_CHART_DATA" });
    }
    localStorage.removeItem("chartData");
    navigate("/");
  }, [navigate, chartContext]);

  const checkTokenExpiry = useCallback(() => {
    const tokenExpiryTime = 3600 * 1000; // 1 hour in milliseconds
    const tokenExpiryDate = new Date().getTime() + tokenExpiryTime;

    setTimeout(() => {
      logout();
    }, tokenExpiryDate - new Date().getTime());
  }, [logout]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData: AuthProps = JSON.parse(storedUser);
      dispatch({ type: "SET_USER", payload: userData });
      dispatch({ type: "LOGIN", payload: userData });
      checkTokenExpiry();
    }
  }, [checkTokenExpiry]);

  const login = useCallback(
    (userData: AuthProps) => {
      dispatch({ type: "LOGIN", payload: userData });
      localStorage.setItem("user", JSON.stringify(userData));
      checkTokenExpiry();
      navigate("/signedin");
    },
    [navigate, checkTokenExpiry]
  );

  const contextValue: AuthContextType = {
    state,
    dispatch,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
