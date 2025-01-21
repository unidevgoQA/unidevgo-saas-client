import {
  Box,
  CssBaseline
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";


const drawerWidth = 300; // Width when the sidebar is expanded
const collapsedDrawerWidth = 100; // Adjust the collapsed width here


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
      <Sidebar isDrawerOpen={isDrawerOpen} drawerWidth={drawerWidth} collapsedDrawerWidth={collapsedDrawerWidth}/>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${
            isDrawerOpen ? drawerWidth : collapsedDrawerWidth
          }px)`,
          transition: "width 0.3s ease",
          backgroundColor: "var(--bg-color)",
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
