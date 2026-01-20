import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import TopicList from "@components/topic/topicList";

const TopicListPage = () => {
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
export default TopicListPage;
