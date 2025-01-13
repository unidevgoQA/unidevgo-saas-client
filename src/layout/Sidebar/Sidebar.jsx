import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useContext } from "react";
import {
  FiCalendar,
  FiClipboard,
  FiDatabase,
  FiEdit,
  FiFileText,
  FiHome,
  FiPieChart,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiUsers
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const drawerWidth = 250;
const collapsedDrawerWidth = 60;

const Sidebar = ({ isDrawerOpen }) => {
  const { userRole } = useContext(AuthContext); // Use AuthContext

  const menuItems = [
    { text: "Home", icon: <FiHome />, path: "/" },
    // Company Menu Items
    { text: "Company Profile", icon: <FiUser />, path: "companies/profile", role: "company" },
    { text: "All Employees", icon: <FiUsers />, path: "employees/all", role: "company" },
    { text: "Add Employee", icon: <FiUserPlus />, path: "employees/add", role: "company" },
    { text: "Edit Employee", icon: <FiEdit />, path: "employees/edit", role: "company" },
    { text: "Leave Management", icon: <FiClipboard />, path: "/leave-management", role: "company" },
    // Admin Menu Items
    { text: "Admin Profile", icon: <FiUser />, path: "admin/profile", role: "admin" },
    { text: "All Companies", icon: <FiDatabase />, path: "companies/all", role: "admin" },
    { text: "Add Company", icon: <FiUserPlus />, path: "companies/add", role: "admin" },
    { text: "Edit Company", icon: <FiEdit />, path: "companies/edit", role: "admin" },
    { text: "Company Details", icon: <FiFileText />, path: "companies/profile", role: "admin" },
    
    // Employee Menu Items
    { text: "Employee Profile", icon: <FiUser />, path: "employees/profile", role: "employee" },
    { text: "Leave Status", icon: <FiUserCheck />, path: "/leave-management", role: "employee" },
    { text: "Work Progress", icon: <FiPieChart />, path: "/work-progress-management", role: "employee" },
    { text: "Attendance", icon: <FiCalendar />, path: "/attendance-management", role: "employee" },
    { text: "Calendar", icon: <FiCalendar />, path: "/calender", role: "employee" },
  ];

  // Filter menu items based on userRole
  const filteredMenuItems = menuItems.filter(
    (item) => !item.role || item.role === userRole
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(#371edc, #170b68);",
          color: "#FFF",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Toolbar />
      <List>
        {filteredMenuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                justifyContent: isDrawerOpen ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#fff",
                  "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                    color: "var(--primary-color)",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: "#FFF",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isDrawerOpen && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    fontSize: "0.875rem",
                    color: "#FFF",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
