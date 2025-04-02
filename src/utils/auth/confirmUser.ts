import getCookieValue from "./getCookieValue";
import setCookieValue from "./setCookieValue";
import porturl from "../route";

function handleResponse(response: any) {
  console.log("response: ", response);
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((errorData: any) => {
      throw new Error(`Error: ${errorData.message}`);
    });
  }
}
async function fetchUserData(token: any) {
  console.log("/api/users/confirm/", token);
  return fetch(porturl + "/api/users/confirm", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(handleResponse);
}

const confirmUser = async (token: string) => {
  try {
    const response = await fetchUserData(token);
    console.log("response.json(): ", response);

    const sessionToken = response?.data;
    console.log("sessionToken: ", sessionToken);

    if (typeof sessionToken === "string") {
      setCookieValue(sessionToken, "token", 8);
      console.log("token guardado: ", getCookieValue("token"));
      
    } else if (sessionToken instanceof Error) {
      console.error("Error in sessionToken:", sessionToken);
      
    } else {
      console.error("Session token is null or invalid:", sessionToken);
    }
    return sessionToken;
  } catch (error) {
    console.error("Error confirming user:", error);
    return error instanceof Error ? error : new Error("Unknown error occurred");
  }
};

export default confirmUser;
