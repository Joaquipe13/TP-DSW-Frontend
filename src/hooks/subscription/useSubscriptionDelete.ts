import { remove } from "@hooks/index.ts";

export const deleteSubscription = async (courseId: string) => {
  return await remove(`/api/subscriptions/${courseId}`);
};
