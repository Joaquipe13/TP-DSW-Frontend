import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100px" }}
    >
      <Alert variant="danger">Error: {message}</Alert>
    </Container>
  );
};
