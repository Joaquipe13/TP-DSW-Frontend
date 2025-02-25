import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Alert, Col, Row, Table } from "react-bootstrap";
import Loading from "../common/loading";
import Error from "../common/error";
import useGet from "@hooks/crud/useGet";
import { Subscription } from "@utils/types";
import SubscriptionPreview from "./subscriptionPreview";
const SubscriptionList = () => {
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
            <Row className="mb-3">
              {subscriptions.map((subscription) => (
                <Col key={subscription.id} xs={12} sm={6} md={4} lg={3}>
                  {!subscription.id ? (
                    <Loading />
                  ) : (
                    <SubscriptionPreview id={subscription.id} />
                  )}
                </Col>
              ))}
            </Row>
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
export default SubscriptionList;
