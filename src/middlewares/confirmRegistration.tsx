import React, { useEffect, useState } from "react";
import { confirmUser, getUser, User } from "@utils/index";
import { useParams, Navigate } from "react-router-dom";
import { Error } from "@components/index";

const ConfirmRegistration: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [redirect, setRedirect] = useState<boolean>(false);
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
  useEffect(() => {
    console.log("Token from URL:", token);

    if (!token) {
      console.warn("No token found in URL, redirecting...");
      setRedirect(true);
      return;
    }

    const confirm = async () => {
      try {
        const sessionToken = await confirmUser(token);
        if (sessionToken instanceof Error) {
          console.error("Error confirming user:", sessionToken.message);
          return <Error message={sessionToken.message} />;
        }
        setRedirect(true);
      } catch (error) {
        console.error("Error in confirmation process:", error);
        setRedirect(true);
      }
    };

    confirm();
  }, [token]);

  useEffect(() => {
    if (redirect) {
      <Navigate to="/" replace />;
    }
  }, [redirect]);
  useEffect(() => {
    console.log("User:", user);
  }, [user]);
  return null;
};

export { ConfirmRegistration };
