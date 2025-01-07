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
    AiOutlineCamera,
    AiOutlineGlobal,
    AiOutlineHome,
    AiOutlineInfoCircle,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineShop,
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
    // Pre-fill form fields with existing company data
    setValue("name", companyData.name);
    setValue("email", companyData.email);
    setValue("address", companyData.address);
    setValue("contactNumber", companyData.contactNumber);
    setValue("profileImage", companyData.profileImageUrl);
    setValue("subscription", companyData.subscription);
    setValue("established", companyData.established);
    setValue("industry", companyData.industry);
    setValue("website", companyData.website);
    setValue("employees", companyData.employees);
    setValue("description", companyData.description);
    setValue("mission", companyData.mission);
  }, [companyData, setValue]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data) => {
    console.log("Company Updated:", data);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "15px",
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
              marginBottom: "10px",
              fontSize: "1.5rem",
              "@media (max-width: 600px)": {
                fontSize: "1.25rem",
              },
            }}
            variant="h4"
            align="center"
          >
            Edit Company Details
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: 500,
              color: "#666666",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "1rem",
              "@media (max-width: 600px)": {
                fontSize: "0.875rem",
              },
            }}
          >
            Update your company information below.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineShop size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("name", {
                    required: "Company Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineMail size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineHome size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("address", { required: "Address is required" })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlinePhone
                          size={20}
                          color="var(--primary-color)"
                        />
                      </InputAdornment>
                    ),
                  }}
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[0-9]+$/, // Regex validation
                      message: "Invalid contact number",
                    },
                  })}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Subscription"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineInfoCircle
                          size={20}
                          color="var(--primary-color)"
                        />
                      </InputAdornment>
                    ),
                  }}
                  {...register("subscription", {
                    required: "Subscription is required",
                  })}
                  error={!!errors.subscription}
                  helperText={errors.subscription?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Established Year"
                  variant="outlined"
                  fullWidth
                  {...register("established", {
                    required: "Established Year is required",
                  })}
                  error={!!errors.established}
                  helperText={errors.established?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Industry"
                  variant="outlined"
                  fullWidth
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Employees"
                  variant="outlined"
                  fullWidth
                  type="number"
                  {...register("employees", {
                    required: "Number of Employees is required",
                  })}
                  error={!!errors.employees}
                  helperText={errors.employees?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineGlobal
                          size={20}
                          color="var(--primary-color)"
                        />
                      </InputAdornment>
                    ),
                  }}
                  {...register("website", {
                    required: "Website is required",
                    pattern: {
                      value:
                        /^https?:\/\/[a-zA-Z0-9._\-]+(\.[a-zA-Z]{2,3})(\/[^\s]*)?$/i,
                      message: "Invalid website URL",
                    },
                  })}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mission Statement"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  {...register("mission", {
                    required: "Mission statement is required",
                  })}
                  error={!!errors.mission}
                  helperText={errors.mission?.message}
                />
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
                  fullWidth
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    fontFamily: "Poppins, serif",
                    fontWeight: "600",
                    textTransform: "none",
                    padding: "10px",
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
    </Grid>
  );
};

export default EditCompany;
