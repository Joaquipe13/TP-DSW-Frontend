import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserMenu } from "../userMenu";
export const AdminHead: React.FC = () => {
  return (
    <Navbar
      className="py-3 fs-5 w-100  "
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand href="/" style={{ marginLeft: "2rem" }}>
        My App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            title="Courses"
            id="course-dropdown"
            style={{ marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/course/list">View All</NavDropdown.Item>
            <NavDropdown.Item href="/course/create">Add New</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Topics"
            id="topics-dropdown"
            style={{ marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/topic/list">View All</NavDropdown.Item>
            <NavDropdown.Item href="/topic/create">Add New</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Pruchases"
            id="purchaces-dropdown"
            style={{ marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/coursePurchaseRecords">
              Purchases of Courses
            </NavDropdown.Item>
            <NavDropdown.Item href="/subscriptionsPurchaseRecords">
              Purchases of Subscriptions
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
            <NavDropdown.Item href="/subscription/create">
              Add New
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <UserMenu />
      </Navbar.Collapse>
    </Navbar>
  );
};
