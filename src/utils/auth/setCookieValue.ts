import Cookies from "js-cookie";

function setCookieValue(value: any, name: string, time: number) {
  console.log("Setting cookie '", name, "' value:", value);
  Cookies.set(name, JSON.stringify(value), {
    expires: time / 24,
    path: "/",
    secure: true,
  });
}
export default setCookieValue;
