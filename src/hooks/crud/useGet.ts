import { useState, useEffect, useCallback } from "react";
import { porturl } from "@utils/index";

export function useGet<T>(baseUrl: string, expectArray: boolean = true) {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  baseUrl = porturl + baseUrl;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = baseUrl;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("antes de setData");
      console.log("result", result);
      console.log("result.data", result.data[0]);
      console.log("data", data);
      setData(expectArray ? result.data : result.data[0]);
      console.log("despues de setData");
      console.log("result", result);
      console.log("result.data", result.data);
      console.log("data", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (data !== null) setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [baseUrl, fetchData]);

  return { data, loading, error, fetchData };
}
