import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminRoute from "@middlewares/adminRoute.js";
import TopicListPage from "@pages/topic/topicListPage.js";
import TopicCreatePage from "@pages/topic/topicCreatePage.js";
import CourseUpdatePage from "@pages/course/courseEditPage.js";
import CourseCreatePage from "@pages/course/courseCreatePage.js";
import LevelCreatePage from "@pages/level/levelCreatePage.js";
import LevelUpdatePage from "@pages/level/levelEditPage.js";
import UnitCreatePage from "@pages/unit/unitCreatePage.js";
import UnitUpdatePage from "@pages/unit/unitEditPage.js";
import SubscriptionsRecordPage from "@pages/purchases/subscriptionsRecordPage.js";
import SubscriptionCreatePage from "@pages/subscription/subsCreatePage.js";
import SubscriptionUpdatePage from "@pages/subscription/subsEditPage.js";
import PurchasesRecordPage from "@pages/purchases/purchasesRecordPage.js";
import PrivateRoute from "@middlewares/privateRoute.js";
import MyCourseListPage from "@pages/course/myCoursePage.js";
import UnitPage from "@pages/unit/unitPage.js";
import LevelPage from "@pages/level/levelPage.js";
import SubscriptionListPage from "@pages/subscription/subsListPage.js";
import CourseListPage from "@pages/course/courseListPage.js";
import CoursePage from "@pages/course/coursePage.js";
import InDevelopmentPage from "@pages/inDevelopment.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //Admin routes
      {
        path: "topic/list",
        element: <AdminRoute element={<TopicListPage />} />,
      },
      {
        path: "topic/create",
        element: <AdminRoute element={<TopicCreatePage />} />,
      },
      {
        path: "course/update/:id",
        element: <AdminRoute element={<CourseUpdatePage />} />,
      },
      {
        path: "course/create",
        element: <AdminRoute element={<CourseCreatePage />} />,
      },
      {
        path: "level/create/:courseId",
        element: <AdminRoute element={<LevelCreatePage />} />,
      },
      {
        path: "level/update/:courseId/:id",
        element: <AdminRoute element={<LevelUpdatePage />} />,
      },
      {
        path: "unit/create/:courseId/:levelId",
        element: <AdminRoute element={<UnitCreatePage />} />,
      },
      {
        path: "unit/update/:courseId/:levelId/:id",
        element: <AdminRoute element={<UnitUpdatePage />} />,
      },

      {
        path: "subscriptionsPurchaseRecords",
        element: <AdminRoute element={<SubscriptionsRecordPage />} />,
      },
      {
        path: "subscription/create",
        element: <AdminRoute element={<SubscriptionCreatePage />} />,
      },
      {
        path: "subscription/update/:id",
        element: <AdminRoute element={<SubscriptionUpdatePage />} />,
      },

      // User routes
      {
        path: "coursePurchaseRecords",
        element: <PrivateRoute element={<PurchasesRecordPage />} />,
      },
      {
        path: "myCourses",
        element: <PrivateRoute element={<MyCourseListPage />} />,
      },
      {
        path: "unit/:courseId/:levelId/:id",
        element: <PrivateRoute element={<UnitPage />} />,
      },

      {
        path: "level/:courseId/:id",
        element: <PrivateRoute element={<LevelPage />} />,
      },
      {
        path: "myPurchases",
        element: <PrivateRoute element={<PurchasesRecordPage />} />,
      },
      {
        path: "mySubscriptions",
        element: <PrivateRoute element={<SubscriptionsRecordPage />} />,
      },
      // Public routes
      {
        path: "subscription/list",
        element: <SubscriptionListPage />,
      },
      {
        path: "/",
        element: <CourseListPage />,
      },

      {
        path: "course/list",
        element: <CourseListPage />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "inDevelopment/:title",
        element: <InDevelopmentPage />,
      },
    ],
  },
]);

export default router;
