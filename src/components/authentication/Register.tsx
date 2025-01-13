import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateRegister, createUser } from "@utils/index.ts";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, surname, email, password };

    const validateUser = validateRegister(userData);
    if (Object.keys(validateUser).length === 0) {
      try {
        const user = await createUser(userData);
        alert("Registration successful!");
        console.log("User successfully registered:", user);
        navigate("/");
      } catch {
        alert("Registration failed. Please try again.");
      }
    } else {
      setErrors(validateUser);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        style={{
          width: "500px",
          height: "600px",
          backgroundColor: "#c5c5c5",
          borderColor: "#ccc",
          borderWidth: "2px",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4 mt-3" style={{ color: "#333" }}>
            Register
          </h3>
          <Form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
              <div className="alert alert-danger">
                {Object.keys(errors).map((field, index) => (
                  <div key={index}>
                    {errors[field].map((msg: string, i: number) => (
                      <div key={i}>{msg}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}

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
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
