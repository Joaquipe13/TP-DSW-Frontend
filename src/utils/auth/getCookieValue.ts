import Cookies from "js-cookie";

function getCookieValue(name: string) {
  const cookie = Cookies.get(name);
  if (cookie === undefined || cookie === "undefined") {
    return null;
  }

  try {
    return JSON.parse(cookie);
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return null;
  }
}

export default getCookieValue;
