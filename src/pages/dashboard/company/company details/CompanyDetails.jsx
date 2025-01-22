import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleCompanyQuery } from "../../../../features/company/companyApi";
import { useGetAllEmployeesByCompanyQuery } from "../../../../features/employee/employeeApi";
import AllEmployeesByCompany from "../../employee/all employees by company/AllEmployeesByCompany";

const CompanyDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCompanyQuery(id); // Destructure isLoading
  const { data: employeesDataByCompany , isLoading : employeeRetriveByComapnyLoading } = useGetAllEmployeesByCompanyQuery(id);

  const employees = employeesDataByCompany?.data || [];
  
  const company = data?.data;

  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (isLoading && employeeRetriveByComapnyLoading) {
    // Show a loading indicator if data is still loading
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CircularProgress color="var(--primary-color)" size={50} />
      </Box>
    );
  }
  
  if (!employees || employees.length === 0) {
    return <Typography>No employees found.</Typography>;
  }

  return (
  <>
    <Box sx={{ p: 3,   backgroundColor: "var(--bg-color)",
     }}>
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
              src={company?.profileImageUrl}
              alt={company?.name}
              sx={{
                width: "100%",
                height: "100%",
                border: "2px solid #fff",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            />
            {/* Edit Icon */}
            <Link to={`/dashboard/companies/edit/${company.id}`}>
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
            {company?.name}
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
      <Card sx={{ flexGrow: 1, boxShadow: 3, p: 3 ,  backgroundColor: "var(--bg-color)",
                border: "1px solid var(--primary-color)", }}>
        {tabValue === 0 && (
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EmailIcon sx={{ color: "var(--primary-color)", }} /> Email
              </Typography>
              <Typography sx={{ mt: 2,color : "var(--primary-text-color)" }}>{company?.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <WorkspacePremiumIcon sx={{ color: "var(--primary-color)", }} />{" "}
                Subscription Plan
              </Typography>
              <Typography sx={{ mt: 2 ,color : "var(--primary-text-color)"}}>{company?.subscription}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                fontWeight="bold"
                variant="subtitle2"
                color="var(--primary-text-color)"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <HomeIcon sx={{ color: "var(--primary-color)", }} /> Address
              </Typography>
              <Typography sx={{ mt: 2 ,color : "var(--primary-text-color)"}}>{company?.address}</Typography>
            </Grid>
          </Grid>
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
                  <LockIcon sx={{ color: "var(--primary-color)", }} /> Password Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Needs Password Change:{" "}
                  {company?.needsPasswordChange ? "Yes" : "No"}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "var(--primary-color)", }}  />}
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <VerifiedUserIcon sx={{ color: "var(--primary-color)", }}  /> Account
                  Status
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Status:{" "}
                  {company?.status === "active" ? "Active" : "Inactive"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Card>
    </Box>
  </Box>
    <AllEmployeesByCompany employees={employees} employeeRetriveByComapnyLoading={employeeRetriveByComapnyLoading} />
  </>
  );
};

export default CompanyDetails;
