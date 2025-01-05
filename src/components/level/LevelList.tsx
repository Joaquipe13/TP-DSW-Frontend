import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../common/buttons/index.ts";
import { userType } from "../common/authentication/userType.ts";
import { Level } from "../types.tsx";
import { useGet } from "../common/hooks/useGet.ts";
import { useEffect } from "react";
import { Loading, Error } from "../common/utils/index.ts";
import { LevelPreview } from "./levelPreview.tsx";
interface LevelListProps {
  course: string | undefined;
}

export const LevelList: React.FC<LevelListProps> = ({ course }) => {
  const {
    data: levels,
    error,
    loading,
    fetchData,
  } = useGet<Level>(`/api/levels?course=${course}`);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {Array.isArray(levels) ? (
          levels.map((level) => (
            <ListGroup.Item key={level.id}>
              <NavigationButton
                to={`/level/${course}/${level.id}`}
                style={{ width: "100%" }}
                variant="light"
              >
                <LevelPreview id={level.id} />
              </NavigationButton>
            </ListGroup.Item>
          ))
        ) : (
          <p>No levels available</p>
        )}
      </ListGroup>
      {user === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/level/create/${course}`}
            label="Add Level"
            variant="success"
          />
        </Container>
      )}
    </Container>
  );
};
