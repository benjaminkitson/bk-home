// Error handling?

import { JwtPayload, decode } from "jsonwebtoken";

export const setAuthToken = (token: string) => {
  document.cookie = `bkAuth=${token}`;
};

const isJwtPayload = (data: any): data is JwtPayload => {
  return !!data.exp;
};

export const checkToken = (token?: string) => {
  if (!token) {
    return false;
  }
  const data = decode(token);
  if (isJwtPayload(data) && data.exp && data.exp <= Date.now()) {
    return true;
  }
  document.cookie = "bkAuth=";
  return false;
};

export const checkClientToken = () => {
  const token = document.cookie.split("=")[1];
  return checkToken(token);
};
