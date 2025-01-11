import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavigationButton } from "../../common/buttons";
import { UnitCreate } from "../../unit";
import { Error } from "../../common/utils";

export const UnitCreatePage: React.FC = () => {
  const { courseId, levelId } = useParams<{
    courseId: string | undefined;
    levelId: string | undefined;
  }>();

  return (
    <Container style={{ width: "100%" }}>
      <h2>Create Unit</h2>
      {courseId && levelId ? (
        <UnitCreate course={courseId} level={levelId} />
      ) : (
        <Error message="The course or level does not exist" />
      )}
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
