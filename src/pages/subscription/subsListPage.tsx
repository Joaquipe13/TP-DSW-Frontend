import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SubscriptionList, NavigationButton } from "@components/index.ts";
import { userType } from "@utils/index.ts";

export const SubscriptionListPage = () => {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      console.log("fetching user role");
      setRole(null);
      const fetchedRole = await userType();
      setRole(fetchedRole);
    };
    fetchUserRole();
  }, []);

  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        Subscriptions
      </Card.Title>
      <Card className="">
        <SubscriptionList />
        {role === "admin" && (
          <Card.Body className="bg-light text-center p-3">
            <NavigationButton
              to={`/subscription/create`}
              label="Add Subscription"
              variant="success"
            />
          </Card.Body>
        )}
      </Card>
      <Card.Body className="bg-light text-center p-3">
        <NavigationButton
          to={`/`}
          label="Back to Mainpage"
          variant="secondary"
        />
      </Card.Body>
    </Container>
  );
};
