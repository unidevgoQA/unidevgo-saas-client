import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AiOutlineClockCircle,
  AiOutlineFieldTime,
  AiOutlineNumber,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useApplyLeaveMutation } from "../../../../../features/leave/leaveApi";
import { AuthContext } from "../../../../../providers/AuthProviders";

const ApplyLeave = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Add work task API
  const [applyLeave, { isSuccess }] = useApplyLeaveMutation();

  const onSubmit = (data) => {
    const formattedData = {
      leave: {
        employeeId: user?.id,
        companyId: user?.companyId,
        leaveApply: new Date().toISOString(),
        leaveFrom: new Date(data.leaveFrom).toISOString(),
        leaveTo: new Date(data.leaveTo).toISOString(),
        leaveType: data.leaveType,
        totalDays: parseInt(data.totalDays, 10),
        status: "Pending",
        isDeleted: false,
      },
    };

    applyLeave(formattedData);
    navigate('/dashboard/leave');
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Apply Successfully", {
        style: {
          background: "var(--primary-color)", 
          color: "#ffffff", 
          borderRadius: "5px", 
          padding: "10px", 
        },
      });
    }
  }, [isSuccess]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ padding: "50px 20px", backgroundColor: "var(--bg-color)" }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "var(--text-white-color)",
            borderRadius: "5px",
            padding: "30px",
            border: "1px solid var(--primary-color)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            align="left"
            sx={{
              fontWeight: 700,
              color: "var(--primary-color)",
              marginBottom: "10px",
            }}
          >
            Apply Leave
          </Typography>
          <Typography
            align="left"
            sx={{
              fontWeight: 500,
              color: "var(--primary-color)",
              marginBottom: "30px",
            }}
          >
            Fill in the details to apply for leave.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Leave From */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Leave From"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineClockCircle size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("leaveFrom", {
                    required: "Leave From Date is required",
                  })}
                  error={!!errors.leaveFrom}
                  helperText={errors.leaveFrom?.message}
                 
                />
              </Grid>

              {/* Leave To */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Leave To"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineClockCircle size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("leaveTo", {
                    required: "Leave To Date is required",
                  })}
                  error={!!errors.leaveTo}
                  helperText={errors.leaveTo?.message}
                />
              </Grid>

              {/* Total Days */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Total Days"
                  variant="outlined"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineNumber size={20} color="var(--primary-color)" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("totalDays", {
                    required: "Total Days is required",
                  })}
                  error={!!errors.totalDays}
                  helperText={errors.totalDays?.message}
                />
              </Grid>

              {/* Leave Type */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Leave Type"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineFieldTime size={20} color="var(--primary-color))" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("leaveType", {
                    required: "Leave Type is required",
                  })}
                  error={!!errors.leaveType}
                  helperText={errors.leaveType?.message}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "var(--primary-color)",
                color: "var(--text-white-color)",
                fontFamily: "Poppins, serif",
                fontWeight: "600",
                textTransform: "none",
                padding: "10px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "var(--bg-dark-blue-color)",
                },
              }}
            >
              Submit Leave Application
            </Button>
          </form>
        </Box>
      </Container>
    </Grid>
  );
};

export default ApplyLeave;
