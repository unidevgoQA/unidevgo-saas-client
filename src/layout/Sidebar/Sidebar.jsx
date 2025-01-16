import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
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
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";


const getFormattedDate = (date) => {
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Sidebar = ({ isDrawerOpen, drawerWidth, collapsedDrawerWidth }) => {
  const { userRole } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const date = new Date(); // Use any date object
  const formattedDate = getFormattedDate(date);


  const menuItems = [
    { text: "Home", icon: <FiHome />, path: "/" },
    // Company Menu Items
    {
      text: "Profile",
      icon: <FiUser />,
      path: "companies/profile",
      role: "company",
    },
    {
      text: "All Employees",
      icon: <FiUsers />,
      path: "employees/all",
      role: "company",
    },
    {
      text: "Add Employee",
      icon: <FiUserPlus />,
      path: "employees/add",
      role: "company",
    },
    {
      text: "Leave Management",
      icon: <FiClipboard />,
      path: "leave/manage",
      role: "company",
    },
    // Admin Menu Items
    { text: "Profile", icon: <FiUser />, path: "admin/profile", role: "admin" },
    {
      text: "All Companies",
      icon: <FiDatabase />,
      path: "companies/all",
      role: "admin",
    },
    {
      text: "Add Company",
      icon: <FiUserPlus />,
      path: "companies/add",
      role: "admin",
    },
    {
      text: "Edit Company",
      icon: <FiEdit />,
      path: "companies/edit",
      role: "admin",
    },
    {
      text: "Company Details",
      icon: <FiFileText />,
      path: "companies/profile",
      role: "admin",
    },

    // Employee Menu Items
    {
      text: "Profile",
      icon: <FiUser />,
      path: "employees/profile",
      role: "employee",
    },
    {
      text: "Leave Status",
      icon: <FiUserCheck />,
      path: "leave",
      role: "employee",
    },
    {
      text: "Work Progress",
      icon: <FiPieChart />,
      path: "work-progress",
      role: "employee",
    },
    {
      text: "Attendance",
      icon: <FiCalendar />,
      path: "/attendance-management",
      role: "employee",
    },
    {
      text: "Calendar",
      icon: <FiCalendar />,
      path: "/calender",
      role: "employee",
    },
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
          backgroundColor: "#fff", // Your sidebar background color
          color: "var(--primary-color)", // Sidebar text color
          transition: "width 0.3s ease", // Smooth transition when collapsing
        },
      }}
    >
      <Toolbar>
        {isDrawerOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "80px",
              width: "100%",
            }}
          >
            <Avatar
              src={user?.profileImageUrl}
              alt={user?.name}
              sx={{
                width: "80px",
                height: "80px",
                margin : '20px 0px',
                borderRadius: "10px",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Welcome {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {formattedDate}
            </Typography>
          </Box>
        )}
      </Toolbar>
      <List
        sx={{
          display: "grid",
          gridTemplateColumns: isDrawerOpen ? "1fr 1fr" : "1fr",
          gap: 2,
          padding: 2,
        }}
      >
        {filteredMenuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
                background: "linear-gradient(#371edc, #170b68)",
                borderRadius: "8px",
                p: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  color: "#000",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: "#fff",
                  justifyContent: "center",

                  fontSize: "25px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
