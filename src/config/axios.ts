/* eslint-disable no-useless-catch */

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  AxiosRequestConfig,
} from "axios";
import { authService } from "@/services/authService";

// Define a custom axios instance
const api = axios.create({
  withCredentials: false,
  timeout: 60000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    config.headers = new AxiosHeaders({
      "Content-Type": "application/json",
      ...config.headers,
      Authorization: `Bearer ${token}`,
    });

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await authService.refreshToken(refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error || "Error");
  }
);

export default api;
