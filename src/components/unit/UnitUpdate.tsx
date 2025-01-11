import { useRef, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useUnitEdit, deleteUnit } from "./hooks";
import { useNavigate } from "react-router-dom";

interface UnitUpdateProps {
  courseId: string;
  levelId: string;
  id: string;
}

export const UnitUpdate: React.FC<UnitUpdateProps> = ({
  courseId,
  levelId,
  id,
}) => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    oldUnit,
    name,
    content,
    formErrors,
    setName,
    setContent,
    handleSave,
  } = useUnitEdit(id);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      await handleSave();
      console.log(`Unit ${name} updated with.`);
      window.location.reload();
    } catch {
      alert("Error updating unit.");
    }
  };
  const handleRemoveClick = async () => {
    if (confirm(`Are you sure you want to delete the unit "${name}"?`)) {
      try {
        await deleteUnit(id!);
        alert("Unit removed successfully.");
        navigate(`level/${courseId}/${levelId}`);
        window.location.reload();
      } catch {
        alert("Error removing unit.");
      }
    }
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Card>
        <Card.Header as="h3">Edit Unit</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder={oldUnit?.name || "Unit Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder={oldUnit?.content?.toString() || "0000.00"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                isInvalid={!!formErrors.content}
                style={{
                  textAlign: "left",
                  paddingTop: "10px",
                  minHeight: "120px",
                }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.content}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

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
              {oldUnit ? (
                <Button
                  variant="danger"
                  onClick={handleRemoveClick}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Unit"}
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
