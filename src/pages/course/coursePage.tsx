import React from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Error from "@components/common/error";
import CourseGetOne from "../../components/course/course";
import NavigationButton from "@components/common/buttons/navigationButton";

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      {id ? (
        <CourseGetOne id={id} />
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
export default CoursePage;
