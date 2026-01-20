import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../common/loading";
import Error from "../common/error";
import CoursePreview from "./coursePreview";
import getPurchasedCourses from "@hooks/course/getPurchasedCourses";
import getUser from "@utils/auth/getUser";
import { Course } from "@utils/types";

interface MyCourseListProps {
  title: string;
}

const MyCourseList: React.FC<MyCourseListProps> = ({ title }) => {
  const [state, setState] = useState({
    loading: true,
    error: null as string | null,
    courses: [] as Course[],
  });
  const [isLoading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const fetchedUser = await getUser();
      return fetchedUser.id;
    } catch (error) {
      console.error("Error fetching user:", error);
      setState({ loading: false, error: "Error fetching user", courses: [] });
      return null;
    }
  };

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const userId = await fetchUserId();
      if (!userId) {
        setLoading(false);
        return;
      }
      const result = await getPurchasedCourses(title ? title : "");
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
                      sm={12}
                      md={12}
                      lg={6}
                      className="d-flex justify-content-center"
                    >
                      <CoursePreview course={course}  />
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
export default MyCourseList;
