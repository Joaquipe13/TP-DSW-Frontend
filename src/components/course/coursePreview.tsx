import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Course } from "../../utils/types";
import Card from "react-bootstrap/Card";
import CourseTopicsList from "../topic/courseTopicsList";
import Loading from "../common/loading";
import Error from "../common/error";
import NavigationButton from "../common/buttons/navigationButton";
import useGet from "@hooks/crud/useGet";
import userType from "@utils/auth/userType";
import DateComponent from "@utils/date";

interface CoursePreviewProps {
  id: number;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
  } = useGet<Course>(`/api/courses/preview/${id}`);

  const [role, setRole] = useState<null | string>(null);
  const [loadingButton, setLoading] = useState(true);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const fetchedUser = await userType();
        setRole(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);
  
  if (loading) return <Loading />;
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
            />
          ) : (
            <NavigationButton
              to={`/course/${course?.id}`}
              label="View"
              variant="secondary"
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CoursePreview;
