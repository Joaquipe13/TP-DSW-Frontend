import { useState, useEffect } from "react";
import { useGet, usePut } from "@hooks/index.ts";
import {
  validateSubsDescription,
  validateSubsPrice,
  validateSubsDuration,
  Subscription,
} from "@utils/index.ts";

export const useSubscriptionEdit = (subscriptionId: string) => {
  const {
    loading,
    error,
    data: subscriptionData,
  } = useGet<Subscription>(`/api/subscriptions/${subscriptionId}`);
  const subscription = Array.isArray(subscriptionData)
    ? subscriptionData[0]
    : subscriptionData;
  const [isInitialized, setIsInitialized] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    description?: string;
    price?: string;
    duration?: string;
  }>({});

  const { update } = usePut<Subscription>(`/api/subscriptions`);

  useEffect(() => {
    if (subscription && !isInitialized) {
      setDescription(subscription.description || "");
      setPrice(subscription.price?.toString() || "");
      setDuration(subscription.duration?.toString() || "");
      setIsInitialized(true);
    }
  }, [subscription, isInitialized]);

  const handleSave = async (publish?: boolean) => {
    console.log(publish);
    const descriptionError = validateSubsDescription(description);
    const priceError = validateSubsPrice(price);
    const durationError = validateSubsDuration(duration);
    if (descriptionError || priceError || durationError) {
      setFormErrors({
        description: descriptionError,
        price: priceError,
        duration: durationError,
      });
      return;
    }
    const updatedSubscription: Subscription = {
      description,
      price: parseFloat(price),
      duration: parseInt(duration),
      isActive: publish ? true : false,
    };
    return await update(subscriptionId, updatedSubscription);
  };
  return {
    loading,
    error,
    oldSubscription: subscription,
    description,
    price,
    duration,
    formErrors,
    setDescription,
    setPrice,
    setDuration,
    handleSave,
  };
};
