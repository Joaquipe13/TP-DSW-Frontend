import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import validateRegister from "@utils/validations/validateRegister";
import createUser from "@utils/auth/createUser";

interface RegisterOverlayProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onSwitchToLogin: () => void;
  hideLogin: () => void;
}

const RegisterOverlay: React.FC<RegisterOverlayProps> = ({
  show,
  setShow,
  onSwitchToLogin,
  hideLogin,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, surname, email, password, repeatPassword };

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
        <Container
          fluid
          className="register-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-1000 h-100 bg-dark bg-opacity-75"
          style={{
            zIndex: 9999,
          }}
        >
          <Container
            xs={8}
            s={8}
            md={8}
            lg={6}
            xl={4}
            className="p-4 bg-white rounded shadow position-relative"
            style={{
              width: "190%",
              maxWidth: "600px",
              minWidth: "380px",
              maxHeight: "659px",
            }}
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
              <Form.Group controlId="formName">
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
              <Form.Group controlId="formSurname">
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
              <Form.Group controlId="formEmail">
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
              <Form.Group controlId="formPassword">
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
              <Form.Group controlId="formRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  isInvalid={errors.repeatPassword}
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
                className="w-100 "
              >
                I already have an account
              </Button>
            </Form>
          </Container>
        </Container>
      )}
    </>
  );
};
export default RegisterOverlay;
