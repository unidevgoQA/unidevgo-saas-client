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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineCamera,
  AiOutlineGlobal,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineTeam
} from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineDescription, MdWorkOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const CompanyRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("Upload Profile Image");

  // Function to generate a 15-digit random company ID
  const generateRandomCompanyId = () => {
    return Math.floor(Math.random() * 10 ** 15)
      .toString()
      .padStart(15, "0");
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data) => {
    const companyId = generateRandomCompanyId(); // Generate company ID
    const companyData = {
      id: companyId,
      name: data.name,
      email: data.email,
      password: data.password,
      needsPasswordChange: true,
      subscription: "Gold", // Assuming a default value
      profileImageUrl: fileName, // Assuming the file name is used as a placeholder
      address: data.address,
      contactNumber: data.contactNumber,
      isDeleted: false,
      established: data.established,
      industry: data.industry,
      website: data.website,
      employees: data.employees,
      description: data.description,
      mission: data.mission,
    };
    console.log("Company Registered:", companyData);
    // Handle company registration logic
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(#371edc, #170b68);",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "30px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: 700,
              color: "#371edc",
              marginBottom: "10px",
            }}
            variant="h4"
            align="center"
          >
            Register Your Company
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: 500,
              color: "#666666",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Create your company account to access advanced features.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineShop size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("name", { required: "Company Name is required" })}
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
                        <AiOutlineMail size={20} color="#371edc" />
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineLock size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
                        <AiOutlinePhone size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("contactNumber", {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid contact number",
                    },
                  })}
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Established Year"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SlCalender size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsBuildings size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("industry", { required: "Industry is required" })}
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineGlobal size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("website", {
                    required: "Website is required",
                    pattern: {
                      value: /^(https?:\/\/)?([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/,
                      message: "Invalid website URL",
                    },
                  })}
                  error={!!errors.website}
                  helperText={errors.website?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number of Employees"
                  variant="outlined"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineTeam size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("employees", {
                    required: "Number of Employees is required",
                    valueAsNumber: true,
                  })}
                  error={!!errors.employees}
                  helperText={errors.employees?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineDescription size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mission"
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdWorkOutline size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("mission", {
                    required: "Mission is required",
                  })}
                  error={!!errors.mission}
                  helperText={errors.mission?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineHome size={20} color="#371edc" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("address", { required: "Address is required" })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    component="label"
                    sx={{ backgroundColor: "#f0f0f0", borderRadius: "5px", padding: "10px" }}
                  >
                    <AiOutlineCamera size={24} color="#371edc" />
                    <input
                      hidden
                      type="file"
                      onChange={onFileChange}
                      {...register("profileImage", {
                        required: "Profile Image is required",
                      })}
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
                    }}
                  >
                    {fileName}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: "30px",
                backgroundColor: "#371edc",
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
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Grid>
  );
};

export default CompanyRegister;
