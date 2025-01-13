import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    AiOutlineCamera,
    AiOutlineHome,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineUser
} from "react-icons/ai";

  const employeeData = {
    id: "EMP00190",
    name: "Mark",
    email: "mark@johnsonera.com",
    password: "passwordAlice123",
    needsPasswordChange: false,
    role: "employee",
    designation: "HR Specialist",
    companyId: "67890",
    joiningDate: "2021-06-15T00:00:00.000Z",
    gender: "female",
    profileImageUrl: "https://example.com/profile-images/alicejohnson.jpg",
    address: "789 Pine Street, Gotham City, USA",
    contactNumber: "+11234567890",
    isDeleted: false,
    performanceRating: "Exceeds Expectations",
    department: "Human Resources",
    supervisor: "John Doe",
    skills: ["Conflict Resolution", "Employee Engagement", "HR Analytics"],
  };
  
  const EditEmployee = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm();
  
    const [fileName, setFileName] = useState(employeeData.profileImageUrl || "Upload Profile Image");
  
    useEffect(() => {
      // Pre-fill form fields with existing employee data
      setValue("name", employeeData.name);
      setValue("email", employeeData.email);
      setValue("address", employeeData.address);
      setValue("contactNumber", employeeData.contactNumber);
      setValue("profileImage", employeeData.profileImageUrl);
      setValue("role", employeeData.role);
      setValue("designation", employeeData.designation);
      setValue("department", employeeData.department);
      setValue("supervisor", employeeData.supervisor);
      setValue("performanceRating", employeeData.performanceRating);
      setValue("joiningDate", employeeData.joiningDate.split("T")[0]);
      setValue("gender", employeeData.gender);
      setValue("skills", employeeData.skills.join(", "));
    }, [employeeData, setValue]);
  
    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
      }
    };
  
    const onSubmit = (data) => {
      data.skills = data.skills.split(",").map((skill) => skill.trim());
      console.log("Employee Updated:", data);
    };
  
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: "20px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "30px",
              "@media (max-width: 600px)": {
                padding: "20px",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, serif",
                fontWeight: 700,
                color: "var(--primary-color)",
                marginBottom: "10px",
                fontSize: "1.5rem",
                "@media (max-width: 600px)": {
                  fontSize: "1.25rem",
                },
              }}
              variant="h4"
              align="center"
            >
              Edit Employee Details
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins, serif",
                fontWeight: 500,
                color: "#666666",
                marginBottom: "30px",
                textAlign: "center",
                fontSize: "1rem",
                "@media (max-width: 600px)": {
                  fontSize: "0.875rem",
                },
              }}
            >
              Update the employee information below.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AiOutlineUser size={20} color="var(--primary-color)" />
                        </InputAdornment>
                      ),
                    }}
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AiOutlineMail size={20} color="var(--primary-color)" />
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
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AiOutlineHome size={20} color="var(--primary-color)" />
                        </InputAdornment>
                      ),
                    }}
                    {...register("address", { required: "Address is required" })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AiOutlinePhone size={20} color="var(--primary-color)" />
                        </InputAdornment>
                      ),
                    }}
                    {...register("contactNumber", {
                      required: "Contact Number is required",
                      pattern: {
                        value: /^[+]?\d{10,15}$/,
                        message: "Invalid contact number",
                      },
                    })}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    {...register("role", { required: "Role is required" })}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Designation"
                    variant="outlined"
                    fullWidth
                    {...register("designation", { required: "Designation is required" })}
                    error={!!errors.designation}
                    helperText={errors.designation?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    fullWidth
                    {...register("department", { required: "Department is required" })}
                    error={!!errors.department}
                    helperText={errors.department?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Supervisor"
                    variant="outlined"
                    fullWidth
                    {...register("supervisor", { required: "Supervisor is required" })}
                    error={!!errors.supervisor}
                    helperText={errors.supervisor?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Performance Rating"
                    variant="outlined"
                    fullWidth
                    {...register("performanceRating", { required: "Performance Rating is required" })}
                    error={!!errors.performanceRating}
                    helperText={errors.performanceRating?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Joining Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register("joiningDate", { required: "Joining Date is required" })}
                    error={!!errors.joiningDate}
                    helperText={errors.joiningDate?.message}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Gender"
                    select
                    variant="outlined"
                    fullWidth
                    {...register("gender", { required: "Gender is required" })}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
  
                <Grid item xs={12} sm={6}> 
                  <TextField
                    label="Skills"
                    variant="outlined"
                    fullWidth
                    placeholder="Comma-separated values"
                    {...register("skills", { required: "Skills are required" })}
                    error={!!errors.skills}
                    helperText={errors.skills?.message}
                  />
                </Grid>
  
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                      flexDirection: "column",
                      "@media (min-width: 600px)": {
                        flexDirection: "row",
                      },
                    }}
                  >
                    <IconButton
                      component="label"
                      sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                        "@media (min-width: 600px)": {
                          marginBottom: "0",
                        },
                      }}
                    >
                      <AiOutlineCamera size={24} color="var(--primary-color)" />
                      <input
                        hidden
                        type="file"
                        onChange={onFileChange}
                        {...register("profileImage")}
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
                        textAlign: "center",
                        "@media (min-width: 600px)": {
                          textAlign: "left",
                        },
                      }}
                    >
                      {fileName}
                    </Typography>
                  </Box>
                </Grid>
  
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "var(--primary-color)",
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
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Grid>
    );
  };
  
  export default EditEmployee;
  