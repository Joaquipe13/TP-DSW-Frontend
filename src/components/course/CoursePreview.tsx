import React, { useEffect, useState } from "react";
import { Course } from "../../utils/types";
import Card from "react-bootstrap/Card";
import { Topics, Loading, Error, NavigationButton } from "@components/index";
import { useGet } from "@hooks/index";
import { userType, DateComponent } from "@utils/index";
import { Container } from "react-bootstrap";

interface CoursePreviewProps {
  id: number;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);

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
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

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
          <Topics selectedTopics={course?.topics} />
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
              to={`/Course/${course?.id}`}
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
