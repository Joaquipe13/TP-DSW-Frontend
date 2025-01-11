import Cookies from "js-cookie";

export function removeSessionCookies() {
  Cookies.remove("token", { path: "/" });
  Cookies.remove("user", { path: "/" });
}
