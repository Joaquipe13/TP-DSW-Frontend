import { getCookieValue, setCookieValue, porturl } from "@utils/index.ts";

function searchUser() {
  const userData = getCookieValue("user");
  console.log("user cookie", userData);
  if (!userData) {
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

async function fetchUserData(token: any) {
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

export async function getUser() {
  const user = searchUser();
  if (user) {
    return user;
  } else {
    const token = getToken();
    if (!token) {
      return null;
    }
    try {
      const data = await fetchUserData(token);
      const user = data.user;
      storeUserData(user);

      return user;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
}
