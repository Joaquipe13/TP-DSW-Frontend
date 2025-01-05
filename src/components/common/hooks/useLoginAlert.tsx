import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { useLogin } from "../../authentication/loginModal.tsx";

export const useLoginAlert = () => {
  const [show, setShow] = useState(false);
  const showLoginAlert = () => setShow(true);
  const hideLoginAlert = () => setShow(false);

  const { showLogin, LoginModal } = useLogin();

  const handleLogin = () => {
    showLogin();
    hideLoginAlert();
  };

  const LoginAlert = () => (
    <div>
      <Modal show={show} onHide={hideLoginAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must log in to proceed.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
          <Button variant="secondary" onClick={hideLoginAlert}>
            Continue Without Logging In
          </Button>
        </Modal.Footer>
      </Modal>
      <LoginModal />
    </div>
  );

  return { showLoginAlert, LoginAlert };
};
