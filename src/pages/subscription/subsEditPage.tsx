import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import SubscriptionUpdate from "@components/subscription/subsUpdate";

const SubscriptionUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      {id ? (
        <SubscriptionUpdate subscriptionId={id} />
      ) : (
        <Error message="The course does not exist" />
      )}
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/subscription/list`}
          label="Back to subscriptions"
        />
      </Container>
    </Card>
  );
};
export default SubscriptionUpdatePage;
