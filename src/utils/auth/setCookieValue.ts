import Cookies from "js-cookie";

function setCookieValue(value: object, name: string, time: number) {
  Cookies.set(name, JSON.stringify(value), {
    expires: time / 24,
    path: "/",
    secure: true,
  });
}
export default setCookieValue;
