import getCookieValue from "@utils/auth/getCookieValue";
import porturl from "@utils/route";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
  skipRateLimit?: boolean;
}

async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    requiresAuth = false,
    skipRateLimit = false,
    ...fetchOptions
  } = options;


  const url = endpoint.startsWith("http") ? endpoint : porturl + endpoint;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };


  if (requiresAuth) {
    const token = getCookieValue("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      credentials: "include",
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP Error: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}

export default apiFetch;
