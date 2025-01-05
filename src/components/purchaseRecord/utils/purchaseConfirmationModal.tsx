import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface PurchaseConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export function PurchaseConfirmationModal({
  show,
  onConfirm,
  onCancel,
  isProcessing,
}: PurchaseConfirmationModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to purchase this course?</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
