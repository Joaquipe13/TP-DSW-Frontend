import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Course } from "../../utils/types";
import Card from "react-bootstrap/Card";
import CourseTopicsList from "../topic/courseTopicsList";
import Loading from "../common/loading";
import Error from "../common/error";
import NavigationButton from "../common/buttons/navigationButton";
import userType from "@utils/auth/userType";
import DateComponent from "@utils/date";

interface CoursePreviewProps {
  course: Course;
}

const CoursePreview: React.FC<CoursePreviewProps> = ( {course} ) => {

  const [role, setRole] = useState<null | string>(null);
  const [loadingButton, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const fetchedUser = await userType();
        setRole(fetchedUser);
      } catch (error:any) {
          console.error("Error fetching user:", error?.message ? error.message : "We couldn't verify your role. Please refresh or sign in again.");
          setError(error?.message ? error.message : "We couldn't verify your role. Please refresh or sign in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);
  
  if (loadingButton) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Container fluid>
      <Card>
        <Card.Header as="h4">{course?.title}</Card.Header>
        <Card.Body>
          <Card.Text style={{ textAlign: "justify" }}>
            {course?.resume}
          </Card.Text>

          <Card.Subtitle style={{ textAlign: "left", marginTop: "1rem" }}>
            <strong>Price:</strong> ${course?.price}
          </Card.Subtitle>
          <Card.Subtitle
            style={{
              textAlign: "left",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <strong>Topics:</strong>
          </Card.Subtitle>
          <CourseTopicsList selectedTopics={course?.topics} />
          <Card.Subtitle
            style={{ textAlign: "left", marginTop: "1rem" }}
            className="text-muted fw-light"
          >
            <strong>Created at:</strong>{" "}
            <DateComponent
              style={{ display: "inline-block" }}
              date={course?.createdAt}
            />
          </Card.Subtitle>
        </Card.Body>
        <Card.Body className="d-flex justify-content-center align-items-end">
          {loadingButton ? (
            <Loading />
          ) : role === "admin" ? (
            <NavigationButton
              to={`/course/update/${course?.id}`}
              label="Edit"
              dataTestId={`edit-course-${course?.title}-button`}
            />
          ) : (
            <NavigationButton
              to={`/course/${course?.id}`}
              label="View"
              variant="secondary"
              dataTestId={`view-course-${course?.title}-button`}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CoursePreview;
