import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { FaGenderless } from "react-icons/fa";
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
  const { user } = useContext(AuthContext);

  const [addEmployee] = useAddEmployeeMutation();

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
        id: "EMP" + Math.floor(10000 + Math.random() * 90000),
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
    toast.success("Employee Registered Successfully");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="left"
      sx={{
        background: "var(--bg-color)",
        padding: "50px 20px",
      }}
    >
      <Container maxWidth="xl">
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
              marginBottom: "40px",
              textAlign: "left",
            }}
            variant="h4"
          >
            Register Employee
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {[
                {
                  name: "name",
                  label: "Full Name",
                  icon: <AiOutlineUser size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: { required: "Full Name is required" },
                },
                {
                  name: "email",
                  label: "Email Address",
                  icon: <AiOutlineMail size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  },
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  icon: <AiOutlineLock size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  },
                },
                {
                  name: "designation",
                  label: "Designation",
                  icon: <AiOutlineUser size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: { required: "Designation is required" },
                },
                {
                  name: "joiningDate",
                  label: "Joining Date",
                  type: "date",
                  validation: { required: "Joining Date is required" },
                },
                {
                  name: "contactNumber",
                  label: "Contact Number",
                  icon: <AiOutlinePhone size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: {
                    required: "Contact Number is required",
                    pattern: {
                      value: /^[+]?[0-9]+$/,
                      message: "Invalid contact number",
                    },
                  },
                },
                {
                  name: "address",
                  label: "Address",
                  icon: <AiOutlineHome size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: { required: "Address is required" },
                },
                {
                  name: "gender",
                  label: "Gender",
                  select: true,
                  options: ["Male", "Female", "Other"],
                  icon: <FaGenderless size={20} style={{ color: "var(--primary-color)" }} />,
                  validation: { required: "Gender is required" },
                },
              ].map(
                (
                  { name, label, type = "text", select, options, icon, validation },
                  index
                ) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      fullWidth
                      label={label}
                      variant="outlined"
                      type={type}
                      select={select}
                      InputProps={
                        icon
                          ? {
                              startAdornment: (
                                <InputAdornment position="start">
                                  {icon}
                                </InputAdornment>
                              ),
                            
                            }
                          : undefined
                      }
                      InputLabelProps={type === "date" ? { shrink: true } : undefined}
                      {...register(name, validation)}
                      error={!!errors[name]}
                      helperText={errors[name]?.message}
                    >
                      {select &&
                        options.map((option, idx) => (
                          <MenuItem key={idx} value={option.toLowerCase()}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                )
              )}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "#ffffff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                textTransform: "none",
                padding: "12px",
                borderRadius: "5px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "var(--bg-dark-blue-color)",
                },
              }}
            >
              Register Employee
            </Button>
          </form>
        </Box>
      </Container>
    </Grid>
  );
};

export default EmployeeRegister;
