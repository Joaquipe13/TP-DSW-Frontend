import React, { useEffect, useState } from "react";
import { useGet } from "../common/hooks/index.ts";
import { Course, User } from "../types.tsx";
import { NavigationButton } from "../common/buttons/index.ts";
import { Topics } from "../topic/topics.tsx";
import { LevelList } from "../level/levelList.tsx";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Loading, Error, DateComponent } from "../common/utils/index.ts";
import { PurchaseButton } from "../purchaseRecord/utils/index.ts";
import {
  checkSubscription,
  checkPurchase,
  getUser,
} from "../common/authentication/index.ts";
interface CourseGetOneProps {
  id: string | undefined;
}

export const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
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
        console.log("user", user.id,"course", id);
        const purchaseStatus =
          id && user ? await checkPurchase(user.id, id) : false;
        const subscriptionStatus = await checkSubscription(user.id);
        view = purchaseStatus || subscriptionStatus ? 2 : 3;
      }
    }

    return view;
  }
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
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
    <Container>
      <br />
      <Card>
        <Card.Header as="h3">{course?.title}</Card.Header>
        <Card.Body>
          <div style={{ textAlign: "left" }}>
            <Card.Text className="fs-4">{course?.resume}</Card.Text>
            <Card.Text className="fs-4">
              <strong>Price:</strong> ${course?.price}
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Topics:</strong>
            </Card.Text>
            <Topics selectedTopics={course?.topics} />
            <Card.Text
              style={{ textAlign: "left" }}
              className="text-muted fw-light"
            >
              <strong>Created at:</strong>{" "}
              <DateComponent
                style={{ display: "inline-block" }}
                date={course?.createdAt}
              />
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Levels:</strong>
            </Card.Text>

            <LevelList course={id} />
          </div>
        </Card.Body>
        <Card.Body className="d-flex justify-content-center align-items-end">
          {button === 1 ? (
            <NavigationButton
              to={`/course/update/${course?.id}`}
              label="Edit"
            />
          ) : button === 3 ? (
            <PurchaseButton courseId={id} />
          ) : null}
        </Card.Body>
      </Card>
    </Container>
  );
};
