import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface CourseSelectorProps {
  setView: React.Dispatch<React.SetStateAction<number>>;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ setView }) => {
  const [finished, setFinished] = useState(true);
  const [unfinished, setUnfinished] = useState(true);

  const handleFinishedChange = () => {
    const newFinished = !finished;
    setFinished(newFinished);
    updateView(newFinished, unfinished);
  };

  const handleUnfinishedChange = () => {
    const newUnfinished = !unfinished;
    setUnfinished(newUnfinished);
    updateView(finished, newUnfinished);
  };

  const updateView = (newFinished: boolean, newUnfinished: boolean) => {
    if (newFinished && newUnfinished) {
      setView(3);
    } else if (!newFinished && !newUnfinished) {
      setView(3);
    } else if (newFinished) {
      setView(1);
    } else {
      setView(2);
    }
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Form>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
            <Form.Check
              type="checkbox"
              label="Finished Courses"
              checked={finished}
              onChange={handleFinishedChange}
              className="ms-0"
            />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center mb-3">
            <Form.Check
              type="checkbox"
              label="Unfinished Courses"
              checked={unfinished}
              onChange={handleUnfinishedChange}
              className="ms-0"
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
