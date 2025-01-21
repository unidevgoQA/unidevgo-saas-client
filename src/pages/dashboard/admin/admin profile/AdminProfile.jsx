import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
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
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProviders";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);



  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "var(--bg-color)" }}>
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
            backgroundColor: "var(--bg-color)",
            border: "1px solid var(--primary-color)",
            color: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Profile Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              marginBottom: 2,
              position: "relative",
            }}
          >
            {/* Avatar */}
            <Box sx={{ position: "relative", width: 120, height: 120 }}>
              <Avatar
                src={user?.profileImageUrl}
                alt={user?.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #fff",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              />
              {/* Edit Icon */}
              <Link to={`/dashboard/companies/edit/${user.id}`}>
                {" "}
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    color: "var(--primary-color)",
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
              </Link>
            </Box>
            {/* Company Name */}
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {user?.name}
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                backgroundColor: "#fff",
                color: "var(--primary-color)",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontWeight: "bold",
              }}
            >
              Admin
            </Typography>
          </Box>

          {/* Tabs Section */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={{
              "& .MuiTab-root": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                color: "#fff",
                minHeight: "40px",
                padding: "8px 16px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
              "& .Mui-selected": {
                color: "#fff !important",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            TabIndicatorProps={{
              style: { backgroundColor: "transparent" },
            }}
          >
            <Tab
              sx={{
                display: "flex",
                gap: 1,
              }}
              icon={<InfoIcon />}
              label="Overview"
            />
            <Tab
              sx={{
                display: "flex",
                gap: 1,
              }}
              icon={<DetailsIcon />}
              label="Details"
            />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Card
          sx={{
            flexGrow: 1,
            boxShadow: 3,
            p: 3,
            backgroundColor: "var(--bg-color)",
            border: "1px solid var(--primary-color)",
          }}
        >
          {tabValue === 0 && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "var(--primary-text-color)",
                    }}
                  >
                    <EmailIcon sx={{ color: "var(--primary-color)" }} /> Email
                  </Typography>
                  <Typography
                    sx={{ mt: 2, color: "var(--primary-text-color)" }}
                  >
                    {user?.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "var(--primary-text-color)",
                    }}
                  >
                    <DetailsIcon sx={{ color: "var(--primary-color)" }} /> Role
                  </Typography>
                  <Typography
                    sx={{ mt: 2, color: "var(--primary-text-color)" }}
                  >
                    Admin
                  </Typography>
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
                    <LockIcon sx={{ color: "var(--primary-color)" }} /> Password
                    Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Needs Password Change:{" "}
                    {user?.needsPasswordChange ? "Yes" : "No"}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: "var(--primary-color)" }} />
                  }
                >
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <VerifiedUserIcon sx={{ color: "var(--primary-color)" }} />{" "}
                    Account Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Status: {user?.status === "active" ? "Active" : "Inactive"}
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
