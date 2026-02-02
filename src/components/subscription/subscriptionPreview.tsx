import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Subscription } from "@utils/types";
import userType from "@utils/auth/userType";
import SubscriptionButton from "../common/buttons/purchaseSubsButton";
import Error from "../common/error";
import Loading from "../common/loading";
import NavigationButton from "../common/buttons/navigationButton";

interface SubscriptionPreviewProps {
  subscription: Subscription;
}

const SubscriptionPreview: React.FC<SubscriptionPreviewProps> = ({ subscription }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loadingButton, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log("fetching user role");
      setLoading(true);
      const fetchedRole = await userType();
      setRole(fetchedRole);
      setLoading(false);
    };
    fetchUserRole();
  }, []);

  if (!subscription?.id) return <Error message="Subscription not found" />;
  return (
    <Container fluid>
      <Card>
        <Card.Header as="h4" className="text-center ">
          {subscription?.description}
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ textAlign: "left" }}>
            <strong>Price:</strong> {subscription?.price}
          </Card.Text>
          <Card.Text style={{ textAlign: "left" }}>
            <strong>Duration:</strong> {subscription?.duration + " days"}
          </Card.Text>
        </Card.Body>
        <Card.Body className="d-flex justify-content-center align-items-end">
          {loadingButton ? (
            <Loading />
          ) : role === "admin" ? (
            <NavigationButton
              to={`/subscription/update/${subscription?.id}`}
              label="Edit"
            />
          ) : (
            <SubscriptionButton subscriptionId={subscription.id} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubscriptionPreview;
