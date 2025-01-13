import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Loading, Error } from "@components/index.ts";
import { useGet } from "@hooks/index.ts";
import { Course } from "@utils/index.ts";
import CoursePreview from "./coursePreview.tsx";

interface CourseListProps {
  view: number;
  title: string;
}

export const CourseList: React.FC<CourseListProps> = ({ view, title }) => {
  const {
    data: courses,
    error,
    loading,
    fetchData,
  } = useGet<Course>(`/api/courses?title=${title}`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  let isActive: boolean;
  switch (view) {
    case 1:
      isActive = true;
      break;
    case 2:
      isActive = false;
      break;
  }

  return (
    <Container fluid style={{ marginTop: "2rem" }}>
      {Array.isArray(courses) && courses.length > 0 ? (
        <Table>
          <tbody>
            {courses
              .filter((course) => view === 3 || course.isActive === isActive)
              .reduce((acc, course, index) => {
                if (index % 2 === 0) acc.push([]);
                acc[acc.length - 1].push(course);
                return acc;
              }, [])
              .map((rowCourses, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {rowCourses.map((course) => (
                    <Col
                      key={course.id}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      className="d-flex justify-content-center"
                    >
                      <CoursePreview id={course.id} />
                    </Col>
                  ))}
                </Row>
              ))}
          </tbody>
        </Table>
      ) : (
        <Card>No courses available</Card>
      )}
    </Container>
  );
};
