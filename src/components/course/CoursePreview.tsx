import React, { useEffect, useState } from "react";
import { Course } from "../../utils/types.tsx";
import Card from "react-bootstrap/Card";
import { Topics, Loading, Error, NavigationButton } from "@components/index.ts";
import { useGet } from "@hooks/index.ts";
import { userType, DateComponent } from "@utils/index.ts";

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
    <Card style={{ width: "40rem" }}>
      <Card.Header as="h5">{course?.title}</Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "justify" }}>{course?.resume}</Card.Text>

        <Card.Text style={{ textAlign: "left" }}>
          <strong>Price:</strong> ${course?.price}
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Topics:</strong>
        </Card.Text>
        <Topics selectedTopics={course?.topics} />
        <Card.Text
          style={{ textAlign: "left" }}
          className="text-muted fw-light"
        >
          <strong>Created at:</strong>{" "}
          <DateComponent
            style={{ display: "inline-block" }}
            date={course?.createdAt}
          />
        </Card.Text>
      </Card.Body>
      <Card.Body className="d-flex justify-content-center align-items-end">
        {loadingButton ? (
          <Loading />
        ) : role === "admin" ? (
          <NavigationButton to={`/course/update/${course?.id}`} label="Edit" />
        ) : (
          <NavigationButton
            to={`/Course/${course?.id}`}
            label="View"
            variant="secondary"
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default CoursePreview