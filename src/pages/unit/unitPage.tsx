import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import UnitGetOne from "@components/unit/unit";

const UnitPage: React.FC = () => {
  const { courseId, levelId, id } = useParams<{
    id: string | undefined;
    levelId: string | undefined;
    courseId: string | undefined;
  }>();

  return (
    <Card>
      {courseId && levelId && id ? (
        <UnitGetOne id={id} courseId={courseId} levelId={levelId} />
      ) : (
        <Error message="The unit does not exist" />
      )}
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/level/${courseId}/${levelId}`}
          label="Back to level"
        />
      </Container>
    </Card>
  );
};
export default UnitPage;
