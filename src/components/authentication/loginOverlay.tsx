import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { RegisterOverlay } from "@components/index.ts";
import { validateLogin } from "@utils/index.ts";

interface LoginOverlayProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginOverlay: React.FC<LoginOverlayProps> = ({
  show,
  setShow,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const showLogin = () => setShow(true);
  const hideLogin = () => setShow(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intento de login con:", { email, password });
    const token = await validateLogin(email, password);
    console.log("Token:", token);
    if (token) {
      setShow(false);
      window.location.reload();
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };
  const handleRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      {show && (
        <div
          className="login-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
          style={{ zIndex: 9999 }}
        >
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ width: "150%", maxWidth: "500px", height: "100px" }}
          >
            <Row className="justify-content-center">
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={5}
                xl={4}
                className="p-4 bg-white rounded shadow position-relative"
                style={{ width: "140%", maxWidth: "350px" }} // Ajustar el tamaño máximo
              >
                <Button
                  variant="Light"
                  onClick={() => setShow(false)}
                  className="close-button position-absolute top-0 end-0 m-0"
                >
                  X
                </Button>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => {
                      handleRegister();
                    }}
                    className="w-100 mt-3"
                    style={{
                      fontSize: "1.1rem",
                    }}
                  >
                    Register
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
          <RegisterOverlay
            show={showRegister}
            setShow={setShowRegister}
            onSwitchToLogin={showLogin}
            hideLogin={hideLogin}
          />
        </div>
      )}
    </>
  );
};
