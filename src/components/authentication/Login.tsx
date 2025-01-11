import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { validateLogin } from "./utils";
import { useNavigate } from "react-router-dom";
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await validateLogin(email, password);
    if (user) {
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "#c5c5c5",
          borderColor: "#ccc",
          borderWidth: "2px",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4" style={{ color: "#333" }}>
            Login
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3 text-center">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="mx-auto"
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "90%",
                  backgroundColor: "#ffffff",
                  color: "#333",
                  borderColor: "#bbb",
                  padding: "10px",
                  fontSize: "1.1rem",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 text-center">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mx-auto"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "90%",
                  backgroundColor: "#ffffff",
                  color: "#333",
                  borderColor: "#bbb",
                  padding: "10px",
                  fontSize: "1.1rem",
                }}
              />
            </Form.Group>
            <Row className="text-center">
              <Col>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-50 mt-3"
                  style={{
                    padding: "10px",
                    fontSize: "1.1rem",
                  }}
                >
                  Login
                </Button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Button
                  variant="dark"
                  onClick={handleRegister}
                  className="w-50 mt-3"
                  style={{
                    padding: "10px",
                    fontSize: "1.1rem",
                  }}
                >
                  Register
                </Button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Button
                  variant="link"
                  type="submit"
                  className="w-50 mt-3"
                  style={{
                    padding: "10px",
                    fontSize: "1.1rem",
                  }}
                >
                  Forgot Password
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
