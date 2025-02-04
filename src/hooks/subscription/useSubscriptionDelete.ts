import remove from "@hooks/crud/useDelete";

const deleteSubscription = async (courseId: string) => {
  return await remove(`/api/subscriptions/${courseId}`);
};
export default deleteSubscription;
