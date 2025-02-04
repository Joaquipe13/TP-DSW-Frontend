import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import MemberHead from "@layouts/member/head";
import AdminHead from "@layouts/admin/head";
import LoggedOutHead from "@layouts/loggedOut/head";
import PageBody from "@layouts/body";
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
  return (
    <Container fluid style={{ paddingTop: "70px" }}>
      {role === "admin" ? (
        <AdminHead />
      ) : role === "member" ? (
        <MemberHead />
      ) : (
        <LoggedOutHead />
      )}
      <Card className="mt-6" style={{ marginTop: "70px" }}>
        <PageBody />
      </Card>
    </Container>
  );
}
export default MainPage;
