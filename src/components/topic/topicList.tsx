import { useEffect, useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import NotAvailableAlert from "@components/common/notAvailableAlert.js";
import useGet from "@hooks/crud/useGet";
import useCreateTopic from "@hooks/topic/useCreateTopic";
import useDeleteTopic from "@hooks/topic/useDeleteTopic";
import { Topic } from "@utils/types";
import Error from "../common/error";
import Loading from "../common/loading";

const TopicList = () => {
  const {
    data: topics,
    loading,
    error,
    fetchData,
  } = useGet<Topic>(`/api/topics`);

  const [isAdding, setIsAdding] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
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

      {topics && topics.length > 0
        ? topics.map((topic) => (
            <ListGroup.Item
              key={topic.id}
              className="d-flex justify-content-between align-items-center"
              style={{
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                marginBottom: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                transition: "background-color 0.2s",
              }}
              data-testid={`topic-item-${topic.description}`}
            >
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <label
                  style={{
                    margin: 0,
                    cursor: "pointer",
                    fontWeight: selectedTopics.has(topic.id) ? "600" : "400",
                    color: "inherit",
                  }}

                >
                  {topic?.description}
                </label>
              </div>
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
        : !isAdding && (
            <Card.Body
              className="d-flex justify-content-center align-items-center"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
              
            >
              <NotAvailableAlert object="topics" />
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirmAdd();
              }
            }}
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
export default TopicList;
