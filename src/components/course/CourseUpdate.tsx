import { useRef, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { Topic } from "../types.tsx";
import { useCourseEdit, deleteCourse } from "./hooks/index.ts";
import { Topics } from "../topic/topics.tsx";
import { LevelList } from "../level/levelList.tsx";
import { Loading, Error } from "../common/utils/index.ts";

interface CourseUpdateProps {
  courseId: string;
}

export const CourseUpdate: React.FC<CourseUpdateProps> = ({ courseId }) => {
  const {
    loading,
    error,
    oldCourse,
    title,
    price,
    selectedTopics,
    formErrors,
    setTitle,
    setPrice,
    setSelectedTopics,
    handleSave,
  } = useCourseEdit(courseId);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTopicSelection = (topic: Topic) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.some((t) => t.id === topic.id)
        ? prevTopics.filter((t) => t.id !== topic.id)
        : [...prevTopics, topic]
    );
  };

  const handleSaveClick = async () => {
    try {
      await handleSave(oldCourse?.isActive);
      console.log(`Course ${title} updated with.`);
      window.location.reload();
    } catch {
      alert("Error publishing course.");
    }
  };
  const handlePublicClick = async () => {
    try {
      await handleSave(true);
      console.log(`Course ${title} published`);
      window.location.reload();
    } catch {
      alert("Error publishing course.");
    }
  };
  const handleRemoveClick = async () => {
    if (confirm(`Are you sure you want to delete the course "${title}"?`)) {
      try {
        await deleteCourse(courseId!);
        alert("Course removed successfully.");
        window.location.reload();
      } catch (error) {
        alert("Error removing course.");
      }
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Container className="course" style={{ marginTop: "1rem" }}>
      <Card>
        <Card.Header as="h3">Edit Course</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder={oldCourse?.title || "Course Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!formErrors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldCourse?.price?.toString() || "0000.00"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <Card.Title as="h5" className="mb-3">
            Selected Topics:
          </Card.Title>
          <Container className="d-flex flex-wrap mb-4">
            {selectedTopics.map((topic) => (
              <Badge
                key={topic.id}
                pill
                bg="primary"
                className="me-2 mb-2"
                onClick={() => handleTopicSelection(topic)}
                style={{ cursor: "pointer" }}
              >
                {topic.description}
              </Badge>
            ))}
          </Container>
          <Card.Title as="h5" className="mb-3">
            Available Topics:
          </Card.Title>
          <Topics
            selectedTopics={selectedTopics}
            onSelectTopic={handleTopicSelection}
          />

          <Card.Title as="h5" className="mb-3">
            Levels:
          </Card.Title>
          <LevelList course={courseId} />

          <Row className="justify-content-center mt-4">
            <Col xs={10} md={3} className="d-flex justify-content-center">
              <Button
                variant="success"
                onClick={handleSaveClick}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Col>

            <Col xs={10} md={3} className="d-flex justify-content-center">
              {oldCourse ? (
                oldCourse.isActive ? (
                  <Button
                    variant="danger"
                    onClick={handleRemoveClick}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Course"}
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handlePublicClick}
                    disabled={loading}
                  >
                    {loading ? "Publishing..." : "Publish Course"}
                  </Button>
                )
              ) : (
                <Button variant="secondary" disabled>
                  Loading...
                </Button>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
