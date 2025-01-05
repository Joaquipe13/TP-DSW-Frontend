import { porturl } from "../../common/utils/route.ts";
import Cookies from "js-cookie";

export async function validateLogin(email: string, password: string) {
  const url = porturl + "/api/login";
  try {
    console.log(JSON.stringify({ email, password }));
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const res = await response.json();
      const user = res.data;

      Cookies.set("user", JSON.stringify(user), {
        expires: 1 / 24,
        path: "/",
        secure: true,
      });

      console.log(user, " successfully logged");
      return user;
    } else {
      const errorData = await response.json();
      console.log("Login failed:", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}
