// auth hooks
export { useAdminRedirect, useLogout, useLoginAlert } from "@hooks/auth/index";

// crud hooks
export { usePost, useGet, usePut, remove } from "@hooks/crud/index";

// course hooks
export {
  deleteCourse,
  useCourseEdit,
  useSelectedTopics,
  getPurchasedCourses,
} from "@hooks/course/index";

//level hooks
export { deleteLevel, useLevelEdit } from "@hooks/level/index";

//purchaseRecord hooks
export {
  usePurchaseAlert,
  useFilteredPurchases,
} from "@hooks/purchaseRecord/index";

//subscription hooks
export {
  deleteSubscription,
  useSubscriptionEdit,
} from "@hooks/subscription/index";

//topic hooks
export { useCreateTopic, useDeleteTopic } from "@hooks/topic/index";

//unit hooks
export { deleteUnit, useUnitEdit } from "@hooks/unit/index";
