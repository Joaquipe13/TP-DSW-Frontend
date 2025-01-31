import { remove } from "@hooks/index";

export const deleteSubscription = async (courseId: string) => {
  return await remove(`/api/subscriptions/${courseId}`);
};
