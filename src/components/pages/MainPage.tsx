import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { MemberHead, AdminHead, PageBody } from "../Layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Card } from "react-bootstrap";

import { userType } from "../common/authentication/userType.ts";
import { LoggedOutHead } from "../Layouts/loggedOut/head.tsx";
export function MainPage() {
  const role = userType();
  return (
    <Container fluid style={{ paddingTop: "70px" }}>
      {role === "admin" ? <AdminHead /> : ( role === "member" ? <MemberHead /> : <LoggedOutHead /> )}
      <Card className="mt-6" style={{ marginTop: "70px" }}>
        <PageBody />
      </Card>
    </Container>
  );
}
