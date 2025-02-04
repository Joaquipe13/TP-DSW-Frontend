import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Loading from "../common/loading";
import Error from "../common/error";
import NavigationButton from "../common/buttons/navigationButton";
import SubscriptionButton from "../common/buttons/purchaseSubsButton";
import useGet from "@hooks/crud/useGet";
import userType from "@utils/auth/userType";
import { Subscription } from "@utils/types";

interface SubscriptionPreviewProps {
  id: number;
}

const SubscriptionPreview: React.FC<SubscriptionPreviewProps> = ({ id }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loadingButton, setLoading] = useState(true);
  const {
    data: subscription,
    loading,
    error,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions/${id}`, false);

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

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
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
            <SubscriptionButton subscriptionId={id} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubscriptionPreview;
