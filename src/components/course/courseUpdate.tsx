import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import EditCourseTopicList from "@components/topic/editCourseTopicList";
import deleteCourse from "@hooks/course/useCourseDelete";
import useCourseEdit from "@hooks/course/useCourseEdit";
import Error from "../common/error";
import LevelList from "../level/levelList";
import Loading from "../common/loading";

interface CourseUpdateProps {
  courseId: string;
}

const CourseUpdate: React.FC<CourseUpdateProps> = ({ courseId }) => {
  const {
    loading,
    error,
    oldCourse,
    title,
    resume,
    price,
    initialSelectedTopics,
    selectedTopicsIds,
    formErrors,
    setTitle,
    setResume,
    setPrice,
    setSelectedTopicsIds,
    handleSave,
  } = useCourseEdit(courseId);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      await handleSave(oldCourse?.isActive);
      console.log(`Course ${title} updated with.`);
      //window.location.reload();
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
        navigate(`/course/list`);
      } catch {
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
                data-testid="course-title"
              />
              <Form.Control.Feedback type="invalid" data-testid="course-title-error">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                ref={textAreaRef}
                as="textarea"
                type="text"
                placeholder={oldCourse?.resume || "Course Resume"}
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                isInvalid={!!formErrors.resume}
                data-testid="course-resume"
                style={{
                  textAlign: "left",
                  paddingTop: "10px",
                  resize: "vertical",
                  minHeight: "120px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              />
              <Form.Control.Feedback type="invalid" data-testid="course-resume-error">
                {formErrors.resume}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldCourse?.price?.toString() || "0000.00"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                isInvalid={!!formErrors.price}
                data-testid="course-price"
              />
              <Form.Control.Feedback type="invalid" data-testid="course-price-error">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          <EditCourseTopicList
            initialSelectedTopics={initialSelectedTopics}
            onTopicsChange={setSelectedTopicsIds}
          />
          <Card.Body className="mb-3">
            {formErrors.topics && (
              <div className="text-danger" data-testid="course-topics-error">
                {formErrors.topics}
              </div>
            )}
          </Card.Body>

          <Card.Title as="h5" className="mb-3">
            Levels:
          </Card.Title>
          <LevelList course={courseId} levels={oldCourse?.levels as any}/>

          <Row className="justify-content-center mt-4">
            <Col xs={10} md={3} className="d-flex justify-content-center">
              <Button
                variant="success"
                onClick={handleSaveClick}
                disabled={loading}
                data-testid="save-course-changes-button"
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
                    data-testid="delete-course-button"
                  >
                    {loading ? "Deleting..." : "Delete Course"}
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handlePublicClick}
                    disabled={loading}
                    data-testid="publish-course-button"
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

export default CourseUpdate;
