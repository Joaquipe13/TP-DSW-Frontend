import { useState } from "react";
import { usePost } from "../../common/hooks/usePost.ts";
import Button from "react-bootstrap/Button";
import { getUser } from "../../common/authentication/getUser.ts";
import { useLoginAlert } from "../../common/hooks/useLoginAlert.tsx";
import { PurchaseConfirmationModal } from "./PurchaseConfirmationModal";

interface PurchaseButtonProps {
  courseId: number;
}

export function PurchaseButton({ courseId }: PurchaseButtonProps) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { showLoginAlert, LoginAlert } = useLoginAlert();
  const { create, loading } = usePost<{ course: number; user: number }>(
    "/api/coursePurchaseRecords"
  );

  const handlePurchase = () => {
    const user = getUser();
    const userId = user ? user.id : null;

    if (!userId) {
      showLoginAlert();
      return;
    }

    setShowConfirmModal(true); // Mostrar el modal de confirmación
  };

  const handleConfirmPurchase = () => {
    setShowConfirmModal(false); // Cierra el modal
    setIsConfirming(true);

    const user = getUser();
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
    setShowConfirmModal(false); // Cierra el modal
  };

  return (
    <div>
      <Button
        variant="success"
        onClick={handlePurchase}
        disabled={loading || isConfirming}
      >
        {loading || isConfirming ? "Processing..." : "Buy Course"}
      </Button>
      <LoginAlert />

      {/* Modal de confirmación */}
      <PurchaseConfirmationModal
        show={showConfirmModal}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
        isProcessing={isConfirming}
      />
    </div>
  );
}
