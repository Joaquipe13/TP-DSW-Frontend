import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { CourseList, CourseSelector } from "../../course";
import { NavigationButton } from "../../common/buttons";
import { Card } from "react-bootstrap";
import { userType } from "../../common/authentication";
import { Loading, SearchBox } from "../../common/utils";

export const CourseListPage = () => {
  const [view, setView] = useState(3);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<null | {}>(null);
  const [loading, setLoading] = useState(true);
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

  const handleSearch = (title: string) => {
    setTitle(title);
  };
  if (loading) return <Loading />;
  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        Courses
      </Card.Title>
      <Card.Body>
        <SearchBox onSearch={handleSearch} />
      </Card.Body>
      {role === "admin" && <CourseSelector setView={setView} />}
      <Card>
        <CourseList view={role === "admin" ? view : 1} title={title} />
      </Card>
      {role === "admin" && (
        <Card.Body className="bg-light text-center p-3">
          <NavigationButton
            to={`/course/create`}
            label="Add Course"
            variant="success"
          />
        </Card.Body>
      )}
      <Card.Body className="bg-light text-center p-3">
        <NavigationButton
          to={`/`}
          label="Back to Mainpage"
          variant="secondary"
        />
      </Card.Body>
    </Container>
  );
};
