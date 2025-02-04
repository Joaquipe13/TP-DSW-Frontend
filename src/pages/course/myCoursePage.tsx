import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import SearchBox from "@components/common/searchBox";
import MyCourseList from "@components/course/myCourseList";
import useAdminRedirect from "@hooks/auth/useAdminRedirect";
import NavigationButton from "@components/common/buttons/navigationButton";

const MyCourseListPage = () => {
  useAdminRedirect("/course/list");

  const [title, setTitle] = useState("");

  const handleSearch = (title: string) => {
    setTitle(title);
  };
  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        My Courses
      </Card.Title>
      <Card.Body>
        <SearchBox onSearch={handleSearch} />
      </Card.Body>
      <Card className="mt-3">
        <MyCourseList title={title} />
      </Card>
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
export default MyCourseListPage;
