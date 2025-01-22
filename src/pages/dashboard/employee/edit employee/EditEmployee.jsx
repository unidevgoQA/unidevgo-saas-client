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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlineIdcard,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../../../features/employee/employeeApi";

const iconMapping = {
  name: <AiOutlineUser size={20} color="var(--primary-color)" />,
  email: <AiOutlineMail size={20} color="var(--primary-color)" />,
  address: <AiOutlineHome size={20} color="var(--primary-color)" />,
  contactNumber: <AiOutlinePhone size={20} color="var(--primary-color)" />,
  role: <AiOutlineSetting size={20} color="var(--primary-color)" />,
  designation: <AiOutlineIdcard size={20} color="var(--primary-color)" />,
  joiningDate: <AiOutlineCalendar size={20} color="var(--primary-color)" />,
  gender: <AiOutlineUser size={20} color="var(--primary-color)" />,
};

const EditEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { id } = useParams();
  const { data } = useGetSingleEmployeeQuery(id);

  // Update API
  const [
    updateEmployee,
    { isLoading: employeeUpdateLoading, isSuccess: employeeUpdateSuccess },
  ] = useUpdateEmployeeMutation();

  const navigate = useNavigate();

  const employeeData = data?.data;

  useEffect(() => {
    if (employeeData) {
      setValue("name", employeeData.name || "");
      setValue("email", employeeData.email || "");
      setValue("address", employeeData.address || "");
      setValue("contactNumber", employeeData.contactNumber || "");
      setValue("role", employeeData.role || "");
      setValue("designation", employeeData.designation || "");
      setValue("joiningDate", employeeData.joiningDate?.split("T")[0] || "");
      setValue("gender", employeeData.gender || ""); // Ensure gender is set
    }
  }, [employeeData, setValue]);

  const onSubmit = (data) => {
    console.log("Employee Updated:", data);
    updateEmployee({ id, data });
  };

  useEffect(() => {
    if (employeeUpdateSuccess) {
      toast.success("Update Successfully", { id: "employee-update" });
      navigate(-1);
    }
    if (employeeUpdateLoading) {
      toast.loading("Loading", { id: "employee-update" });
    }
  }, [employeeUpdateSuccess, employeeUpdateLoading]);

  const renderTextField = (name, label, type = "text", select = false) => (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      select={select}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconMapping[name]}</InputAdornment>
        ),
      }}
      {...register(name, {
        required: `${label} is required`,
        ...(name === "email" && {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }),
        ...(name === "contactNumber" && {
          pattern: {
            value: /^[+]?\d{10,15}$/,
            message: "Invalid contact number",
          },
        }),
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      defaultValue={watch(name) || employeeData?.[name] || ""}
    >
      {select &&
        ["male", "female", "other"].map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
    </TextField>
  );

  return (
    <Box
      sx={{
        width: "100%",
        padding: "50px 20px",
        borderRadius: "5px",
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            "@media (max-width: 600px)": {
              padding: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "var(--primary-color)",
              textAlign: "left",
              marginBottom: "30px",
              fontSize: "1.75rem",
              "@media (max-width: 600px)": {
                fontSize: "1.25rem",
              },
            }}
          >
            Edit Employee Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {renderTextField("name", "Name")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("email", "Email Address")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("address", "Address")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("contactNumber", "Contact Number")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("role", "Role")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("designation", "Designation")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("joiningDate", "Joining Date", "date")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("gender", "Gender", "text", true)}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    fontFamily: "Poppins, serif",
                    fontWeight: "600",
                    textTransform: "none",
                    padding: "15px",
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
    </Box>
  );
};

export default EditEmployee;
