import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CompanyRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState("Upload Profile Image");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const navigate = useNavigate();

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

      // Get base URL from environment variable
      const baseUrl = import.meta.env.VITE_BASE_URL;


    try {
      const response = await axios.post(
        `${baseUrl}api/v1/companies/create-company`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Company Registered Successfully!");

      navigate("/login");
    } catch (error) {
      toast.error("Failed to register company. Please try again.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "var(--bg-color)",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: "var(--text-white-color)",
            border: "1px solid var(--primary-color)",
            borderRadius: "5px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            padding: "40px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              color: "var(--primary-color)",
              marginBottom: "20px",
              textAlign: "center",
            }}
            variant="h4"
          >
            Register Your Company
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              color: "var(--primary-color)",
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
                    <AiOutlineShop
                      size={20}
                      style={{ color: "var(--primary-color)" }}
                    />
                  </InputAdornment>
                ),
              }}
              {...register("name", { required: "Company Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                marginBottom: "20px",
              
              }}
            />

            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail
                      size={20}
                      style={{ color: "var(--primary-color)" }}
                    />
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
              sx={{
                marginBottom: "20px",
              
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineLock
                      size={20}
                      style={{ color: "var(--primary-color)" }}
                    />
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
              sx={{
                marginBottom: "20px",
              }}
            />

            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineHome
                      size={20}
                      style={{ color: "var(--primary-color)" }}
                    />
                  </InputAdornment>
                ),
              
              }}
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{
                marginBottom: "20px",
              }}
            />

            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlinePhone
                      size={20}
                      style={{ color: "var(--primary-color)" }}
                    />
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
              sx={{
                marginBottom: "20px",
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "#ffffff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                textTransform: "none",
                padding: "12px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "var(--bg-dark-blue-color)",
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
