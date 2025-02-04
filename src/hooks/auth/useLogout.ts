import getCookieValue from "@utils/auth/getCookieValue";
import removeSessionCookies from "@utils/auth/removeSessionCookies";
import removeToken from "@utils/auth/removeToken";

function useLogout() {
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
export default useLogout;
