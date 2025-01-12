import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  Loading,
  Error,
  NavigationButton,
  SubscriptionButton,
} from "@components/index.ts";
import { useGet } from "@hooks/index.ts";
import { userType, Subscription } from "@utils/index.ts";

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
    <Card
      style={{
        width: "14rem",
        marginTop: "1rem",
        marginBottom: "1rem",
        marginLeft: "1rem",
        marginRight: "1rem",
      }}
    >
      <Card.Header as="h4" className="text-center ">
        {subscription?.description}
      </Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Price:</strong> {subscription?.price}
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Duration:</strong> {subscription?.duration}
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
  );
};

export default SubscriptionPreview;
