// auth hooks
export {
  useAdminRedirect,
  useLogout,
  useLoginAlert,
} from "@hooks/auth/index.ts";

// crud hooks
export { usePost, useGet, usePut, remove } from "@hooks/crud/index.ts";

// course hooks
export {
  deleteCourse,
  useCourseEdit,
  useSelectedTopics,
  getPurchasedCourses,
} from "@hooks/course/index.ts";

//level hooks
export { deleteLevel, useLevelEdit } from "@hooks/level/index.ts";

//purchaseRecord hooks
export {
  usePurchaseAlert,
  useFilteredPurchases,
} from "@hooks/purchaseRecord/index.ts";

//subscription hooks
export {
  deleteSubscription,
  useSubscriptionEdit,
} from "@hooks/subscription/index.ts";

//topic hooks
export { useCreateTopic, useDeleteTopic } from "@hooks/topic/index.ts";

//unit hooks
export { deleteUnit, useUnitEdit } from "@hooks/unit/index.ts";
