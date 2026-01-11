import { useState } from "react";
import apiFetch from "@utils/api/client";

function usePut<T>(baseUrl: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string | undefined, item: T) => {
    setLoading(true);
    try {
      await apiFetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        body: item as any,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, update };
}

export default usePut;
