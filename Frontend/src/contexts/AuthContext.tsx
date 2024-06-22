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
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: any };

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  login: (userData: any) => void;
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
    userQuestions: null,
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
        user: {
          userId: "",
          email: "",
          token: "",
          username: "",
          userQuestions: null,
          notifications: [],
        },
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

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const chartContext = useContext(ChartContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch({ type: "SET_USER", payload: userData });
      dispatch({ type: "LOGIN", payload: userData });
      checkTokenExpiry();
    }
  }, [navigate]);

  const checkTokenExpiry = useCallback(() => {
    const tokenExpiryTime = 3600 * 1000; // 1 hour in milliseconds
    const tokenExpiryDate = new Date().getTime() + tokenExpiryTime;

    setTimeout(() => {
      logout();
      navigate("/");
    }, tokenExpiryDate - new Date().getTime());
  }, [navigate]);

  const login = (userData: any) => {
    dispatch({ type: "LOGIN", payload: userData });
    localStorage.setItem("user", JSON.stringify(userData));
    checkTokenExpiry();
    navigate("/signedin");
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    if (chartContext) {
      chartContext.chartDispatch({ type: "CLEAR_CHART_DATA" });
    }
    localStorage.removeItem("chartData");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
