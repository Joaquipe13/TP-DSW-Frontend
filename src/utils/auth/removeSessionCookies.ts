import Cookies from "js-cookie";

function removeSessionCookies() {
  Cookies.remove("token", { path: "/" });
  Cookies.remove("user", { path: "/" });
}
export default removeSessionCookies;
