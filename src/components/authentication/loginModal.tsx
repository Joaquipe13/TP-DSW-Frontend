import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { validateLogin } from "./utils/index.ts";
import { useRegister } from "./registerModal.tsx";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const showLogin = () => setShow(true);
  const hideLogin = () => setShow(false);

  const { showRegister, RegisterModal } = useRegister(showLogin);

  const handleRegister = () => {
    showRegister();
    hideLogin();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await validateLogin(email, password);
    if (user) {
      hideLogin();
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  const LoginModal = () => (
    <div>
      <Modal show={show} onHide={hideLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3 text-center">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={false}
                style={{
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
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#333",
                  borderColor: "#bbb",
                  padding: "10px",
                  fontSize: "1.1rem",
                }}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mt-3">
              Login
            </Button>
            <Button
              variant="link"
              onClick={handleRegister}
              className="w-100 mt-3"
              style={{
                fontSize: "1.1rem",
              }}
            >
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <RegisterModal />
    </div>
  );
  return { showLogin, LoginModal };
};
