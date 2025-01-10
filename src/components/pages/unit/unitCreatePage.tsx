import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavigationButton } from "../../common/buttons";
import { UnitCreate } from "../../unit/unitCreate.tsx";

export const UnitCreatePage: React.FC = () => {
  const { courseId, levelId } = useParams<{
    courseId: string;
    levelId: string;
  }>();

  return (
    <Container style={{ width: "100%" }}>
      <h2>Create Unit</h2>
      <UnitCreate course={courseId} level={levelId} />
      <Container
        fluid
        className="bg-light text-center p-3"
        style={{
          position: "fixed",
          left: 0,
          width: "100%",
        }}
      >
        <NavigationButton
          to={`/level/${courseId}/${levelId}`}
          label="Back to Level"
        />
      </Container>
    </Container>
  );
};
