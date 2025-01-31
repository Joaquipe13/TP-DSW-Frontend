import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { RegisterOverlay, LoginOverlay } from "@components/index.ts";
import { useLogout } from "@hooks/index.ts";
import { userType } from "@utils/index.ts";

export const UserMenu: React.FC = () => {
  const { handleLogout } = useLogout();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const fetchUserRole = async () => {
    const fetchedRole = await userType();
    setRole(fetchedRole);
  };
  useEffect(() => {
    fetchUserRole();

    return;
  }, []);
  const handleLogin = () => {
    setShowLogin(true);
  };
  const handleRegister = () => {
    setShowRegister(true);
  };
  const hideLogin = async () => {
    setShowLogin(false);
  };
  return (
    <Nav className="ms-auto">
      <NavDropdown
        align="end"
        title={<FaUserCircle size={35} />}
        id="user-nav-dropdown"
        style={{ marginLeft: "1rem", color: "#34A853" }}
      >
        {role !== null ? (
          <>
            {role === "member" && (
              <>
                <NavDropdown.Item style={{ color: "#FFFFFF" }} href="/coursePurchaseRecords">
                  My Purchases
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </>
            )}
            <NavDropdown.Item style={{ color: "#FFFFFF" }}
              className="text-danger fw-bold"
              onClick={handleLogout}
            >
              Log Out
            </NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item style={{ color: "#FFFFFF" }} onClick={handleRegister}>
              Register
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#FFFFFF" }}  onClick={handleLogin}>Login</NavDropdown.Item>
          </>
        )}
      </NavDropdown>
      <LoginOverlay show={showLogin} setShow={setShowLogin} />
      <RegisterOverlay
        show={showRegister}
        setShow={setShowRegister}
        onSwitchToLogin={handleLogin}
        hideLogin={hideLogin}
      />
    </Nav>
  );
};
