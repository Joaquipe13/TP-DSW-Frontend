import Container from "react-bootstrap/Container";
import SubscriptionCreate from "../../components/subscription/subsCreate";
import NavigationButton from "@components/common/buttons/navigationButton";

const SubscriptionCreatePage = () => {
  return (
    <Container fluid>
      <SubscriptionCreate />
      <Container
        fluid
        className="d-flex justify-content-center"
        style={{ marginBottom: "1rem" }}
      >
        <NavigationButton
          to={`/subscription/list`}
          label={`Back to Subscriptions`}
        />
      </Container>
    </Container>
  );
};
export default SubscriptionCreatePage;
