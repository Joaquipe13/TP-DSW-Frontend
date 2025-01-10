import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { FaTrash, FaCheck } from "react-icons/fa";
import { Loading, Error } from "../common/utils/index.ts";
import { Topic } from "../types.tsx";
import { useGet } from "../common/hooks/index.ts";
import { useDeleteTopic, useCreateTopic } from "./hooks/index.ts";

export const TopicList = () => {
  const {
    data: topics,
    loading,
    error,
    fetchData,
  } = useGet<Topic>(`/api/topics`);

  const [isAdding, setIsAdding] = useState(false);
  const { handleDeleteClick } = useDeleteTopic(fetchData);
  const {
    newTopicDescription,
    loading: creatingLoading,
    error: creatingError,
    handleConfirmAdd,
    handleDescriptionChange,
  } = useCreateTopic(fetchData);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <ListGroup>
      {topics && topics.length > 0 ? (
        topics.map((topic) => (
          <ListGroup.Item
            key={topic.id}
            className="d-flex justify-content-between align-items-center"
            style={{
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              marginBottom: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
             
            }}
          >
            {topic?.description}
            <Button
              variant="danger"
              style={{
                borderRadius: "50%",
                padding: "0.4rem 0.6rem",
              }}
              onClick={() => handleDeleteClick(topic.id)}
            >
              <FaTrash />
            </Button>
          </ListGroup.Item>
        ))
      ) : (
        <Card.Body
          className="d-flex justify-content-center align-items-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop: "1rem",
          }}
        >
          No topics available
        </Card.Body>
      )}
      {!isAdding && (
        <ListGroup.Item
          className="d-flex justify-content-center align-items-center"
          style={{
            borderBlockColor: "transparent",
            marginTop: "1rem",
          }}
        >
          <Button
            variant="success"
            style={{ padding: "0.5rem 1.5rem" }}
            onClick={handleAddClick}
          >
            Add Topic
          </Button>
        </ListGroup.Item>
      )}

      {isAdding && (
        <ListGroup.Item
          className="d-flex justify-content-between align-items-center"
          style={{
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
            marginBottom: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
          }}
        >
          <Form.Control
            type="text"
            placeholder="Enter new topic"
            value={newTopicDescription}
            onChange={handleDescriptionChange}
          />
          <Button
            variant="success"
            style={{
              borderRadius: "50%",
              padding: "0.4rem 0.6rem",
            }}
            onClick={handleConfirmAdd}
            disabled={creatingLoading}
          >
            <FaCheck />
          </Button>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};
