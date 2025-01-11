import { porturl, setCookieValue } from "../../../common/utils";
export async function validateLogin(email: string, password: string) {
  const url = porturl + "/api/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const res = await response.json();
      const token = res.data.token;
      console.log(token);
      setCookieValue(token, "token", 8);
      console.log("Login successful");
      return token;
    } else {
      const errorData = await response.json();
      console.log("Login failed:", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}
