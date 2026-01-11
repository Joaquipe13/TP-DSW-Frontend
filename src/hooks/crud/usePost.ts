import { useState } from "react";
import apiFetch from "@utils/api/client";

function usePost<T>(baseUrl: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (item: T): Promise<T | undefined | number> => {
    setLoading(true);
    try {
      const result: any = await apiFetch(baseUrl, {
        method: "POST",
        body: item as any,
      });
      const returnedData = result.data;

      console.log("Response data:", returnedData);
      return returnedData;
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, create };
}
export default usePost;
