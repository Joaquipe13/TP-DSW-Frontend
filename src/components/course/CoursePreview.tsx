import React, { useEffect, useState } from "react";
import { Course, User } from "../types.tsx";
import Card from "react-bootstrap/Card";
import { Topics } from "../topic/topics.tsx";
import { useGet } from "../common/hooks/useGet.ts";
import {
  checkPurchase,
  checkSubscription,
  getUser,
} from "../common/authentication";
import { Loading, Error, DateComponent } from "./../common/utils";
import { NavigationButton } from "../common/buttons";
import { PurchaseButton } from "./../purchaseRecord/utils/purchaseCourseButton.tsx";

interface CoursePreviewProps {
  id: number;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);
  const [button, setButton] = useState<number>(2);

  async function determineView(user: User, id: number): Promise<number> {
    let view = 1;
    if (user) {
      if (user.admin) {
        view = 1;
      } else {
        const purchaseStatus = await checkPurchase(user.id, id);
        const subscriptionStatus = await checkSubscription(user.id);
        view = purchaseStatus || subscriptionStatus ? 2 : 3;
      }
    }

    return view;
  }
  useEffect(() => {
    const fetchData = async () => {
      const user = getUser();
      if (user) {
        const currentButton = await determineView(user, id);
        setButton(currentButton);
      } else {
        console.log("User is not defined.");
        setButton(3);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header as="h5">{course?.title}</Card.Header>
      <Card.Body>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Created at:</strong>{" "}
          <DateComponent
            style={{ display: "inline-block" }}
            date={course?.createdAt}
          />
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Price:</strong> ${course?.price}
        </Card.Text>
        <Card.Text style={{ textAlign: "left" }}>
          <strong>Topics:</strong>
        </Card.Text>
        <Topics selectedTopics={course?.topics} />
      </Card.Body>
      <Card.Body className="d-flex justify-content-center align-items-end">
        {button === 1 ? (
          <NavigationButton to={`/course/update/${course?.id}`} label="Edit" />
        ) : button === 3 ? (
          <PurchaseButton courseId={id} />
        ) : button === 2 ? (
          <NavigationButton
            to={`/Course/${course?.id}`}
            label="View"
            variant="secondary"
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};
