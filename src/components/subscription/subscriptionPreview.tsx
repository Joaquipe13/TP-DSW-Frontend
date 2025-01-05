import { useEffect, useState } from "react";
import { useGet } from "../common/hooks/index.ts";
import { Subscription } from "../types.tsx";
import { NavigationButton } from "../common/buttons/index.ts";
import { Button, Card } from "react-bootstrap";
import { Loading, Error } from "../common/utils/index.ts";
import { userType } from "../common/authentication/index.ts";

interface SubscriptionPreviewProps {
  id: number;
}

export const SubscriptionPreview: React.FC<SubscriptionPreviewProps> = ({
  id,
}) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const {
    data: subscription,
    loading,
    error,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions/${id}`);
  const user = userType();
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);
  const handlePurchase = () => {
    setIsConfirming(true);
    alert("The subscription purchase feature is not yet available.");
    setIsConfirming(false);
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Card style={{ width: "18rem", marginTop: "1rem", marginBottom: "1rem" }}>
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
        {user === "admin" ? (
          <NavigationButton
            to={`/subscription/update/${subscription?.id}`}
            label="Edit"
          />
        ) : (
          <Button
            variant="success"
            onClick={handlePurchase}
            disabled={loading || isConfirming}
          >
            {loading || isConfirming ? "Processing..." : "Buy"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
