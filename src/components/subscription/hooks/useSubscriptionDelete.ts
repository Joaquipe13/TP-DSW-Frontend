import { remove } from "../../../common/hooks/useDelete";

export const deleteSubscription = async (courseId: string) => {
  return await remove(`/api/subscriptions/${courseId}`);
};
