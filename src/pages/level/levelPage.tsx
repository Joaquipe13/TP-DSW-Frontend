import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LevelGetOne, Error, NavigationButton } from "@components/index.ts";

export const LevelPage: React.FC = () => {
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
        />
      </Container>
    </Card>
  );
};
