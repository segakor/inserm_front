import axios from "axios";
import { updateToken, tokenService } from "./utils/tokenService";

export const axiosClient = axios;

axiosClient.interceptors.request.use((config) => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${tokenService.getJwtToken()}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        updateToken();
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.message);
  }
);
