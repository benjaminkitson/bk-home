// Error handling?

import { JwtPayload, decode } from "jsonwebtoken";
import { useEffect, useState } from "react";

export const setAuthToken = (token: string) => {
  localStorage.setItem("bkToken", token);
};

const isJwtPayload = (data: any): data is JwtPayload => {
  return !!data.exp;
};

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("bkToken");
    console.log("test");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const data = decode(token);
    if (isJwtPayload(data) && data.exp && data.exp <= Date.now()) {
      setIsAuthenticated(true);
      return;
    }
    localStorage.removeItem("bkToken");
    setIsAuthenticated(false);
    return;
  }, []);

  return isAuthenticated;
};
