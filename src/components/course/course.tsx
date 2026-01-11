import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import LevelList from "../level/levelList";
import Loading from "../common/loading";
import Error from "../common/error";
import NavigationButton from "../common/buttons/navigationButton";
import PurchaseButton from "../common/buttons/purchaseCourseButton";
import useGet from "@hooks/crud/useGet";
import checkPurchase from "@utils/auth/checkPurchase";
import getUser from "@utils/auth/getUser";
import checkSubscription from "@utils/auth/checkSubscription";
import DateComponent from "@utils/date";
import { Course, User } from "@utils/types";
import CourseTopicsList from "@components/topic/courseTopicsList";

interface CourseGetOneProps {
  id: string;
}

const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
  } = useGet<Course>(`/api/courses/preview/${id}`, false);
  const [button, setButton] = useState<number>(2);
  async function determineView(user: User, id: string): Promise<number> {
    let view = 3;
    if (user) {
      if (user.admin) {
        view = 1;
      } else {
        const purchaseStatus =
          id ? await checkPurchase(id) : false;
          console.log("id:",id," purchaseStatus:",purchaseStatus);
        const subscriptionStatus = await checkSubscription();
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
      } else {setButton(3);
      }
    };

    fetchData();
  }, [id]);

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
              <CourseTopicsList selectedTopics={course.topics} />
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

              <LevelList course={id} levels={course?.levels as any}/>
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
export default CourseGetOne;
