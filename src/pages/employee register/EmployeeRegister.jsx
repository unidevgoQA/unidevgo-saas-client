import {
    Box,
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCamera } from "react-icons/ai";
import "./employee-register.css";

const EmployeeRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Employee Registered:", data);
    // Handle employee registration logic
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(#371edc, #170b68);",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box className="register-box">
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: "600",
              color: "var(--primary-color)",
            }}
            variant="h2"
            align="center"
            className="register-header"
          >
            REGISTER EMPLOYEE
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: "600",
              marginY: "20px",
            }}
            align="center"
            className="register-subtext"
          >
            Add a new employee to your company.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              InputProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
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
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
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
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
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
              label="Designation"
              variant="outlined"
              fullWidth
              InputProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              {...register("designation", { required: "Designation is required" })}
              error={!!errors.designation}
              helperText={errors.designation?.message}
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              label="Joining Date"
              variant="outlined"
              type="date"
              fullWidth
              InputProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                shrink: true,
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              {...register("joiningDate", { required: "Joining Date is required" })}
              error={!!errors.joiningDate}
              helperText={errors.joiningDate?.message}
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              InputProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              {...register("contactNumber", {
                required: "Contact Number is required",
                pattern: {
                  value: /^[+]?\d+$/,
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
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              variant="outlined"
              type="file"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AiOutlineCamera size={24} color="var(--primary-color)" />
                  </InputAdornment>
                ),
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, serif", fontSize: "16px" },
              }}
              {...register("profileImage", {
                required: "Profile Image is required",
              })}
              error={!!errors.profileImage}
              helperText={errors.profileImage?.message}
              sx={{ marginBottom: "20px" }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="register-button"
              sx={{
                padding: "8px",
                fontSize: "14px",
                height: "40px",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "var(--primary-color)",
                fontFamily: "Poppins, serif",
                color: "white",
                "&:hover": { backgroundColor: "#2c1bb6" },
              }}
            >
              REGISTER
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmployeeRegister;
