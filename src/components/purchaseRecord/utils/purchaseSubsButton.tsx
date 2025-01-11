import { useState } from "react";
import { usePost } from "../../../common/hooks/usePost.ts";
import Button from "react-bootstrap/Button";
import { getUser } from "../../../common/authentication/getUser.ts";
import { useLoginAlert } from "../../../common/hooks/useLoginAlert.tsx";
import { PurchaseConfirmationModal } from "./purchaseConfirmationModal";

interface SubscriptionButtonProps {
  subscriptionId: number;
}

export function SubscriptionButton({
  subscriptionId,
}: SubscriptionButtonProps) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { showLoginAlert, LoginAlert } = useLoginAlert();
  const { create, loading } = usePost<{ subscription: number; user: number }>(
    "/api/subsPurchaseRecords"
  );

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
      subscription: subscriptionId,
      user: userId,
    };
    console.log("purchaseData:", purchaseData);
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
      >
        {loading || isConfirming ? "Processing..." : "Buy Subscription"}
      </Button>
      <LoginAlert />

      <PurchaseConfirmationModal
        show={showConfirmModal}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
        isProcessing={isConfirming}
        purchaseType="subscription"
      />
    </div>
  );
}
