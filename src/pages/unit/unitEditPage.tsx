import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import UnitUpdate from "@components/unit/unitUpdate";

const UnitUpdatePage: React.FC = () => {
  const { id, levelId, courseId } = useParams<{
    id: string | undefined;
    levelId: string | undefined;
    courseId: string | undefined;
  }>();

  return (
    <Card>
      {courseId && levelId && id ? (
        <UnitUpdate courseId={courseId} levelId={levelId} id={id} />
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
export default UnitUpdatePage;
