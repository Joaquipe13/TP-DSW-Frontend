import { porturl } from "../../../common/utils/route";
import Cookies from "js-cookie";

interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUser(userData: UserData) {
  const url = porturl + "/api/users";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const res = await response.json();
      const user = res.data;

      Cookies.set("user", JSON.stringify(user), {
        expires: 1 / 24,
        path: "/",
        secure: true,
      });

      return user;
    } else {
      const errorData = await response.json();
      console.log("Registration failed:", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return null;
  }
}
