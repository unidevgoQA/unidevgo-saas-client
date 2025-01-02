import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import {
  FiCalendar,
  FiClipboard,
  FiClock,
  FiEdit,
  FiFileText,
  FiFolder,
  FiHome,
  FiSettings,
  FiUser,
  FiUserPlus,
  FiUsers
} from "react-icons/fi";
import { Link } from "react-router-dom";

const drawerWidth = 250;
const collapsedDrawerWidth = 60;

const Sidebar = ({ isDrawerOpen }) => {
  const [openSections, setOpenSections] = useState({ employees: false });

  const handleToggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { text: "Home", icon: <FiHome />, path: "/" },
    { text: "Projects", icon: <FiFolder />, path: "/projects" },
    {
      text: "Employees",
      icon: <FiUsers />,
      children: [
        { text: "All Employees", icon: <FiUser />, path: "/employees/all" },
        { text: "Add Employee", icon: <FiUserPlus />, path: "/employees/add" },
        { text: "Edit Employee", icon: <FiEdit />, path: "/employees/edit" },
        { text: "Employee Shift", icon: <FiClock />, path: "/employees/shift" },
        { text: "Employee Profile", icon: <FiFileText />, path: "/employees/profile" },
      ],
    },
    { text: "Leave Management", icon: <FiClipboard />, path: "/leave-management" },
    { text: "Attendance", icon: <FiCalendar />, path: "/attendance" },
    { text: "Holidays", icon: <FiCalendar />, path: "/holidays" },
    { text: "Clients", icon: <FiUser />, path: "/clients" },
    { text: "Payroll", icon: <FiSettings />, path: "/payroll" },
    { text: "Leaders", icon: <FiUsers />, path: "/leaders" },
    { text: "Jobs", icon: <FiFolder />, path: "/jobs" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isDrawerOpen ? drawerWidth : collapsedDrawerWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--primary-color)", // Use primary color variable
          color: "#FFF",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.children ? (
              <>
                <ListItemButton
                  onClick={() => handleToggle(item.text.toLowerCase())}
                  sx={{
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    px: 2.5,
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
                        fontSize: "0.875rem", // Decrease font size for parent items
                        color: "#FFF",
                      }}
                    />
                  )}
                  {isDrawerOpen &&
                    (openSections[item.text.toLowerCase()] ? (
                      <ExpandLess sx={{ color: "#FFF" }} />
                    ) : (
                      <ExpandMore sx={{ color: "#FFF" }} />
                    ))}
                </ListItemButton>
                <Collapse
                  in={openSections[item.text.toLowerCase()]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItemButton
                        key={childIndex}
                        component={Link}
                        to={child.path}
                        sx={{
                          pl: isDrawerOpen ? 4 : 0,
                          justifyContent: isDrawerOpen ? "initial" : "center",
                          px: 2.5,
                          "&:hover": {
                            backgroundColor: "#fff", // Hover background
                            "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                              color: "var(--primary-color)", // Change icon and text color on hover
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
                          {child.icon}
                        </ListItemIcon>
                        {isDrawerOpen && (
                          <ListItemText
                            primary={child.text}
                            sx={{
                              fontSize: "0.75rem", // Decrease font size for submenu items
                              color: "#FFF",
                            }}
                          />
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "#fff", // Hover background
                      "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                        color: "var(--primary-color)", // Change icon and text color on hover
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
                        fontSize: "0.875rem", // Decrease font size for parent items
                        color: "#FFF",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
