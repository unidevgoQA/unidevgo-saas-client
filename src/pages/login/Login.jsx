import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link as MuiLink,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Handle login logic
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
      {/* Login Form */}
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box className="login-box">
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: "600",
              color: "var(--primary-color)",
            }}
            variant="h2"
            align="center"
            className="login-header"
          >
            WELCOME BACK!
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, serif",
              fontWeight: "600",
              marginY: "20px",
            }}
            align="center"
            className="login-subtext"
          >
            Log in to access your personalized dashboard.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <FormControlLabel
                control={<Checkbox {...register("remember")} color="primary" />}
                label="Remember Me"
                sx={{ fontFamily: "Poppins, serif" }}
              />
              <MuiLink
                component={Link}
                to="/forgot-password"
                className="forgot-password"
                sx={{
                  fontFamily: "Poppins, serif",
                  fontWeight: "600",
                  color: "var(--primary-color)",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </MuiLink>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="login-button"
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
              LOG IN
            </Button>
          </form>

          <Typography
            align="center"
            sx={{
              marginTop: "20px",
            }}
            className="signup-text"
          >
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              sx={{
                fontFamily: "Poppins, serif",
                fontWeight: "600",
                color: "var(--primary-color)",
              }}
              className="signup-link"
            >
              Sign Up
            </MuiLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
