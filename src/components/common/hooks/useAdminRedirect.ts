import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userType } from "../authentication";

export function useAdminRedirect(navigateTo: string) {
  const navigate = useNavigate();

  /* useEffect(() => {
    const role = await userType();
    if (role === "admin") {
      navigate(navigateTo, { replace: true });
    }
  }, [navigate]); */
}
