import Container from "react-bootstrap/Container";
import { MemberHead, AdminHead, PageBody } from "../layout/index.ts";
import { Card } from "react-bootstrap";

import { userType } from "../common/authentication/userType.ts";
import { LoggedOutHead } from "../layout/loggedOut/head.tsx";
import { useEffect, useState } from "react";
export function MainPage() {
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
      {role === "admin" ? <AdminHead /> : ( role === "member" ? <MemberHead /> : <LoggedOutHead /> )}
      <Card className="mt-6" style={{ marginTop: "70px" }}>
        <PageBody />
      </Card>
    </Container>
  );
}
