import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
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
              padding: "20px",
          }}
      >
          <Box
              sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "30px",
                  width: "100%",
                  maxWidth: "400px",
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
                  Welcome Back!
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
                  Log in to access your personalized dashboard.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                  <Box
                      sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                      }}
                  >
                      <MuiLink
                          component={Link}
                          to="/forgot-password"
                          sx={{
                              fontFamily: "Poppins, serif",
                              fontWeight: "600",
                              color: "#371edc",
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
                      Log In
                  </Button>
              </form>
              <Typography
                  align="center"
                  sx={{
                      marginTop: "20px",
                      fontFamily: "Poppins, serif",
                      fontWeight: "500",
                  }}
              >
                  Don’t have an account?{" "}
                  <MuiLink
                      component={Link}
                      to="/register"
                      sx={{
                          fontFamily: "Poppins, serif",
                          fontWeight: "600",
                          color: "#371edc",
                          textDecoration: "none",
                      }}
                  >
                      Sign Up
                  </MuiLink>
              </Typography>
          </Box>
      </Grid>
  );
};

export default Login;
