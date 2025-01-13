import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "@utils/index.ts";

export function useAdminRedirect(navigateTo: string) {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkRole() {
      const role = await userType();
      if (role === "admin") {
        navigate(navigateTo, { replace: true });
      }
    }
    checkRole();
  }, [navigate]);
}
