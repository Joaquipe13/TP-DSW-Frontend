import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginOverlay from "@components/authentication/loginOverlay";
import RegisterOverlay from "@components/authentication/registerOverlay";

const useLoginAlert = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showLoginAlert = () => setShow(true);
  const hideLoginAlert = () => setShow(false);
  const hideLogin = () => setShowLogin(false);

  const handleLogin = () => {
    setShowLogin(true);
    setShow(false);
  };
  const handleRegister = () => {
    setShowRegister(true);
    setShow(false);
  };
  const LoginAlert = () => (
    <>
      <Modal show={show} onHide={hideLoginAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must log in to proceed.</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleLogin}>
            Log In
          </Button>
          <Button variant="secondary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <LoginOverlay show={showLogin} setShow={setShowLogin} />
      <RegisterOverlay
        show={showRegister}
        setShow={setShowRegister}
        onSwitchToLogin={handleLogin}
        hideLogin={hideLogin}
      />
    </>
  );

  return { showLoginAlert, LoginAlert };
};
export default useLoginAlert;
