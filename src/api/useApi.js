//useApi 실패...

import axios from "axios";
import { useEffect, useState } from "react";

export const useApi = (method, url, data, skip = false) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("함수 실행됨");

  const fetchApi = async () => {
    console.log("fetch api 실행됨");
    try {
      const res = await axios({
        method: method,
        baseURL: "https://bookmoji.site",
        url: url,
        data: data,
      });
      setResponse(res);
      setLoading(false);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchApi();
  }, [url]);
  return { response, error, loading };
};
