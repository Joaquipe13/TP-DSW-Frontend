import React, { useEffect, useState } from "react";
import { useGet } from "../common/hooks";
import { Level } from "../types";
import { NavigationButton } from "../common/buttons";
import { UnitList } from "../unit";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { userType } from "../common/authentication";
import { Loading, Error } from "../common/utils";
interface LevelGetOneProps {
  id: string | undefined;
  courseId: string | undefined;
}

export const LevelGetOne: React.FC<LevelGetOneProps> = ({ id, courseId }) => {
  const [role, setRole] = useState<null | {}>(null);
  const [loadingButton, setLoading] = useState(true);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const fetchedUser = await userType();
        setRole(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);
  const {
    data: level,
    loading,
    error,
    fetchData,
  } = useGet<Level>(`/api/levels/${id}`);
  console.log(level);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container>
      <br />
      <Card>
        <Card.Header as="h3">
          Level {level?.order}: {level?.name}
        </Card.Header>
        <Card.Body>
          <div style={{ textAlign: "left" }}>
            <Card.Text className="fs-4">
              <strong>Description:</strong> {level?.description}
            </Card.Text>
            <Card.Text className="fs-4">
              <strong>Units:</strong>
            </Card.Text>
            <UnitList level={id} course={courseId} />
          </div>
          {loadingButton ? (
            <Loading />
          ) : (
            role === "admin" && (
              <NavigationButton
                className="d-flex justify-content-center"
                to={`/level/update/${courseId}/${id}`}
                label="Edit"
                style={{ marginTop: "2rem" }}
              />
            )
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
