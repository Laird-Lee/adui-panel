import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8888/api/",
  timeout: 600000
});

axiosInstance.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
