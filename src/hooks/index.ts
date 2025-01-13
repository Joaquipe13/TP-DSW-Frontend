// auth hooks
export { useAdminRedirect, useLogout, useLoginAlert } from "./auth/index.ts";

// crud hooks
export { usePost, useGet, usePut, remove } from "./crud/index.ts";

// course hooks
export {
  deleteCourse,
  useCourseEdit,
  useSelectedTopics,
  getPurchasedCourses,
} from "./course/index.ts";

//level hooks
export { deleteLevel, useLevelEdit } from "./level/index.ts";

//purchaseRecord hooks
export {
  usePurchaseAlert,
  useFilteredPurchases,
} from "./purchaseRecord/index.ts";

//subscription hooks
export {
  deleteSubscription,
  useSubscriptionEdit,
} from "./subscription/index.ts";

//topic hooks
export { useCreateTopic, useDeleteTopic } from "./topic/index.ts";

//unit hooks
export { deleteUnit, useUnitEdit } from "./unit/index.ts";
