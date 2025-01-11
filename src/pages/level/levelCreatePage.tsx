import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavigationButton } from "../../common/buttons";
import { LevelCreate } from "../../components/level";

export const LevelCreatePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <Container style={{ width: "100%" }}>
      <h2>Create Level</h2>
      <LevelCreate course={courseId} />
      <Container
        fluid
        className="bg-light text-center p-3"
        style={{
          position: "fixed",
          left: 0,
          width: "100%",
        }}
      >
        <NavigationButton to={`/course/${courseId}`} label="Back to Course" />
      </Container>
    </Container>
  );
};
