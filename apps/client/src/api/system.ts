import { useAxios } from "../hooks";

export const useSystemInfo = () => {
  const { loading, response, error } = useAxios({
    url: "/system/info",
    method: "get"
  });
  return { loading, response, error };
};
