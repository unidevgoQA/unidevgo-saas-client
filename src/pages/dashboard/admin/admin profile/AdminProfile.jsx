import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProviders";

const AdminProfile = () => {
  const {user} = useContext(AuthContext)
  const admin = {
    id: "admin0323",
    name: "Chirs Brown",
    email: "chirs.brown@gmail.com",
    password: "ewqe34534",
    role: "admin",
    isDeleted: false,
  };

  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            minWidth: isMobile ? "100%" : "300px",
            background: "linear-gradient(135deg, #170b68, #371edc)",
            color: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Elegant shadow
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Profile info at top, Tabs at bottom
            height: "100%", // Stretch sidebar for full height
          }}
        >
          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              position: "relative", // Allows relative positioning for child elements
            }}
          >
            {/* Avatar with Edit Icon */}
            <Box sx={{ position: "relative", width: 120, height: 120 }}>
              <Avatar
                alt={user?.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #fff",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Add subtle shadow to avatar
                }}
              >
                {user?.name.charAt(0)}
              </Avatar>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  color: "#371edc",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                  p: 1,
                  "&:hover": {
                    backgroundColor: "#371edc",
                    color: "#fff",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
            {/* Admin Info */}
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {user?.name}
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                backgroundColor: "#fff",
                color: "#371edc",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontWeight: "bold",
                marginBottom: 4, // Add gap between role and tabs
              }}
            >
              {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
            </Typography>
          </Box>

          {/* Tabs Section */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={{
              "& .MuiTab-root": {
                display: "flex", // Flexbox for icon and text alignment
                flexDirection: "row", // Icon and text side-by-side
                alignItems: "center", // Center items vertically
                gap: 1, // Space between icon and text
                color: "#fff",
                minHeight: "40px",
                padding: "8px 16px", // Increase padding for touch-friendly design
                borderRadius: 2, // Rounded corners for tabs
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Subtle hover effect
                },
              },
              "& .Mui-selected": {
                color: "#fff !important",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Highlight active tab
              },
            }}
            TabIndicatorProps={{
              style: { backgroundColor: "transparent" }, // Remove indicator line
            }}
          >
            <Tab
              sx={{
                display: "flex", // Flex for icon and text alignment
                gap: 1, // Space between icon and text
              }}
              icon={<InfoIcon />}
              label="Overview"
            />
            <Tab
              sx={{
                display: "flex", // Flex for icon and text alignment
                gap: 1, // Space between icon and text
              }}
              icon={<DetailsIcon />}
              label="Details"
            />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Card sx={{ flexGrow: 1, boxShadow: 3, p: 3 }}>
          {tabValue === 0 && (
            <>
              {/* <Typography variant="h6" sx={{ color: 'var(--primary-color)' }} gutterBottom fontWeight="bold">
                Personal Information
              </Typography> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <EmailIcon sx={{ color: "#371edc" }} /> Email
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <DetailsIcon sx={{ color: "#371edc" }} /> Role
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{admin.role}</Typography>
                </Grid>
              </Grid>
            </>
          )}
          {tabValue === 1 && (
            <Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#371edc" }} />}
                >
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LockIcon sx={{ color: "#371edc" }} /> Account Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Account Deleted: {admin.isDeleted ? "Yes" : "No"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default AdminProfile;
