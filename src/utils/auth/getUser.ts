import { apiFetch } from "@utils/api/client";
import getCookieValue from "@utils/auth/getCookieValue";
import setCookieValue from "@utils/auth/setCookieValue";

function searchUser() {
  const userData = getCookieValue("user");
  
  if (!userData) {
    console.log("userData:", userData);
    return null;
  }
  const user = {
    id: userData.id,
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    admin: userData.admin,
  };

  return user;
}
function getToken() {
  const token = getCookieValue("token");
  return token;
}

function storeUserData(user: any) {
  setCookieValue(user, "user", 1);
}

async function getUser() {
  const user = searchUser();
  if (user) {
    return user;
  } else {
    const token = getToken();
    if (!token || token === "undefined" || token === "null") {
      console.log("No token found, returning null");
      return null;
    } else if (typeof token !== "string") {
      return null;
    } else {
      console.log("Token found", token, " fetching user data...");
      const response = await apiFetch<any>("/api/login/auth", {
        method: "GET",
      });
      const user = response.data.user;
      storeUserData(user);
      return user;
    }
  }
}
export default getUser;
