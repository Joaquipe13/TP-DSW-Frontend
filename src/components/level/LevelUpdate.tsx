import { useRef, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useLevelEdit, deleteLevel } from "./hooks";
import { UnitList } from "../unit/unitList.tsx";
import { useNavigate } from "react-router-dom";
import { Loading, Error } from "../common/utils";

interface LevelUpdateProps {
  courseId: string;
  id: string;
}

export const LevelUpdate: React.FC<LevelUpdateProps> = ({ courseId, id }) => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    oldLevel,
    name,
    description,
    formErrors,
    setName,
    setDescription,
    handleSave,
  } = useLevelEdit(id);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      await handleSave();
      console.log(`Level ${name} updated with.`);
      window.location.reload();
    } catch {
      alert("Error updating level.");
    }
  };
  const handleRemoveClick = async () => {
    if (confirm(`Are you sure you want to delete the level "${name}"?`)) {
      try {
        await deleteLevel(id!);
        alert("Level removed successfully.");
        navigate(`course/${courseId}`);
      } catch {
        alert("Error removing level.");
      }
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Container className="level" style={{ marginTop: "1rem" }}>
      <Card>
        <Card.Header as="h3">Edit Level</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder={oldLevel?.name || "Level Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldLevel?.description?.toString() || "0000.00"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Card.Title as="h5" className="mb-3">
            Units:
          </Card.Title>
          <UnitList level={id} course={courseId} />

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
              {oldLevel ? (
                <Button
                  variant="danger"
                  onClick={handleRemoveClick}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Level"}
                </Button>
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
