import Cookies from "js-cookie";

export function setCookieValue(value: object, name: string, time: number) {
  Cookies.set(name, JSON.stringify(value), {
    expires: time / 24,
    path: "/",
    secure: true,
  });
}
