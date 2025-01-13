import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "@components/index.ts";
import { User, getUser } from "@utils/index.ts";

export const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const [user, setUser] = useState<null | User>(null);
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
