import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserMenu } from "../userMenu";
import { useLoginAlert } from "../../common/hooks";

export const LoggedOutHead: React.FC = () => {
  const { showLoginAlert, LoginAlert } = useLoginAlert();

  return (
    <Navbar
      className="py-3 fs-5"
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand href="/" className="ms-2">
        My App
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-start flex-grow-1 pe-3">
          <NavDropdown
            title="Courses"
            id="course-dropdown"
            style={{ marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/course/list">View All</NavDropdown.Item>
            <NavDropdown.Item onClick={() => showLoginAlert()}>
              My Courses
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Subscriptions"
            id="subscriptions-dropdown"
            style={{ marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/subscription/list">
              View All
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => showLoginAlert()}>
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
