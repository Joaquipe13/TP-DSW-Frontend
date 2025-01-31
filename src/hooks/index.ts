// auth hooks
export { useAdminRedirect, useLogout, useLoginAlert } from "@hooks/auth";

// crud hooks
export { usePost, useGet, usePut, remove } from "@hooks/crud";

// course hooks
export {
  deleteCourse,
  useCourseEdit,
  useSelectedTopics,
  getPurchasedCourses,
} from "@hooks/course";

//level hooks
export { deleteLevel, useLevelEdit } from "@hooks/level";

//purchaseRecord hooks
export {
  usePurchaseAlert,
  useFilteredPurchases,
  useSortList,
} from "@hooks/purchaseRecord";

//subscription hooks
export { deleteSubscription, useSubscriptionEdit } from "@hooks/subscription";

//topic hooks
export { useCreateTopic, useDeleteTopic } from "@hooks/topic";

//unit hooks
export { deleteUnit, useUnitEdit } from "@hooks/unit";
