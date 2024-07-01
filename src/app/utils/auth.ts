// Error handling?

import { JwtPayload, decode } from "jsonwebtoken";
import { useEffect, useState } from "react";

export const setAuthToken = (token: string) => {
  localStorage.setItem("bkToken", token);
};

const isJwtPayload = (data: any): data is JwtPayload => {
  return !!data.exp;
};

export const checkToken = () => {
  const token = localStorage.getItem("bkToken");
  console.log("test");
  if (!token) {
    return false;
  }
  const data = decode(token);
  if (isJwtPayload(data) && data.exp && data.exp <= Date.now()) {
    return true;
  }
  localStorage.removeItem("bkToken");
  return false;
};

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {}, []);

  return isAuthenticated;
};
