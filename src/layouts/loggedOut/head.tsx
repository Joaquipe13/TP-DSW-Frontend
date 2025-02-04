import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import useLoginAlert from "@hooks/auth/useLoginAlert";
import UserMenu from "../userMenu";
import Logo from "@utils/logo";
const LoggedOutHead: React.FC = () => {
  const { showLoginAlert, LoginAlert } = useLoginAlert();

  return (
    <Navbar
      className="py-3 fs-5 w-100"
      style={{
        backgroundColor: "#34A853", // Color azul del logo
        borderBottom: "3px solid #34A853", // Línea inferior verde para contraste
      }}
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand
        href="/"
        className="ms-2"
        style={{ marginLeft: "2rem", color: "#FFFFFF" }}
      >
        <Logo />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-start flex-grow-1 pe-3">
          <NavDropdown
            title="Courses"
            id="course-dropdown"
            style={{
              color: "#34A853",
              marginLeft: "1rem",
              backgroundColor: "#34A853",
            }}
            menuVariant="dark"
          >
            <NavDropdown.Item style={{ color: "#FFFFFF" }} href="/course/list">
              View All
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              onClick={() => showLoginAlert()}
            >
              My Courses
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Subscriptions"
            id="subscriptions-dropdown"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#34A853",
              marginLeft: "1rem",
            }}
            menuVariant="dark"
          >
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              href="/subscription/list"
            >
              View All
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              onClick={() => showLoginAlert()}
            >
              My Subscriptions
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <UserMenu />
      </Navbar.Collapse>
      <LoginAlert />
    </Navbar>
  );
};
export default LoggedOutHead;
