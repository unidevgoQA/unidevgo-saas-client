import {
  Box,
  CssBaseline
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <CssBaseline />
      {/* Topbar */}
      <Topbar toggleDrawer={toggleDrawer} />
      {/* Sidebar */}
      <Sidebar isDrawerOpen={isDrawerOpen} />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${
            isDrawerOpen ? drawerWidth : collapsedDrawerWidth
          }px)`,
          transition: "width 0.3s ease",
          backgroundColor: "#fff",
          padding: "20px",
          marginTop: "64px", // Adjusts for AppBar height
          overflow: "auto"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
