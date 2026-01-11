import { useState, useEffect, useCallback } from "react";
import apiFetch from "@utils/api/client";

function useGet<T>(baseUrl: string, expectArray: boolean = true) {
  const [data, setData] = useState<T[] | T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result: any = await apiFetch(baseUrl, { method: "GET" });
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

export default useGet;
