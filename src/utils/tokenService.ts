import { Role } from "./../type";
import { refreshToken } from "../request";

const JWT_TOKEN_KEY_NAME = "loginData";

export const tokenService = {
  getJwtToken() {
    return JSON.parse(localStorage.getItem(JWT_TOKEN_KEY_NAME) ?? "{}").token;
  },
  getRole(): Role {
    return JSON.parse(localStorage.getItem(JWT_TOKEN_KEY_NAME) ?? "{}").role;
  },
  getIsAuth() {
    return JSON.parse(localStorage.getItem(JWT_TOKEN_KEY_NAME) ?? "{}").token
      ? true
      : false;
  },
  getJwtRefreshToken() {
    return JSON.parse(localStorage.getItem(JWT_TOKEN_KEY_NAME) ?? "{}")
      .longToken;
  },
  removeJwtToken() {
    localStorage.removeItem(JWT_TOKEN_KEY_NAME);
  },
  setJwtToken(value: any) {
    localStorage.setItem(JWT_TOKEN_KEY_NAME, JSON.stringify(value));
  },
};

export const updateToken = async () => {
  const longToken = tokenService.getJwtRefreshToken();

  try {
    const response = await refreshToken({ refreshToken: longToken || "" });
    tokenService.setJwtToken(response.data);
    //@ts-ignore
    window.location.reload(false);

  } catch (error) {
    //@ts-ignore
    window.location.reload(false);
    tokenService.removeJwtToken();
  }
};
