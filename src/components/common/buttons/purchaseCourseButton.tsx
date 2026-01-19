import { useState } from "react";
import Button from "react-bootstrap/Button";
import PurchaseConfirmationModal from "@components/purchaseRecord/purchaseConfirmationModal";
import useLoginAlert from "@hooks/auth/useLoginAlert";
import usePost from "@hooks/crud/usePost";
import getUser from "@utils/auth/getUser";

interface PurchaseButtonProps {
  courseId: number | string;
}

function PurchaseButton({ courseId }: PurchaseButtonProps) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const { showLoginAlert, LoginAlert } = useLoginAlert();

  const { create, loading } = usePost<{
    course: number | string;
    user: number;
  }>("/api/coursePurchaseRecords");

  const handlePurchase = async () => {
    const user = await getUser();
    const userId = user ? user.id : null;

    if (!userId) {
      showLoginAlert();
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    setShowConfirmModal(false);
    setIsConfirming(true);
    const user = await getUser();
    const userId = user ? user.id : null;

    const purchaseData = {
      course: courseId,
      user: userId,
    };

    create(purchaseData)
      .then((response) => {
        if (response) {
          alert("Purchase successful!");
          window.location.reload();
        } else {
          alert("There was an error processing the purchase.");
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setIsConfirming(false);
      });
  };

  const handleCancelPurchase = () => {
    setShowConfirmModal(false);
  };

  return (
    <div>
      <Button
        variant="success"
        onClick={handlePurchase}
        disabled={loading || isConfirming}
        data-testid="purchase-course-button"
      >
        {loading || isConfirming ? "Processing..." : "Buy Course"}
      </Button>
      <LoginAlert />

      <PurchaseConfirmationModal
        show={showConfirmModal}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
        isProcessing={isConfirming}
        purchaseType="course"
      />
    </div>
  );
}

export default PurchaseButton;
