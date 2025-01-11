import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { LoginOverlay } from "../../components/authentication";

export const useLoginAlert = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const showLoginAlert = () => setShow(true);
  const hideLoginAlert = () => setShow(false);

  const handleLogin = () => {
    setShowLogin(true); // Mostrar el overlay de login
    setShow(false); // Cerrar el modal cuando se muestra el overlay
  };

  const LoginAlert = () => (
    <>
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

      {/* El overlay no se cierra con el modal, sino que se controla independientemente */}
      <LoginOverlay show={showLogin} setShow={setShowLogin} />
    </>
  );

  return { showLoginAlert, LoginAlert };
};
