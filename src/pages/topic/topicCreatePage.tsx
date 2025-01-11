import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../common/hooks";
import { Topic } from "../../common/utils/types";
import { NavigationButton } from "../../common/buttons";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

export const TopicCreatePage = () => {
  const { loading, error, create } = usePost<Topic>("/api/topics");
  const [description, setDescription] = React.useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    }
    if (error) {
      console.log("error...");
    }
  }, [loading, error]);

  const handleClick = () => {
    const confirmed = window.confirm(
      `Do you want to create the topic: "${description}"?`
    );
    if (confirmed) {
      const newTopic: Topic = { description: description };
      create(newTopic).then((data) => {
        if (data.topicCreated.id) {
          console.log(
            `Topic  ${description} was created whit id ${data.topicCreated.id}.`
          );
        } else {
          console.log(data.topicCreated);
          console.error("Error: No ID was received for the created topic.");
          alert("There was an error creating the topic. Please try again.");
        }
      });
      navigate("/topic/list");
    } else {
      console.log(`Topic ${description} creation was canceled.`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };
  return (
    <Container
      className="topic mt-4 p-4"
      style={{
        maxWidth: "400px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <h2>Create a Topic</h2>
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleClick} className="w-100 mb-3">
          Create
        </Button>
        <NavigationButton
          to="/topic/list"
          label="Back to Topics"
          variant="secondary"
        />
      </Form>
    </Container>
  );
};
