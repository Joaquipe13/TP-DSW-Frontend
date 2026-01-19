import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Error from "@components/common/error";
import LevelGetOne from "@components/level/level";
import NavigationButton from "@components/common/buttons/navigationButton";
const LevelPage: React.FC = () => {
  const { courseId, id } = useParams<{ id: string; courseId: string }>();

  return (
    <Card>
      {id && courseId ? (
        <LevelGetOne courseId={courseId} id={id} />
      ) : (
        <Error message="The level does not exist" />
      )}
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/course/${courseId}`}
          label="Back to course"
          dataTestId="back-to-course-button"
        />
      </Container>
    </Card>
  );
};
export default LevelPage;
