import { Navigate } from "react-router-dom";
import { userType } from "./userType.ts";
import { useEffect, useState } from "react";
import { Loading } from "../utils/index.ts";
export const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const [role, setRole] = useState<null | {}>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const fetchedUser = await userType();
        setRole(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!role || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return element;
};
