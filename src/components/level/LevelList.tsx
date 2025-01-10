import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { NavigationButton } from "../common/buttons";
import { Level } from "../types.tsx";
import { useGet } from "../common/hooks/useGet.ts";
import { useEffect, useState } from "react";
import { Loading, Error } from "../common/utils";
import { LevelPreview } from "./levelPreview.tsx";
import {
  checkSubscription,
  checkPurchase,
  userType,
  getUser,
} from "../common/authentication";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { usePurchaseAlert } from "../purchaseRecord";
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
  const { showPurchaseAlert, PurchaseAlert } = usePurchaseAlert();
  const [role, setRole] = useState<null | {}>(null);
  const [loadingLevels, setLoading] = useState(true);
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
  const navigate = useNavigate();
  const handleLevel = async (id: number) => {
    const user = await getUser();
    if (user) {
      const purchaseStatus = await checkPurchase(user.id, course);
      const subscriptionStatus = await checkSubscription(user.id);
      if (purchaseStatus || subscriptionStatus) {
        navigate(`/level/${course}/${id}`);
      } else {
        showPurchaseAlert();
      }
    } else {
      showPurchaseAlert();
    }
  };

  if (loading || loadingLevels) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {Array.isArray(levels) ? (
          levels.map((level) => (
            <ListGroup.Item key={level.id}>
              <Button
                onClick={() => handleLevel(level.id)}
                style={{ width: "100%" }}
                variant="light"
              >
                <LevelPreview id={level.id} />
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <p>No levels available</p>
        )}
      </ListGroup>
      {role === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/level/create/${course}`}
            label="Add Level"
            variant="success"
          />
        </Container>
      )}
      <PurchaseAlert />
    </Container>
  );
};
