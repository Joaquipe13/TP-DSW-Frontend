import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  SubscriptionUpdate,
  Error,
  NavigationButton,
} from "@components/index.ts";

export const SubscriptionUpdatePage: React.FC = () => {
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
