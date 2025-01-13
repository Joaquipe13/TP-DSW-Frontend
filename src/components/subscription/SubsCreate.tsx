import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subscription } from "../../utils/types.tsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Loading, Error } from "@components/index.ts";
import { usePost } from "@hooks/index.ts";
import {
  validateSubsDescription,
  validateSubsPrice,
  validateSubsDuration,
} from "@utils/index.ts";

export const SubscriptionCreate = () => {
  const { loading, error, create } = usePost<Subscription>(
    "/api/subscriptions/"
  );
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<{
    description?: string;
    price?: string;
    duration?: string;
  }>({});

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    const descriptionError = validateSubsDescription(description);
    const priceError = validateSubsPrice(price);
    const durationError = validateSubsDuration(duration);

    if (descriptionError || priceError || durationError) {
      setFormErrors({
        description: descriptionError,
        price: priceError,
        duration: durationError,
      });
      return;
    }

    const confirmed = window.confirm(
      `Do you want to create the subscription: "${description}"?`
    );
    if (confirmed) {
      const newSubscription: Subscription = {
        description: description,
        price: parseFloat(price),
        duration: parseInt(duration),
      };
      create(newSubscription).then((data) => {
        if (data) {
          console.log(
            `Subscription ${description} was created with ID ${data.id}.`
          );
          navigate(`/subscription/list`);
        } else {
          console.error(
            "Error: No ID was received for the created subscription."
          );
          alert(
            "There was an error creating the subscription. Please try again."
          );
        }
      });
    } else {
      console.log(`Creación del curso ${description} cancelada.`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Card body className="mb-4" style={{ marginTop: "1rem" }}>
      <Card.Header as="h2">Create a Subscription</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Subscription Description"
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
              placeholder="0000.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={!!formErrors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration "(days)"</Form.Label>
            <Form.Control
              type="text"
              placeholder="00"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              isInvalid={!!formErrors.duration}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.duration}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Body className="d-flex justify-content-center">
        <Button variant="success" onClick={handleClick} className="mt-4">
          Create Subscription
        </Button>
      </Card.Body>
    </Card>
  );
};
