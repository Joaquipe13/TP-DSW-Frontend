import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import LevelUpdate from "@components/level/levelUpdate";
const LevelUpdatePage: React.FC = () => {
  const { id, courseId } = useParams<{ id: string; courseId: string }>();

  return (
    <Card>
      {id && courseId ? (
        <LevelUpdate courseId={courseId} id={id} />
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
        />
      </Container>
    </Card>
  );
};
export default LevelUpdatePage;
