import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineCamera,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { FaGenderless } from "react-icons/fa"; // Gender icon
import { useAddEmployeeMutation } from "../../../../features/employee/employeeApi";
import { AuthContext } from "../../../../providers/AuthProviders";

const EmployeeRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState("Upload Profile Image");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const { user } = useContext(AuthContext); // Use AuthContext

  // Add work task API
  const [addEmployee, { isLoading, isSuccess }] = useAddEmployeeMutation();

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
      employee: {
        id: "EMP" + Math.floor(10000 + Math.random() * 90000), // Generate a random ID
        name: data.name,
        email: data.email,
        password: data.password,
        needsPasswordChange: false,
        role: "employee",
        designation: data.designation,
        companyId: user?.id,
        joiningDate: new Date(data.joiningDate).toISOString(),
        gender: data.gender,
        profileImageUrl: profileImageUrl || "https://default.com/avatar.png",
        address: data.address,
        contactNumber: data.contactNumber,
        isDeleted: false,
      },
    };
    addEmployee(formattedData);
    console.log("Formatted Employee Data:", formattedData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Added Employee Successfully", { id: "employee" });
    }
    if (isLoading) {
      toast.loading("Loading", { id: "employee" });
    }
  }, [isSuccess, isLoading]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        borderRadius: "10px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            textAlign: "center",
            color: "#371edc",
            marginBottom: "20px",
          }}
        >
          Employee Registration
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Fill in the details to add a new employee to your team.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Gender"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaGenderless size={20} color="#371edc" />
                    </InputAdornment>
                  ),
                }}
                {...register("gender", { required: "Gender is required" })}
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
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
            sx={{
              backgroundColor: "#371edc",
              color: "#ffffff",
              fontWeight: "600",
              textTransform: "none",
              padding: "15px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#2c1bb6",
              },
            }}
          >
            Register Employee
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EmployeeRegister;
