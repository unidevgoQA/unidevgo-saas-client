import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { loginUser, loading, message } = useContext(AuthContext);

  const [role, setRole] = useState(null);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = async (data) => {
    const result = await loginUser(data.email, data.password, role);

    if (result.success) {
      navigate("/dashboard");
    } else {
      alert(result.message);
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
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
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
            fontWeight: 500,
            color: "#666666",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Log in to access your personalized dashboard.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              background: "#371edc",
              borderRadius: "5px",
              color: "#fff",
              padding: "8px 0px",
              marginBottom: "10px",
            }}
          >
            Select Your Role
          </Typography>
          <RadioGroup
            value={role}
            required={true}
            onChange={handleRoleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Employee"
            />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#371edc",
              color: "#ffffff",
              fontWeight: "600",
              textTransform: "none",
              padding: "10px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#2c1bb6",
              },
            }}
            disabled={loading || !role || !!errors.email || !!errors.password} // Disable if no role, email, or password is invalid
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <Typography
          sx={{
            fontWeight: 500,
            color: "#666666",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Button
            sx={{
              textTransform: "none",
              fontWeight: "600",
              color: "#371edc",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register here
          </Button>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Login;
