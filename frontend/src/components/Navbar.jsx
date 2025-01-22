import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  // Check if the user is logged in by checking for a token in cookies
  const isLoggedIn = Cookies.get("token") !== undefined;

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get("http://localhost:5000/api/user/profile", {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, 
            },
          });
          setUserRole(response.data.role); 
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, [isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" }); 
    navigate("/signin"); 
  };

  const navbarStyle = {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    textDecoration: "none",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    marginBottom: "0",
    padding: "0",
  };

  const navLinkStyle = {
    marginLeft: "1rem",
    textDecoration: "none",
    color: "#333",
    fontSize: "1rem",
    fontWeight: "500",
  };

  const activeLinkStyle = {
    color: "#007bff",
  };

  return (
    <nav style={navbarStyle}>
      <h3 style={logoStyle}>
        <Link to="/" style={logoStyle}>
          Notes Management
        </Link>
      </h3>
      <ul style={navLinksStyle}>
        {isLoggedIn ? (
          <>
            {userRole === "admin" ? (
              <>
                <li>
                  <Link to="/admin-dashboard" style={{ ...navLinkStyle, ...activeLinkStyle }}>
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} style={navLinkStyle}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/create" style={navLinkStyle}>
                    Create Note
                  </Link>
                </li>
                <li>
                  <Link to="/noteslist" style={{ ...navLinkStyle, ...activeLinkStyle }}>
                    All Notes
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} style={navLinkStyle}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </>
        ) : (
          <li>
            <Link to="/signin" style={navLinkStyle}>
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
