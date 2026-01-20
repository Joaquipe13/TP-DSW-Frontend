import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import NavigationButton from "@components/common/buttons/navigationButton";
import Error from "@components/common/error";
import Loading from "@components/common/loading";
import usePurchaseAlert from "@hooks/purchaseRecord/usePurchaseAlert";
import { Level } from "@utils/types";
import checkPurchase from "@utils/auth/checkPurchase";
import checkSubscription from "@utils/auth/checkSubscription";
import getUser from "@utils/auth/getUser";
import userType from "@utils/auth/userType";
import LevelPreview from "./levelPreview";

interface LevelListProps {
  course: string;
  levels: any | Level[] ;
}

const LevelList: React.FC<LevelListProps> = ({ course, levels }) => {

  const { showPurchaseAlert, PurchaseAlert } = usePurchaseAlert();
  const [role, setRole] = useState<null | string>(null);
  const [loadingLevels, setLoading] = useState(true);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const fetchedUser = await userType();
        setRole(fetchedUser);
      } catch (err) {
        console.error("Error fetching user:", err);
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
      const purchaseStatus = await checkPurchase(course);
      const subscriptionStatus = await checkSubscription();
      if (purchaseStatus || subscriptionStatus || user.admin) {
        navigate(`/level/${course}/${id}`);
      } else {
        showPurchaseAlert();
      }
    } else {
      showPurchaseAlert();
    }
  };

  if (loadingLevels) return <Loading />;



  if (!Array.isArray(levels)) {
    return (
      <Error message="Error loading levels. Please try again later." />
    );
  }

  return (
    <Container>
      <ListGroup style={{ marginBottom: "1rem" }}>
        {levels.map((level: Level) => (
          <ListGroup.Item key={level.id}>
            <Button
              onClick={() => handleLevel(level.id)}
              style={{ width: "100%" }}
              variant="light"
            >
              <LevelPreview order={level.order} name={level.name} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {role === "admin" && (
        <Container className="d-flex justify-content-center">
          <NavigationButton
            to={`/level/create/${course}`}
            label="Add Level"
            variant="success"
            dataTestId="add-level-button"
          />
        </Container>
      )}
      <PurchaseAlert />
    </Container>
  );
};
export default LevelList;
