"use client";

import { checkClientToken, checkToken } from "@/app/utils/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const initialContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
};

export const AuthContext = createContext<AuthContextValue>(initialContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
  token?: string;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
  token,
}) => {
  const isAuth = checkToken(token);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);

  useEffect(() => {
    setIsAuthenticated(checkClientToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
