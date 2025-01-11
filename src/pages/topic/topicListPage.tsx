import { Card, Container } from "react-bootstrap";
import { TopicList } from "../../components/topic";

export const TopicListPage = () => {
  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginLeft: "1.5rem",
          marginTop: "1rem",
        }}
      >
        Topics
      </Card.Title>
      <Card.Body>
        <TopicList />
      </Card.Body>
    </Container>
  );
};
