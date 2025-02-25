import { getCookieValue, porturl, setCookieValue } from "@utils/index";

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
  return fetch(porturl + "/api/users/confirm", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(handleResponse);
}

const confirmUser = async (token: string): Promise<string | Error | null> => {
  try {
    const response = await fetchUserData(token);
    console.log("response.json(): ", response);

    const sessionToken = response?.data;
    console.log("sessionToken: ", sessionToken);

    if (typeof sessionToken === "string") {
      setCookieValue({ sessionToken }, "token", 8);
      console.log("token guardado: ", getCookieValue("token"));
      return sessionToken;
    } else if (sessionToken instanceof Error) {
      console.error("Error in sessionToken:", sessionToken);
      throw new Error("Error confirming user");
    } else {
      console.error("Session token is null or invalid:", sessionToken);
      throw new Error("sessionToken is null or invalid");
    }
  } catch (error) {
    console.error("Error confirming user:", error);
    return error instanceof Error ? error : new Error("Unknown error occurred");
  }
};

export { confirmUser };
