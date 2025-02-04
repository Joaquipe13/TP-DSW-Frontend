import React, { useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import type { SubsPurchaseRecord, CoursePurchaseRecord } from "@utils/index";
import { DateComponent } from "@utils/date";
import { Error } from "@components/common/error.js";
interface purchaseDetailOverlayProps {
  show: boolean;
  onHide: () => void;
  record: CoursePurchaseRecord | SubsPurchaseRecord;
}

export const purchaseDetailOverlay: React.FC<purchaseDetailOverlayProps> = ({
  show,
  onHide,
  record,
}) => {
  const [error, setError] = useState(false);
  let purchase: string;
  let description: string;
  let completeName: string;
  let purchaseAt: Date;
  let effectiveAt: Date;
  let totalAmount: number;

  if (!record) {
    setError(true);
  } else if (record instanceof CoursePurchaseRecord) {
    purchase = "CoursePurchaseRecord";
    description = record.course?.title;
    completeName = record.user?.surname + ", " + record.user?.name;
    purchaseAt = record.purchaseAt || new Date();
    totalAmount = record.totalAmount || 0;
    effectiveAt = new Date();
  } else if (record instanceof SubsPurchaseRecord) {
    purchase = "SubsPurchaseRecord";
    description = record.subscription?.description;
    completeName = record.user?.surname + ", " + record.user?.name;
    purchaseAt = record.purchaseAt || new Date();
    totalAmount = record.totalAmount || 0;
    effectiveAt = record.effectiveAt || new Date();
  }
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Purchase Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <Error message="Purchase does not exist" />
          ) : (
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} md={8}>
                  {/* Purchase details */}
                  <div className="text-center">
                    <p>
                      <strong>Purchase ID:</strong> {record.id}
                    </p>
                    {purchase === "SubsPurchaseRecord" ? (
                      <p>
                        <strong>Subscription:</strong> {description}
                      </p>
                    ) : (
                      <p>
                        <strong>Course:</strong> {description}
                      </p>
                    )}
                    <p>
                      <strong>Buyer:</strong> {completeName}
                    </p>
                    {purchase === "SubsPurchaseRecord" && (
                      <p>
                        <strong>Effective Date:</strong>{" "}
                        <DateComponent date={effectiveAt} />
                      </p>
                    )}
                    <p>
                      <strong>Purchase Date:</strong>{" "}
                      <DateComponent date={purchaseAt} />
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ${totalAmount}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
