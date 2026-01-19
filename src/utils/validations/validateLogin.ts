import setCookieValue from "@utils/auth/setCookieValue";
import apiFetch from "@utils/api/apiFetch";

async function validateLogin(email: string, password: string) {
  try {
    const res = await apiFetch<{ data: string }>("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const token = res.data;
    setCookieValue(token, "token", 8);
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}
export default validateLogin;
