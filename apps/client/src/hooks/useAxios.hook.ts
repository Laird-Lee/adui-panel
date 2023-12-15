import { useState, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../utils";

interface UseAxiosProps extends AxiosRequestConfig {
  manual?: boolean;
}

interface UseAxiosResponse<T> {
  response: AxiosResponse<T> | null;
  error: Error | null;
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAxios = <T = any>({
  manual = false,
  ...config
}: UseAxiosProps): UseAxiosResponse<T> & { execute: () => void } => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(!manual);

  const execute = () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    return axiosInstance
      .request<T>(config)
      .then((response) => setResponse(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!manual) {
      void execute();
    }
  }, []);

  return { response, error, loading, execute };
};

export default useAxios;
