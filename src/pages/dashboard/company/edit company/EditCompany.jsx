import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineCalendar,
  AiOutlineCamera,
  AiOutlineFieldTime,
  AiOutlineGlobal,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineTeam,
} from "react-icons/ai";

const companyData = {
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

const iconMapping = {
  name: <AiOutlineShop size={20} color="var(--primary-color)" />,
  email: <AiOutlineMail size={20} color="var(--primary-color)" />,
  address: <AiOutlineHome size={20} color="var(--primary-color)" />,
  contactNumber: <AiOutlinePhone size={20} color="var(--primary-color)" />,
  subscription: <AiOutlineInfoCircle size={20} color="var(--primary-color)" />,
  established: <AiOutlineCalendar size={20} color="var(--primary-color)" />,
  industry: <AiOutlineInfoCircle size={20} color="var(--primary-color)" />,
  employees: <AiOutlineTeam size={20} color="var(--primary-color)" />,
  website: <AiOutlineGlobal size={20} color="var(--primary-color)" />,
  description: <AiOutlineFieldTime size={20} color="var(--primary-color)" />,
  mission: <AiOutlineFieldTime size={20} color="var(--primary-color)" />,
};

const EditCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [fileName, setFileName] = useState(
    companyData.profileImageUrl || "Upload Profile Image"
  );

  useEffect(() => {
    Object.keys(companyData).forEach((key) => {
      setValue(key, companyData[key]);
    });
  }, [setValue]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data) => {
    console.log("Company Updated:", data);
  };

  const renderTextField = (name, label, type = "text", multiline = false) => (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      multiline={multiline}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconMapping[name]}</InputAdornment>
        ),
      }}
      {...register(name, {
        required: `${label} is required`,
        ...(name === "email" && {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }),
        ...(name === "website" && {
          pattern: {
            value:
              /^https?:\/\/[a-zA-Z0-9._\-]+(\.[a-zA-Z]{2,3})(\/[^\s]*)?$/i,
            message: "Invalid website URL",
          },
        }),
        ...(name === "contactNumber" && {
          pattern: {
            value: /^[0-9]+$/,
            message: "Invalid contact number",
          },
        }),
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      defaultValue={companyData[name]}
    />
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        borderRadius: "10px",
        backgroundColor: "#f5f7fb",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            "@media (max-width: 600px)": {
              padding: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: 700,
              color: "var(--primary-color)",
              textAlign: "left",
              marginBottom: "30px",
              fontSize: "1.75rem",
              "@media (max-width: 600px)": {
                fontSize: "1.25rem",
              },
            }}
          >
            Edit Company Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {renderTextField("name", "Company Name")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("email", "Email Address")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("address", "Address")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("contactNumber", "Contact Number")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("subscription", "Subscription Plan")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("established", "Established Year")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("industry", "Industry")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("employees", "Number of Employees", "number")}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("website", "Website URL")}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("description", "Company Description", "text", true)}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("mission", "Mission Statement", "text", true)}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    flexDirection: "column",
                    "@media (min-width: 600px)": {
                      flexDirection: "row",
                    },
                  }}
                >
                  <IconButton
                    component="label"
                    sx={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      padding: "10px",
                      marginBottom: "10px",
                      "@media (min-width: 600px)": {
                        marginBottom: "0",
                      },
                    }}
                  >
                    <AiOutlineCamera size={24} color="var(--primary-color)" />
                    <input
                      hidden
                      type="file"
                      onChange={onFileChange}
                      {...register("profileImage")}
                    />
                  </IconButton>
                  <Typography
                    sx={{
                      marginLeft: "8px",
                      fontFamily: "Poppins, serif",
                      color: "#666666",
                      fontSize: "12px",
                      border: "1px solid rgba(149, 149, 149, 0.67)",
                      padding: "12px 10px",
                      width: "100%",
                      borderRadius: "4px",
                      textAlign: "center",
                      "@media (min-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    {fileName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    fontFamily: "Poppins, serif",
                    fontWeight: "600",
                    textTransform: "none",
                    padding: "15px",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "#2c1bb6",
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default EditCompany;
