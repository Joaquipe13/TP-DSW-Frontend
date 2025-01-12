import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { NavigationButton, Loading, Error } from "@components/index.ts";
import { usePurchaseAlert, useGet } from "@hooks/index.ts";
import {
  checkSubscription,
  checkPurchase,
  userType,
  getUser,
  Level,
} from "@utils/index.ts";
import LevelPreview from "./levelPreview.tsx";

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
  const [role, setRole] = useState<null | string>(null);
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
      if (purchaseStatus || subscriptionStatus || user.admin) {
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
              {level.id === undefined ? (
                <Button>
                  <Loading />
                </Button>
              ) : (
                <Button
                  onClick={() => handleLevel(level.id)}
                  style={{ width: "100%" }}
                  variant="light"
                >
                  <LevelPreview id={level.id} />
                </Button>
              )}
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
