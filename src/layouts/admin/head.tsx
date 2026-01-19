import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import UserMenu from "../userMenu";
import Logo from "@utils/logo";

const AdminHead: React.FC = () => {
  return (
    <Navbar
      className="py-3 fs-5 w-100"
      style={{
        backgroundColor: "#1A73E8", // Color azul del logo
        borderBottom: "3px solid #1A73E8", // Línea inferior verde para contraste
      }}
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand href="/" style={{ marginLeft: "2rem", color: "#FFFFFF" }}>
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown
            title="Courses"
            id="course-dropdown"
            style={{ color: "#FFFFFF", marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item style={{ color: "#FFFFFF" }} href="/course/list">
              View All
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              href="/course/create"
            >
              Add New
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            title="Topics"
            id="topics-dropdown"
            style={{ color: "#FFFFFF", marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item style={{ color: "#FFFFFF" }} href="/topic/list">
              View All
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#FFFFFF" }} href="/topic/create">
              Add New
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Pruchases"
            id="purchaces-dropdown"
            style={{ color: "#FFFFFF", marginLeft: "1rem" }}
            menuVariant="dark"
          >
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              href="/coursePurchaseRecords"
            >
              Purchases of Courses
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ color: "#FFFFFF" }}
              href="/subscriptionsPurchaseRecords"
            >
              Purchases of Subscriptions
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Subscriptions"
            id="subscriptions-dropdown"
            style={{ color: "#FFFFFF", marginLeft: "1rem" }}
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
              href="/subscription/create"
            >
              Add New
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <UserMenu />
      </Navbar.Collapse>
    </Navbar>
  );
};
export default AdminHead;
