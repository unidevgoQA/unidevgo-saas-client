import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
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
  const user = data?.data;

  console.log(data);
  const employee = {
    id: "EMP00190",
    name: "Mark",
    email: "mark@johnsonera.com",
    password: "passwordAlice123",
    needsPasswordChange: false,
    role: "employee",
    designation: "HR Specialist",
    companyId: "67890",
    joiningDate: "2021-06-15T00:00:00.000Z",
    gender: "female",
    profileImageUrl: "https://example.com/profile-images/alicejohnson.jpg",
    address: "789 Pine Street, Gotham City, USA",
    contactNumber: "+11234567890",
    isDeleted: false,
    performanceRating: "Exceeds Expectations",
    department: "Human Resources",
    supervisor: "John Doe",
    skills: ["Conflict Resolution", "Employee Engagement", "HR Analytics"],
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
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for depth
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Push content to top and bottom
            height: "100%", // Full height for proper positioning
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
            {/* Avatar with Edit Icon */}
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
            {/* Employee Info */}
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
              }}
            >
              {user?.designation}
            </Typography>
          </Box>

          {/* Tabs at the Bottom */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={{
              mt: 3,
              "& .MuiTab-root": {
                display: "flex", // Flex container for icon and label
                flexDirection: "row", // Icon and label side by side
                alignItems: "center", // Center items vertically
                gap: 1, // Space between icon and label
                color: "#fff",
                minHeight: "40px",
                padding: "8px 16px", // Add padding for more space
                borderRadius: 2, // Rounded corners for tabs
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Add hover effect
                },
              },
              "& .Mui-selected": {
                color: "#fff !important",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Highlight for selected tab
              },
            }}
            TabIndicatorProps={{
              style: { backgroundColor: "transparent" }, // Remove the indicator line
            }}
          >
            <Tab icon={<InfoIcon />} label="Overview" />
            <Tab icon={<DetailsIcon />} label="Details" />
          </Tabs>
        </Box>

        {/* Content Area */}
        <Card sx={{ flexGrow: 1, boxShadow: 3, p: 3 }}>
          {tabValue === 0 && (
            <>
              {/* <Typography variant="h4" sx={{ color: 'var(--primary-color)' }} gutterBottom fontWeight="bold">
                Personal Information
              </Typography> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
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
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <PhoneIcon sx={{ color: "#371edc" }} /> Contact Number
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user?.contactNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <HomeIcon sx={{ color: "#371edc" }} /> Address
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user?.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <WorkIcon sx={{ color: "#371edc" }} /> Designation
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user?.designation}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <CalendarTodayIcon sx={{ color: "#371edc" }} /> Joining Date
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    {new Date(user?.joiningDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <PersonIcon sx={{ color: "#371edc" }} /> Gender
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{user?.gender}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <BadgeIcon sx={{ color: "#371edc" }} /> Department
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{employee.department}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <BadgeIcon sx={{ color: "#371edc" }} /> Supervisor
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{employee.supervisor}</Typography>
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
                    {user?.needsPasswordChange ? "Yes" : "No"}
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
                    <DetailsIcon sx={{ color: "#371edc" }} /> Account Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Account Deleted: {user?.isDeleted ? "Yes" : "No"}
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
