import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAddAdminMutation } from "../../features/admin/adminApi";

const AdminRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState("Upload Profile Image");
  const [profileImageUrl, setProfileImageUrl] = useState("");
const navigate = useNavigate();
  // Add work task API
  const [addAdmin, { isLoading, isSuccess }] = useAddAdminMutation();

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const uploadedImageUrl = `https://example.com/uploads/${file.name}`;
      setProfileImageUrl(uploadedImageUrl);
    }
  };

  const onSubmit = (data) => {
    const formattedData = {
      id: "ADM" + Math.floor(10000 + Math.random() * 90000), // Generate a random ID
      name: data.name,
      email: data.email,
      password: data.password,
      needsPasswordChange: false,
      role: "admin",
      isDeleted: false,
    };
    addAdmin(formattedData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Added Admin Successfully", { id: "admin-register" });
      navigate('/login')
    }
    if (isLoading) {
      toast.loading("Loading", { id: "admin-register" });
    }
  }, [isSuccess, isLoading]);

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
            Admin Registration
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
            Create an account for admin privileges.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser size={20} color="#371edc" />
                  </InputAdornment>
                ),
              }}
              {...register("name", { required: "Full Name is required" })}
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
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ marginBottom: "20px" }}
            />

            {/* <Box
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
                  fontSize : '12px',
                  border : '1px solid rgba(149, 149, 149, 0.67)',
                  padding : '12px 10px',
                  width : '100%',
                  borderRadius : '4px'
                }}
              >
                {fileName}
              </Typography>
            </Box> */}

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

export default AdminRegister;
