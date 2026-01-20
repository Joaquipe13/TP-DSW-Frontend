import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import AdminHead from "@layouts/admin/head";
import PageBody from "@layouts/body";
import LoggedOutHead from "@layouts/loggedOut/head";
import MemberHead from "@layouts/member/head";
import userType from "@utils/auth/userType";

function MainPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      setRole(null);
      const fetchedRole = await userType();
      setRole(fetchedRole);
    };
    fetchUserRole();
  }, []);

  const renderHeader = () => {
    if (role === "admin") {
      return <AdminHead />;
    } else if (role === "member") {
      return <MemberHead />;
    } else {
      return <LoggedOutHead />;
    }
  };

  const renderBody = () => {
    return (
      <Card className="mt-6" style={{ marginTop: "70px" }}>
        <PageBody />
      </Card>
    );
  };

  return (
    <Container fluid style={{ paddingTop: "70px" }}>
      {renderHeader()}
      {renderBody()}
    </Container>
  );
}
export default MainPage;
