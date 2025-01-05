import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import { userType } from "../common/authentication/userType";
import { useLogout } from "../common/hooks";
import { useLogin, useRegister } from "../authentication";
export const UserMenu: React.FC = () => {
  const { handleLogout } = useLogout();
  const role = userType();

  const { showLogin, LoginModal } = useLogin();
  const { showRegister, RegisterModal } = useRegister();

  return (
    <Nav className="ms-auto">
      {role !== null ? (
        <NavDropdown
          align="end"
          title={<FaUserCircle size={35} />}
          id="user-nav-dropdown"
          menuVariant="dark"
          style={{ marginLeft: "1rem" }}
        >
          <NavDropdown.Item href="/inDevelopment/Profile">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item href="/inDevelopment/Configuration">
            Configuration
          </NavDropdown.Item>

          {role === "member" && (
            <NavDropdown.Item href="/myPurchases">
              My Purchases
            </NavDropdown.Item>
          )}

          <NavDropdown.Divider />

          <NavDropdown.Item
            className="text-danger fw-bold"
            onClick={handleLogout}
          >
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown
          align="end"
          title={<FaUserCircle size={35} />}
          id="user-nav-dropdown"
          menuVariant="dark"
          style={{ marginLeft: "1rem" }}
        >
          <NavDropdown.Item onClick={showRegister}>Register</NavDropdown.Item>
          <NavDropdown.Item onClick={showLogin}>Login</NavDropdown.Item>
        </NavDropdown>
      )}
      <LoginModal />
      <RegisterModal />
    </Nav>
  );
};
