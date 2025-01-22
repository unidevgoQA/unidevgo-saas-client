import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineCalendar,
  AiOutlineFieldTime,
  AiOutlineGlobal,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineTeam,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../../features/company/companyApi";

const iconMapping = {
  name: <AiOutlineShop size={20} color="var(--primary-color)" />,
  email: <AiOutlineMail size={20} color="var(--primary-color)" />,
  address: <AiOutlineHome size={20} color="var(--primary-color)" />,
  contactNumber: <AiOutlinePhone size={20} color="var(--primary-color)" />,
  subscription: <AiOutlineInfoCircle size={20} color="var(--primary-color)" />,
  established: <AiOutlineCalendar size={20} color="var(--primary-color)" />,
  industry: <AiOutlineInfoCircle size={20} color="var(--primary-color)" />,
  employees: <AiOutlineTeam size={20} color="var(--primary-color)" />,
  website: <AiOutlineGlobal size={20} color="var(--primary-color)" />,
  description: <AiOutlineFieldTime size={20} color="var(--primary-color)" />,
  mission: <AiOutlineFieldTime size={20} color="var(--primary-color)" />,
};

const EditCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { id } = useParams();

  const { data } = useGetSingleCompanyQuery(id);
  const companyData = data?.data;

  // Update API
  const [
    updateCompany,
    { isLoading: companyUpdateLoading, isSuccess: companyUpdateSuccess },
  ] = useUpdateCompanyMutation();

  const navigate = useNavigate();

  // Simulate loading and data fetch
  const [loading, setLoading] = useState(true);

  const [fileName, setFileName] = useState(
    companyData?.profileImageUrl || "Upload Profile Image"
  );

  useEffect(() => {
    if (companyData) {
      Object.keys(companyData).forEach((key) => {
        setValue(key, companyData[key]);
      });
      setLoading(false);
    }
  }, [companyData, setValue]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data) => {
    console.log("Company Updated:", data);
    updateCompany({ id, data });
  };

  useEffect(() => {
    if (companyUpdateSuccess) {
      toast.success("Update Successfully", { id: "company-update" });
      navigate(-1);
    }
    if (companyUpdateLoading) {
      toast.loading("Loading", { id: "company-update" });
    }
  }, [companyUpdateSuccess, companyUpdateLoading]);

  const renderTextField = (name, label, type = "text", multiline = false) => (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      multiline={multiline}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconMapping[name]}</InputAdornment>
        ),
      }}
      {...register(name, {
        required: `${label} is required`,
        ...(name === "email" && {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }),
        ...(name === "website" && {
          pattern: {
            value: /^https?:\/\/[a-zA-Z0-9._\-]+(\.[a-zA-Z]{2,3})(\/[^\s]*)?$/i,
            message: "Invalid website URL",
          },
        }),
        ...(name === "contactNumber" && {
          pattern: {
            value: /^[0-9]+$/i,
            message: "Invalid contact number",
          },
        }),
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      defaultValue={companyData[name]}
    />
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="var(--primary-color)" size={50} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "5px",
        padding: "50px 10px",
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
              fontFamily: "Poppins, serif",
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
            Edit Company Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {renderTextField("name", "Company Name")}
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
                {renderTextField("subscription", "Subscription Plan")}
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                {renderTextField("established", "Established Year")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("industry", "Industry")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTextField("employees", "Number of Employees", "number")}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("website", "Website URL")}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("description", "Company Description", "text", true)}
              </Grid>
              <Grid item xs={12}>
                {renderTextField("mission", "Mission Statement", "text", true)}
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
              </Grid> */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    color: "#ffffff",
                    fontFamily: "Poppins, serif",
                    fontWeight: 600,
                    padding: "12px 40px",
                    borderRadius: "8px",
                    width: "100%",
                    "@media (min-width: 600px)": {
                      width: "auto",
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

export default EditCompany;
