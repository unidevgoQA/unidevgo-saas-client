import AssessmentIcon from "@mui/icons-material/Assessment";
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

const EmployeeProfile = () => {
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
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
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
            backgroundColor: "#371edc",
            color: "#fff",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={employee.profileImageUrl}
              alt={employee.name}
              sx={{ width: 100, height: 100, border: "2px solid #fff" }}
            />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              {employee.name}
            </Typography>
            <Typography variant="body2" textAlign="center">
              {employee.designation}
            </Typography>
            <IconButton sx={{ color: "#fff", border: "1px solid #fff" }}>
              <EditIcon />
            </IconButton>
          </Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            orientation={isMobile ? "horizontal" : "vertical"}
            sx={{
              mt: 3,
              "& .MuiTab-root": {
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                color: "#fff",
              },
              "& .Mui-selected": {
                color: '#fff !important',
                fontWeight: "bold",
              },
            }}
            TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
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
                  <Typography sx={{ mt: 2 }}>{employee.email}</Typography>
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
                  <Typography sx={{ mt: 2 }}>
                    {employee.contactNumber}
                  </Typography>
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
                  <Typography sx={{ mt: 2 }}>{employee.address}</Typography>
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
                  <Typography sx={{ mt: 2 }}>{employee.designation}</Typography>
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
                    {new Date(employee.joiningDate).toLocaleDateString()}
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
                  <Typography sx={{ mt: 2 }}>{employee.gender}</Typography>
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
                <Grid item xs={12}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <AssessmentIcon sx={{ color: "#371edc" }} /> Performance
                    Rating
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    {employee.performanceRating}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <DetailsIcon sx={{ color: "#371edc" }} /> Skills
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    {employee.skills.join(", ")}
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
                    <LockIcon sx={{ color: "#371edc" }} /> Password Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Needs Password Change:{" "}
                    {employee.needsPasswordChange ? "Yes" : "No"}
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
                    Account Deleted: {employee.isDeleted ? "Yes" : "No"}
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

export default EmployeeProfile;
