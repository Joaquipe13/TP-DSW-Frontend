import Error from "@components/common/error.js";
import confirmUser from "@utils/auth/confirmUser.js";
import getUser from "@utils/auth/getUser.js";
import { User } from "@utils/types.js";
import React, { useEffect, useState } from "react";

import { useParams, Navigate } from "react-router-dom";

const ConfirmRegistration: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  function redirect() {
    console.log("Redirecting to /courses");
    return <Navigate to="/course/list" />;
  }
  /*   useEffect(() => {
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
  }, []); */

  useEffect(() => {
    console.log("Token from URL:", token);

    if (!token) {
      console.warn("No token found in URL, redirecting...");
      redirect();
    }
    let isMounted = true;

    const confirm = async () => {
      try {
        if (!token) {
          console.warn("No token found in URL, redirecting...");
          redirect();
        } else if (isMounted) {
          const sessionToken = await confirmUser(token);
          if (sessionToken instanceof Error) {
            console.error("Error confirming user:", sessionToken);
            redirect();
          }
        }
        isMounted = false;

        if (!isMounted) redirect();
      } catch (error) {
        console.error("Error in confirmation process:", error);
        if (!isMounted) redirect();
      }
    };

    confirm();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return null;
};

export default ConfirmRegistration;
