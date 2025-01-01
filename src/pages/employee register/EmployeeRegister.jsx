import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineCamera,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import "./employee-register.css";

const EmployeeRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState("Upload Profile Image");
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  

  const onSubmit = (data) => {
    console.log("Employee Registered:", data);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(#F1F1F1,#170b68)",
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
            Employee Registration
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
            Fill in the details to add a new employee to your team.
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

            <TextField
              label="Designation"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser size={20} color="#371edc" />
                  </InputAdornment>
                ),
              }}
              {...register("designation", {
                required: "Designation is required",
              })}
              error={!!errors.designation}
              helperText={errors.designation?.message}
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              label="Joining Date"
              variant="outlined"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("joiningDate", {
                required: "Joining Date is required",
              })}
              error={!!errors.joiningDate}
              helperText={errors.joiningDate?.message}
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
                  value: /^[+]?[0-9]+$/,
                  message: "Invalid contact number",
                },
              })}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber?.message}
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
              {...register("address", {
                required: "Address is required",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
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

export default EmployeeRegister;
