import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Alert, Col, Row, Table } from "react-bootstrap";
import { Loading, Error } from "@components/index";
import { useGet } from "@hooks/index";
import { Subscription } from "@utils/index";
import SubscriptionPreview from "./subscriptionPreview";
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
    <Container fluid style={{ marginTop: "1rem" }}>
      {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
        <Table>
          <tbody>
            {subscriptions
              .reduce((acc, subscription, index) => {
                if (index % 5 === 0) acc.push([]);
                acc[acc.length - 1].push(subscription);
                return acc;
              }, [])
              .map((rowSubscriptions, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {rowSubscriptions.map((subscription) => (
                    <Col key={subscription.id} xs={12} sm={6} md={4} lg={3}>
                      {!subscription.id ? (
                        <Loading />
                      ) : (
                        <SubscriptionPreview id={subscription.id} />
                      )}
                    </Col>
                  ))}
                </Row>
              ))}
          </tbody>
        </Table>
      ) : (
        <Col>
          <Alert variant="info" className="text-center">
            No subscriptions available
          </Alert>
        </Col>
      )}
    </Container>
  );
};
