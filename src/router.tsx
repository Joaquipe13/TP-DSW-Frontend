import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import {
  CoursePage,
  CourseListPage,
  CourseCreatePage,
  CourseUpdatePage,
  MyCourseListPage,
  LevelPage,
  LevelCreatePage,
  LevelUpdatePage,
  UnitPage,
  UnitCreatePage,
  UnitUpdatePage,
  TopicListPage,
  TopicCreatePage,
  LoginPage,
  RegisterPage,
  SubscriptionListPage,
  SubscriptionCreatePage,
  SubscriptionUpdatePage,
  PurchasesRecordPage,
  InDevelopmentPage,
  SubscriptionsRecordPage,
} from "@pages/index.ts";
import { PrivateRoute, AdminRoute } from "@middlewares/index.ts";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
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
