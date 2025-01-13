import { useRef, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { Loading, Error } from "@components/index.ts";
import { useSubscriptionEdit, deleteSubscription } from "@hooks/index.ts";

interface SubscriptionUpdateProps {
  subscriptionId: string;
}

export const SubscriptionUpdate: React.FC<SubscriptionUpdateProps> = ({
  subscriptionId,
}) => {
  const {
    loading,
    error,
    oldSubscription,
    description,
    price,
    duration,
    formErrors,
    setDescription,
    setPrice,
    setDuration,
    handleSave,
  } = useSubscriptionEdit(subscriptionId);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      await handleSave(oldSubscription?.isActive);
      console.log(`Subscription ${description} updated with.`);
      window.location.reload();
    } catch {
      alert("Error publishing subscription.");
    }
  };
  const handlePublicClick = async () => {
    try {
      await handleSave(true);
      console.log(`Subscription ${description} published`);
      window.location.reload();
    } catch {
      alert("Error publishing subscription.");
    }
  };
  const handleRemoveClick = async () => {
    if (
      confirm(
        `Are you sure you want to delete the subscription "${description}"?`
      )
    ) {
      try {
        await deleteSubscription(subscriptionId!);
        alert("Subscription removed successfully.");
        window.location.reload();
      } catch (error) {
        alert("Error removing subscription.");
      }
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Container className="subscription" style={{ marginTop: "1rem" }}>
      <Card>
        <Card.Header as="h3">Edit Subscription</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder={
                  oldSubscription?.description || "Subscription Description"
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldSubscription?.price?.toString() || "0000.00"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldSubscription?.duration?.toString() || "0000.00"}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                isInvalid={!!formErrors.duration}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.duration}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <Row className="justify-content-center mt-4">
            <Col xs={10} md={3} className="d-flex justify-content-center">
              <Button
                variant="success"
                onClick={handleSaveClick}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Col>

            <Col xs={10} md={3} className="d-flex justify-content-center">
              {oldSubscription ? (
                oldSubscription.isActive ? (
                  <Button
                    variant="danger"
                    onClick={handleRemoveClick}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Subscription"}
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handlePublicClick}
                    disabled={loading}
                  >
                    {loading ? "Publishing..." : "Publish Subscription"}
                  </Button>
                )
              ) : (
                <Button variant="secondary" disabled>
                  Loading...
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
