import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import RegisterOverlay from "@components/authentication/registerOverlay";
import LoginOverlay from "@components/authentication/loginOverlay";
import useLogout from "@hooks/auth/useLogout";
import userType from "@utils/auth/userType";

const UserMenu: React.FC = () => {
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
                <NavDropdown.Item
                  style={{ color: "#000000" }}
                  href="/coursePurchaseRecords"
                >
                  My Purchases
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </>
            )}
            <NavDropdown.Item
              style={{ color: "#000000" }}
              className="text-danger fw-bold"
              onClick={handleLogout}
            >
              Log Out
            </NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item
              style={{ color: "#000000" }}
              onClick={handleRegister}
            >
              Register
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ color: "#000000" }}
              onClick={handleLogin}
            >
              Login
            </NavDropdown.Item>
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
export default UserMenu;
