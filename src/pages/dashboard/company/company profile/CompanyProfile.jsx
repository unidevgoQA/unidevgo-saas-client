import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
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

const CompanyProfile = () => {
  
  const { user } = useContext(AuthContext); // Use AuthContext

  const company = {
    id: "56789",
    name: "FutureWorks Inc.",
    email: "hello@futureworks.com",
    password: "future123",
    needsPasswordChange: true,
    subscription: "Gold",
    profileImageUrl: "https://futureworks.com/images/avatar.png",
    address: "789 Progress Lane, Tech City, NY",
    contactNumber: "1122334455",
    isDeleted: false,
    established: "2010",
    industry: "Technology",
    website: "https://futureworks.com",
    employees: 250,
    description:
      "FutureWorks Inc. is a leading technology solutions provider specializing in innovative digital transformation services for businesses of all sizes.",
    mission:
      "Empowering businesses through cutting-edge technology and innovation to achieve their full potential.",
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
            background: "linear-gradient(#170b68, #371edc)",
            color: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for elegance
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Profile info at the top, Tabs at the bottom
            height: "100%", // Stretch sidebar to full height
          }}
        >
          {/* Profile Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              position: "relative", // Positioning for the edit icon
            }}
          >
            {/* Avatar */}
            <Box sx={{ position: "relative", width: 120, height: 120 }}>
              <Avatar
                src={user.profileImageUrl}
                alt={user.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #fff",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for the avatar
                }}
              />
              {/* Edit Icon */}
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
            {/* Company Name */}
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {user.name}
            </Typography>
            {/* Company Industry */}
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
                marginBottom: 4, // Add space between role and tabs
              }}
            >
              {company.industry}
            </Typography>
          </Box>

          {/* Tabs Section */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={{
              "& .MuiTab-root": {
                display: "flex", // Flex container for the tab
                flexDirection: "row", // Title and icon side-by-side
                alignItems: "center", // Center-align items vertically
                gap: 1, // Gap between icon and title
                color: "#fff",
                minHeight: "40px", // Consistent tab height
                padding: "8px 16px", // Add padding for spacing
                borderRadius: 2, // Add rounded corners
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
              style: { backgroundColor: "transparent" }, // Remove the indicator line
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
            {/* Uncomment if additional tabs are needed */}
            {/* <Tab icon={<SettingsIcon />} label="Settings" /> */}
          </Tabs>
        </Box>

        {/* Content Area */}
        <Card sx={{ flexGrow: 1, boxShadow: 3, p: 3 }}>
          {tabValue === 0 && (
            <>
              <Typography
                variant="h6"
                sx={{ color: "var(--primary-color)" }}
                gutterBottom
                fontWeight="bold"
              >
                Company Description
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                {company.description}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "var(--primary-color)" }}
                gutterBottom
                fontWeight="bold"
              >
                Mission Statement
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                {company.mission}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <EmailIcon sx={{ color: "#371edc" }} /> Email
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <WorkspacePremiumIcon sx={{ color: "#371edc" }} />{" "}
                    Subscription Plan
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user.subscription}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <HomeIcon sx={{ color: "#371edc" }} /> Address
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <PhoneIcon sx={{ color: "#371edc" }} /> Contact Number
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user.contactNumber}</Typography>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <InfoIcon sx={{ color: "#371edc" }} /> Established
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{company.established}</Typography>
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <DetailsIcon sx={{ color: "#371edc" }} /> Employees
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{company.employees}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <WorkspacePremiumIcon sx={{ color: "#371edc" }} /> Website
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{company.website}</Typography>
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
                    <LockIcon sx={{ color: "#371edc" }} /> Password Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Needs Password Change:{" "}
                    {company.needsPasswordChange ? "Yes" : "No"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#371edc" }} />}
                >
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <VerifiedUserIcon sx={{ color: "#371edc" }} /> Account
                    Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Account Deleted: {company.isDeleted ? "Yes" : "No"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
          {/* {tabValue === 2 && (
            <Typography variant="body1" color="textSecondary">
              Settings content goes here. Add form fields or additional details for customization.
            </Typography>
          )} */}
        </Card>
      </Box>
    </Box>
  );
};

export default CompanyProfile;
