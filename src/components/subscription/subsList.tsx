import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import NotAvailableAlert from "@components/common/notAvailableAlert.js";
import useGet from "@hooks/crud/useGet";
import { Subscription } from "@utils/types";
import Error from "../common/error";
import Loading from "../common/loading";
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
        <NotAvailableAlert object="subscriptions" />
      )}
    </Container>
  );
};
export default SubscriptionList;
