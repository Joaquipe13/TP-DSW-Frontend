import { porturl } from "@utils/index.ts";
export async function removeToken(token: string) {
  const url = porturl + "/api/login/revoke-token";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res.message);
    } else {
      const errorData = await response.json();
      console.log(errorData.message);
    }
    return;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}
