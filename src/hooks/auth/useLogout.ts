import {
  getCookieValue,
  removeSessionCookies,
  removeToken,
} from "@utils/index.ts";

export function useLogout() {
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      const token = getCookieValue("token");
      await removeToken(token);
      removeSessionCookies();
      window.location.reload();
    }
  };
  return { handleLogout };
}
