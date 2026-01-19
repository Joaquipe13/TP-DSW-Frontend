import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Loading from "@components/common/loading";
import Error from "@components/common/error";
import useGet from "@hooks/crud/useGet";
import { Topic } from "@utils/types";
import NotAvailableAlert from "@components/common/notAvailableAlert.js";
import useSelectedTopics from "@hooks/course/useSelectedTopics";

interface EditCourseTopicListProps {
  onTopicsChange?: (selectedTopicsIds: string[]) => void;
  initialSelectedTopics?: Topic[];
}

const EditCourseTopicList: React.FC<EditCourseTopicListProps> = ({
  onTopicsChange,
  initialSelectedTopics = [],
}) => {
  const {
    data: topics,
    error,
    loading,
    fetchData,
  } = useGet<Topic>(`/api/topics`);

  const { selectedTopics, selectedTopicsIds, handleSelectTopic, deselectTopic, deselectAllTopics } =
    useSelectedTopics(initialSelectedTopics);

  const availableTopics = topics
    ? (topics as Topic[]).filter(
        (topic) => !selectedTopics.some((selected) => selected.id === topic.id)
      )
    : [];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (onTopicsChange) {
      onTopicsChange(selectedTopicsIds);
    }
  }, [selectedTopicsIds, onTopicsChange]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container fluid>
      {selectedTopics && selectedTopics.length > 0 && (
        <Card.Body style={{ marginBottom: "1.5rem" }}>
          <Container fluid className="d-flex justify-content-between align-items-center mb-3 px-0">
            <Card.Title as="h5" style={{ textAlign: "left", margin: 0 }}>
              Selected Topics ({selectedTopics.length})
            </Card.Title>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={deselectAllTopics}
              style={{ padding: "0.25rem 0.75rem" }}
              data-testid="unselect-all-topics-button"
            >
              Deselect All
            </Button>
          </Container>
          <ListGroup horizontal style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedTopics.map((topic) => (
              <ListGroup.Item
                key={topic.id}
                data-testid={`selected-topic-${topic.description}`}
                onClick={() => deselectTopic(topic.id)}
                style={{
                  backgroundColor: "#28a745",
                  borderRadius: "50px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  marginRight: "6px",
                  marginBottom: "6px",
                  color: "#fff",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  maxWidth: "180px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  border: "none",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {topic.description.length > 20
                    ? topic.description.slice(0, 20) + "..."
                    : topic.description}
                </span>
               
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      )}
      <Card.Body>
        <Card.Title as="h5" style={{ margin: "0 0 0.75rem 0", fontWeight: "600", color: "#333" }}>
          Available Topics
        </Card.Title>
        <Container fluid className="d-flex flex-wrap px-0">
          <ListGroup horizontal style={{ display: "flex", flexWrap: "wrap" }}>
            {availableTopics && availableTopics.length > 0 ? (
              availableTopics.map((topic) => (
                <ListGroup.Item
                  key={topic.id}
                  data-testid={`unselected-topic-${topic.description}`}
                  style={{
                    backgroundColor: "#6c757d",
                   borderRadius: "50px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  marginRight: "6px",
                  marginBottom: "6px",
                  color: "#fff",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  maxWidth: "180px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  border: "none",
                  }}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic.description.length > 20
                    ? topic.description.slice(0, 20) + "..."
                    : topic.description}
                </ListGroup.Item>
              ))
            ) : (
              <NotAvailableAlert object="topics" />
            )}
          </ListGroup>
        </Container>
      </Card.Body>
    </Container>
  );
};

export default EditCourseTopicList;
