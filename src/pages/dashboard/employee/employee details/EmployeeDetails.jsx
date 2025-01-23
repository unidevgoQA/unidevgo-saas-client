import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
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
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleEmployeeQuery } from "../../../../features/employee/employeeApi";

const EmployeeDetails = () => {
  const { id } = useParams();

  const { data } = useGetSingleEmployeeQuery(id);
  const user = data?.data || {};

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
          color: "var(--primary-text-color)",
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
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
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          {/* Employee Info */}
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
            {user?.designation}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation={isMobile ? "horizontal" : "vertical"}
          sx={{
            mt: 3,
            "& .MuiTab-root": {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              color: "var(--primary-text-color)",
              minHeight: "40px",
              padding: "8px 16px",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            },
            "& .Mui-selected": {
              color: "var(--primary-text-color) !important",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
          TabIndicatorProps={{
            style: { backgroundColor: "transparent" },
          }}
        >
          <Tab icon={<InfoIcon />} label="Overview" />
          <Tab icon={<DetailsIcon />} label="Details" />
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
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EmailIcon sx={{ color: "var(--primary-color)" }} /> Email
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PhoneIcon sx={{ color: "var(--primary-color)" }} /> Phone
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.contactNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <HomeIcon sx={{ color: "var(--primary-color)" }} /> Address
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <WorkIcon sx={{ color: "var(--primary-color)" }} /> Department
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.designation}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CalendarTodayIcon sx={{ color: "var(--primary-color)" }} />
                Joining Date
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.joiningDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <BadgeIcon sx={{ color: "var(--primary-color)" }} /> Employee
                ID
              </Typography>
              <Typography sx={{ mt: 2, color: "var(--primary-text-color)" }}>
                {user?.id}
              </Typography>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: "var(--primary-color)" }} />
                }
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LockIcon sx={{ color: "var(--primary-color)" }} /> Password
                  Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "var(--primary-text-color)" }}>
                  Needs Password Change: {" "}
                  {user?.needsPasswordChange ? "Yes" : "No"}
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

export default EmployeeDetails;
