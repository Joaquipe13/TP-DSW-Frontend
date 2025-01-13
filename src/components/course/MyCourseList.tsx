import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import { Loading, Error } from "@components/index.ts";
import { getPurchasedCourses } from "@hooks/index.ts";
import { getUser } from "@utils/index.ts";
import CoursePreview from "./coursePreview.tsx";
interface MyCourseListProps {
  title: string;
}

export const MyCourseList: React.FC<MyCourseListProps> = ({ title }) => {
  const [state, setState] = useState({
    error: null as string | null,
    courses: [] as any[],
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      setUserId(null);
      const fetchedUser = await getUser();
      setUserId(fetchedUser.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      await fetchUserId();
      const result = await getPurchasedCourses(userId, title ? title : "");
      setState(result);
      setLoading(false);
    }
    fetchCourses();
  }, [title]);

  const { error, courses } = state;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Container fluid className="mt-3">
      {Array.isArray(courses) && courses.length > 0 ? (
        <Table>
          <tbody>
            {courses
              .reduce((acc, course, index) => {
                if (index % 3 === 0) acc.push([]);
                acc[acc.length - 1].push(course);
                return acc;
              }, [])
              .map((rowCourses, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {rowCourses.map((course) => (
                    <Col
                      key={course.id}
                      xs={10}
                      sm={4}
                      md={4}
                      lg={4}
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
        <p>No courses available</p>
      )}
    </Container>
  );
};
