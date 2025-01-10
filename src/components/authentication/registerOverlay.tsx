import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { validateRegister, createUser } from "./utils";

interface RegisterOverlayProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSwitchToLogin: () => void;
  hideLogin: () => void;
}

export const RegisterOverlay: React.FC<RegisterOverlayProps> = ({
  show,
  setShow,
  onSwitchToLogin,
  hideLogin,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, surname, email, password };

    const validateUser = validateRegister(userData);
    if (Object.keys(validateUser).length === 0) {
      try {
        const user = await createUser(userData);
        alert("Registration successful!");
        console.log("User successfully registered:", user);
        setShow(false);
        window.location.reload();
      } catch {
        alert("Registration failed. Please try again.");
      }
    } else {
      setErrors(validateUser);
      alert("Registration failed. Please try again.");
    }
  };
  const handleClose = () => {
    setShow(false);
    hideLogin();
  };
  const handleLogin = () => {
    setShow(false);
    onSwitchToLogin();
  };

  return (
    <>
      {show && (
        <div
          className="register-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75"
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
                style={{ width: "160%", maxWidth: "450px" }} // Ajustar el tamaño máximo
              >
                <Button
                  variant="Light"
                  onClick={() => handleClose()}
                  className="close-button position-absolute top-0 end-0 m-0"
                >
                  X
                </Button>
                <h3 className="text-center mb-4">Register</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={errors.name}
                    />
                    {errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.name.join(", ")}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formSurname" className="mb-4">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      isInvalid={errors.surname}
                    />
                    {errors.surname && (
                      <Form.Control.Feedback type="invalid">
                        {errors.surname.join(", ")}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={errors.email}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email.join(", ")}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={errors.password}
                    />
                    {errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password.join(", ")}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Register
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => {
                      handleLogin();
                    }}
                    className="w-100 mt-3"
                    style={{
                      fontSize: "1.1rem",
                    }}
                  >
                    I already have an account
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};
