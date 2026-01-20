import React from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import CourseUpdate from "@components/course/courseUpdate";
const CourseUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      {id ? (
        <CourseUpdate courseId={id} />
      ) : (
        <Error message="The course does not exist" />
      )}
      <Container
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <NavigationButton
          style={{ backgroundColor: "#444", color: "#fff" }}
          to={`/course/list`}
          label="Back to courses"
        />
      </Container>
    </Card>
  );
};
export default CourseUpdatePage;
