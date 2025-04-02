import getCookieValue from "@utils/auth/getCookieValue";
import setCookieValue from "@utils/auth/setCookieValue";
import porturl from "@utils/route";

function searchUser() {
  const userData = getCookieValue("user");
  console.log("userData:", userData);
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

function handleResponse(response: any) {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((errorData: any) => {
      throw new Error(`Error: ${errorData.message}`);
    });
  }
}

async function fetchUserData(token: string) {
  return fetch(porturl + "/api/login/auth", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(handleResponse);
}

function storeUserData(user: any) {
  setCookieValue(user, "user", 1);
}

async function getUser() {
  const user = searchUser();
  if (user) {
    console.log("user found (getUser):", user);
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
      const data = await fetchUserData(token);
      console.log("data:", data);
      const user = data.user;
      console.log("user:", user);
      storeUserData(user);

      return user;
    }
  }
}
export default getUser;
