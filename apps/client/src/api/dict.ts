import { useAxios } from "../hooks";

export interface IDictSearchForm {
  name: string;
  code: string;
}

export const useDictList = (params: IDictSearchForm) => {
  const { loading, response, error, execute } = useAxios({
    url: "dict",
    method: "get",
    params
  });
  return {
    loading,
    response,
    error,
    execute
  };
};
