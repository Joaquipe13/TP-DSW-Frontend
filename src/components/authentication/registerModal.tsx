import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { validateRegister } from "./utils/validateRegister";
import { createUser } from "./utils/createUser";
export const useRegister = (onSwitchToLogin: () => void) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);

  const showRegister = () => setShow(true);
  const hideRegister = () => setShow(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, surname, email, password };

    const validateUser = validateRegister(userData);
    if (Object.keys(validateUser).length === 0) {
      try {
        const user = await createUser(userData);
        alert("Registration successful!");
        console.log("User successfully registered:", user);
        hideRegister();
      } catch {
        alert("Registration failed. Please try again.");
      }
    } else {
      setErrors(validateUser);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogin = () => {
    hideRegister();
    onSwitchToLogin();
  };
  const RegisterModal = () => (
    <div>
      <Modal show={show} onHide={hideRegister} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Row className="text-center">
              <Col>
                <Button variant="dark" type="submit" className="w-50 mt-3">
                  Register
                </Button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Button
                  variant="link"
                  className="w-50 mt-3"
                  onClick={handleLogin}
                >
                  I already have an account
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
  return { showRegister, RegisterModal };
};
