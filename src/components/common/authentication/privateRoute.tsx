import { Navigate } from "react-router-dom";
import { getUser } from "./getUser";
import { Loading } from "../utils";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const [user, setUser] = useState<null | {}>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return element;
};
