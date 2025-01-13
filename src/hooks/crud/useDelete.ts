import { porturl } from "@utils/index.ts";

interface RemoveOptions {
  headers?: Record<string, string>;
}

export const remove = async (baseUrl: string, options?: RemoveOptions) => {
  const url = `${porturl}${baseUrl}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: options?.headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return response.status;
  } catch (error) {
    console.error("Error in remove request:", error);
    throw error;
  }
};
