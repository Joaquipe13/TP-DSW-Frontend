import { Container, Row, Col, Modal } from "react-bootstrap";
import type { SubsPurchaseRecord, CoursePurchaseRecord } from "@utils/index";
import { DateComponent } from "@utils/index";
import { Error } from "@components/index";
import { useEffect, useState } from "react";
interface purchaseDetailOverlayProps {
  show: boolean;
  onHide: () => void;
  record: CoursePurchaseRecord | SubsPurchaseRecord | null;
}

export function PurchaseDetailOverlay({
  show,
  onHide,
  record,
}: purchaseDetailOverlayProps) {
  const [error, setError] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState({
    id: 0,
    purchase: "",
    description: "",
    completeName: "",
    purchaseAt: new Date(),
    effectiveAt: new Date(),
    totalAmount: 0,
  });

  useEffect(() => {
    if (!record) {
      setError(true);
      return;
    }

    const isCoursePurchase = "course" in record;
    const isSubsPurchase = "subscription" in record;

    if (isCoursePurchase || isSubsPurchase) {
      setPurchaseDetails({
        id: record.id || 0,
        purchase: isCoursePurchase
          ? "CoursePurchaseRecord"
          : "SubsPurchaseRecord",
        description: isCoursePurchase
          ? record.course?.title || "No title"
          : record.subscription?.description || "No description",
        completeName: `${record.user?.surname || "N/A"}, ${
          record.user?.name || "N/A"
        }`,
        purchaseAt: record.purchaseAt || new Date(),
        effectiveAt: isSubsPurchase
          ? record.effectiveAt || new Date()
          : new Date(),
        totalAmount: record.totalAmount || 0,
      });
      setError(false);
    } else {
      setError(true);
    }
  }, [record]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <Error message="Purchase does not exist" />
          ) : (
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  <div>
                    <p>
                      <strong>Purchase ID:</strong> {purchaseDetails.id}
                    </p>
                    {purchaseDetails.purchase === "SubsPurchaseRecord" ? (
                      <p>
                        <strong>Subscription:</strong>{" "}
                        {purchaseDetails.description}
                      </p>
                    ) : (
                      <p>
                        <strong>Course:</strong> {purchaseDetails.description}
                      </p>
                    )}
                    <p>
                      <strong>User name:</strong> {purchaseDetails.completeName}
                    </p>
                    {purchaseDetails.purchase === "SubsPurchaseRecord" && (
                      <p>
                        <strong>Effective Date:</strong>{" "}
                        <DateComponent date={purchaseDetails.effectiveAt} />
                      </p>
                    )}
                    <p>
                      <strong>Purchase Date:</strong>{" "}
                      <DateComponent date={purchaseDetails.purchaseAt} />
                    </p>
                    <p>
                      <strong>Total Amount:</strong> $
                      {purchaseDetails.totalAmount}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
