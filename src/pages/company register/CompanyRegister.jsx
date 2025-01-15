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
import axios from "axios"; // Import axios
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineCamera,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
} from "react-icons/ai";
import "./company-register.css";

const CompanyRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState("Upload Profile Image");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const uploadedImageUrl = `https://example.com/uploads/${file.name}`;
      setProfileImageUrl(uploadedImageUrl);
    }
  };

  const onSubmit = async (data) => {
    const requestData = {
      company: {
        id: "CMP" + Math.floor(10000 + Math.random() * 90000),
        name: data.name,
        email: data.email,
        password: data.password,
        needsPasswordChange: true,
        subscription: "gold",
        profileImageUrl: profileImageUrl || "https://default.com/avatar.png",
        address: data.address,
        contactNumber: data.contactNumber,
        isDeleted: false,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/companies/create-company",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Company Registered Successfully:", response.data);
      toast(response.data.message);
    } catch (error) {
      console.error(
        "Error registering company:",
        error.response?.data || error
      );
      alert("Failed to register company. Please try again.");
    }
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
      <Container maxWidth="sm">
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
              sx={{ marginBottom: "20px" }}
            />

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
              sx={{ marginBottom: "20px" }}
            />

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
              sx={{ marginBottom: "20px" }}
            />

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
              sx={{ marginBottom: "20px" }}
            />

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
              sx={{ marginBottom: "20px" }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <IconButton
                component="label"
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <AiOutlineCamera size={24} color="#371edc" />
                <input
                  hidden
                  type="file"
                  onChange={onFileChange}
                  accept="image/*"
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
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
