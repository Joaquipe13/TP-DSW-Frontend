import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

export const Loading: React.FC = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100px" }}
    >
      <Spinner animation="border" role="status" />
    </Container>
  );
};
