import apiFetch from "@utils/api/client";

interface RemoveOptions {
  headers?: Record<string, string>;
}

const remove = async (baseUrl: string, options?: RemoveOptions) => {
  try {
    const status = (await apiFetch(baseUrl, {
      method: "DELETE",
      headers: options?.headers,
    })) as number;
    return status;
  } catch (error) {
    throw error;
  }
};

export default remove;
