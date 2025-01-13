import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const usePurchaseAlert = () => {
  const [show, setShow] = useState(false);

  const showPurchaseAlert = () => setShow(true);
  const hidePurchaseAlert = () => setShow(false);

  const handlePurchase = () => {
    setShow(false);
  };

  const PurchaseAlert = () => (
    <>
      <Modal show={show} onHide={hidePurchaseAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must purchase this course to see the levels.
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={handlePurchase}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  return { showPurchaseAlert, PurchaseAlert };
};
