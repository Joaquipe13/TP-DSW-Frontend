import { useEffect } from "react";
import { useGet } from "../common/hooks/useGet.ts";
import { Subscription } from "../types.tsx";
import Container from "react-bootstrap/Container";
import { SubscriptionPreview } from "./subscriptionPreview.tsx";
import { Alert, Col, Row } from "react-bootstrap";
import { Loading, Error } from "../common/utils/index.ts";

export const SubscriptionList = () => {
  const {
    data: subscriptions,
    error,
    loading,
    fetchData,
  } = useGet<Subscription>(`/api/subscriptions`);

  useEffect(() => {
    fetchData();
    console.log(subscriptions);
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container fluid className="mt-3">
      <Row className="gy-4 justify-content-center">
        {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <Col key={subscription.id} xs={12} sm={6} md={4} lg={3}>
              {!subscription.id ? (
                <Loading />
              ) : (
                <SubscriptionPreview id={subscription.id} />
              )}
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No subscriptions available
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};
