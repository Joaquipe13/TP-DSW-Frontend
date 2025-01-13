import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {
  Loading,
  LevelList,
  Topics,
  Error,
  NavigationButton,
  PurchaseButton,
} from "@components/index.ts";
import { useGet } from "@hooks/index.ts";
import {
  checkPurchase,
  checkSubscription,
  DateComponent,
  getUser,
  Course,
  User,
} from "@utils/index.ts";

interface CourseGetOneProps {
  id: string;
}

export const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`, false);

  const [button, setButton] = useState<number>(2);
  async function determineView(user: User, id: string): Promise<number> {
    let view = 1;
    if (user) {
      if (user.admin) {
        view = 1;
      } else {
        const purchaseStatus =
          id && user.id ? await checkPurchase(user.id, id) : false;
        const subscriptionStatus = user.id
          ? await checkSubscription(user.id)
          : false;
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
        {Array.isArray(course) || course == null ? (
          <Loading />
        ) : (
          <Card.Header as="h3">{course.title}</Card.Header>
        )}
        <Card.Body>
          {Array.isArray(course) || course == null ? (
            <Loading />
          ) : (
            <div style={{ textAlign: "left" }}>
              <Card.Text className="fs-4">{course.resume}</Card.Text>
              <Card.Text className="fs-4">
                <strong>Price:</strong> ${course.price}
              </Card.Text>
              <Card.Text className="fs-4">
                <strong>Topics:</strong>
              </Card.Text>
              <Topics selectedTopics={course.topics} />
              <Card.Text
                style={{ textAlign: "left" }}
                className="text-muted fw-light"
              >
                <strong>Created at:</strong>{" "}
                <DateComponent
                  style={{ display: "inline-block" }}
                  date={course.createdAt}
                />
              </Card.Text>
              <Card.Text className="fs-4">
                <strong>Levels:</strong>
              </Card.Text>

              <LevelList course={id} />
            </div>
          )}
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
