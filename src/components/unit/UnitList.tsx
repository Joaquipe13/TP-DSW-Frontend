import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../common/buttons";
import { UnitPreview } from "./unitPreview.tsx";
import { userType } from "../common/authentication/userType.ts";
import { Unit } from "../types.tsx";
import { useGet } from "../common/hooks/index.ts";
import { useEffect } from "react";
import { Loading, Error } from "../common/utils";
interface UnitListProps {
  level: string | undefined;
  course: string | undefined;
}

export const UnitList: React.FC<UnitListProps> = ({ level, course }) => {
  const {
    data: units,
    error,
    loading,
    fetchData,
  } = useGet<Unit>(`/api/units?level=${level}`);
  console.log(units);
  console.log(level);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  const user = userType() ? userType() : "member";
  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {Array.isArray(units) ? (
          units.map((unit) => (
            <ListGroup.Item key={unit.id}>
              <NavigationButton
                to={`/unit/${course}/${level}/${unit.id}`}
                style={{ width: "100%" }}
                variant="light"
              >
                <UnitPreview name={unit.name} order={unit.order} />
              </NavigationButton>
            </ListGroup.Item>
          ))
        ) : (
          <p>No units available</p>
        )}
      </ListGroup>
      {user === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/unit/create/${course}/${level}`}
            label="Add Unit"
            variant="success"
          />
        </Container>
      )}
    </Container>
  );
};
