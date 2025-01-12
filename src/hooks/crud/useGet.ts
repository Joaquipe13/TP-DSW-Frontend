import { useState, useEffect, useCallback } from "react";
import { porturl } from "@utils/index.ts";

export function useGet<T>(baseUrl: string, expectArray: boolean = true) {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  baseUrl = porturl + baseUrl;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = baseUrl;
      console.log(url);
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
      setData(expectArray ? (result.data as T[]) : (result.data as T));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [baseUrl]);

  return { data, loading, error, fetchData };
}
