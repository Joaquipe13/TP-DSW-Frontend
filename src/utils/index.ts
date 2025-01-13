//auth utils
export {
  createUser,
  checkPurchase,
  checkSubscription,
  getCookieValue,
  getUser,
  removeSessionCookies,
  removeToken,
  setCookieValue,
  userType,
} from "@utils/auth";

// validation utils
export {
  validateCourseTitle,
  validateCourseResume,
  validateCoursePrice,
  validateCourseTopics,
  validateSubsDescription,
  validateSubsPrice,
  validateSubsDuration,
  validateLevelName,
  validateLevelDescription,
  validateUnitName,
  validateUnitContent,
  validateLogin,
  validateRegister,
} from "@utils/validations/index.ts";

// other utils
export type {
  Topic,
  Level,
  File,
  Unit,
  Course,
  Subscription,
  CoursePurchaseRecord,
  SubsPurchaseRecord,
  User,
  PurchaseRecord,
} from "@utils/types.ts";

export { porturl } from "@utils/route";

export { DateComponent } from "@utils/date";
