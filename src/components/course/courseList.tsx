import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Loading from "../common/loading";
import Error from "../common/error";
import useGet from "@hooks/crud/useGet";
import CoursePreview from "./coursePreview";
import { Course } from "@utils/types";
interface CourseListProps {
  view: number;
  title: string;
}

const CourseList: React.FC<CourseListProps> = ({ view, title }) => {
  const {
    data: courses,
    error,
    loading,
    fetchData,
  } = useGet<Course>(`/api/courses?title=${title}`);

  useEffect(() => {
    fetchData();
    console.log(courses);
  }, [fetchData, title]);

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
            <Row className="mb-3">
              {courses
                .filter((course) => view === 3 || course.isActive === isActive)
                .map((course) => (
                  <Col
                    key={course.id}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    className="d-flex justify-content-center"
                  >
                    <CoursePreview id={course.id} />
                  </Col>
                ))}
            </Row>
          </tbody>
        </Table>
      ) : (
        <Card className="mb-3">No courses available</Card>
      )}
    </Container>
  );
};
export default CourseList;
