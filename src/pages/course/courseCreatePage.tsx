import Container from "react-bootstrap/Container";
import { CourseCreate, NavigationButton } from "@components/index";

export const CourseCreatePage = () => {
  return (
    <Container fluid>
      <CourseCreate />
      <Container
        fluid
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem" }}
      >
        <NavigationButton to={`/course/list`} label={`Back to Courses`} />
      </Container>
    </Container>
  );
};
