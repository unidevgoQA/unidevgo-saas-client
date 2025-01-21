import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import { MdOutlineLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "../../providers/AuthProviders";

const Topbar = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logoutUser, user } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose(); // Close the menu
    logoutUser(); // Call the logout function
    navigate("/"); // Redirect to the login page
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        backgroundColor: "var(--bg-color)",
        borderBottom : "1px solid var(--primary-color)",
        color: "#fff",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <FiMenu />
          </IconButton>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "32px", marginRight: "8px" }}
          />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Language Icon */}
          <IconButton color="inherit">
            <MdOutlineLanguage />
          </IconButton>

          {/* Notification Icon */}
          <IconButton color="inherit">
            <FiBell />
          </IconButton>

          {/* Profile Section */}
          <Tooltip title={user?.name}>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                src={user?.profileImageUrl}
                alt={user?.name}
                sx={{
                  width: "40px",
                  height: "40px",
                  margin: "20px 0px",
                  borderRadius: "10px",
                  border: "2px solid white",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: "40px" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
