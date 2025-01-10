import Cookies from "js-cookie";

export function getCookieValue(name: string) {
  const cookie = Cookies.get(name);
  let parsedCookie = null;
  if (cookie) {
    parsedCookie = JSON.parse(cookie);
  }
  return parsedCookie;
}
