import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlay, FaStop, FaTrash, FaUser } from "react-icons/fa";
import {
  useDeleteProgressMutation,
  useGetProgressByEmployeeQuery,
  useStartProgressMutation,
  useStopProgressMutation,
} from "../../../../features/work progress/workProgressApi";
import { AuthContext } from "../../../../providers/AuthProviders";

const StyledCard = styled(Card)({
  background: "var(--bg-dark-blue-color)",
  color : '#fff',
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});


const FilterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "var(--primary-color)",
  color: "white",
  fontWeight: "600",
  padding: "5px 15px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "var(--bg-dark-blue-color)",
  },
  "&.active": {
    backgroundColor: "var(--bg-dark-blue-color)",
  },
}));

const WorkProgress = () => {
  const { user } = useContext(AuthContext);
  const [filterStatus, setFilterStatus] = useState("all");

  const [startProgress, { isLoading: progressStartLoading }] =
    useStartProgressMutation();
  const [stopProgress, { isLoading: progressStopLoading }] =
    useStopProgressMutation();
  const [deleteProgress, { isSuccess: progressDeleteSuccess }] =
    useDeleteProgressMutation();

  const { data } = useGetProgressByEmployeeQuery(user?.id , {pollingInterval : 2000});
  const progressData = data?.data;

  const handleStart = async () => {
    const newProgress = {
      employeeId: user?.id,
      companyId: user?.companyId,
    };

    try {
      const response = await startProgress(newProgress).unwrap();
      console.log(response);
      toast(response?.message, { id: "start-progress" });
    } catch (error) {
      console.error("Error starting progress:", error);
    }
  };

  const handleStop = async () => {
    const stopData = {
      employeeId: user?.id,
    };
    console.log(stopData);

    try {
      const response = await stopProgress(stopData).unwrap();
      toast(response?.message, { id: "stop-progress" });
    } catch (error) {
      console.error("Error stopping progress:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this progress?")) {
      deleteProgress(id);
    }
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredProgress = progressData?.filter((progress) =>
    filterStatus === "all"
      ? true
      : progress.trackerStatus.toLowerCase() === filterStatus
  );

  useEffect(() => {
    if (progressDeleteSuccess) {
      toast.success("Deleted Successfully", { id: "delete-progress" });
    }
  }, [progressDeleteSuccess]);

  return (
    <Box sx={{ padding: "1rem", borderRadius: "10px" }}>
      <Typography
        sx={{
          fontWeight: 700,
          backgroundColor: "var(--bg-color)",
          border: "1px solid var(--primary-color)",
          color: "#fff",
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
        variant="h5"
        align="left"
      >
        Work Progress
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
          marginBottom: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          {["all", "running", "stopped"].map((status) => (
            <FilterButton
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={filterStatus === status ? "active" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </FilterButton>
          ))}
        </Box>
        <Tooltip title="Start Work Progress">
          <IconButton
            onClick={handleStart}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "5px",
            
              "&:hover": { backgroundColor: "var(--bg-dark-blue-color)" },
            }}
          >
            <FaPlay />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {filteredProgress?.length > 0 ? (
          filteredProgress.map((progress) => (
            <Grid item xs={12} sm={6} md={4} key={progress._id}>
              <StyledCard>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#ffffff",
                        color: "var(--primary-color)",
                        width: "60px",
                        height: "60px",
                        fontSize: "1.5rem",
                      }}
                    >
                      <FaUser />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Employee Progress
                    </Typography>
                  </Box>
                  <Typography>Employee ID: {progress.employeeId}</Typography>
                  <Typography>Company ID: {progress.companyId}</Typography>
                  {progress?.totalWorkHours && (
                    <Typography>Hours: {progress.totalWorkHours}</Typography>
                  )}
                  <Typography>
                    Start Time:{" "}
                    {new Date(progress.startTime).toLocaleTimeString()}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        progress.trackerStatus === "Running"
                          ? "#4caf50"
                          : "red",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Status: {progress.trackerStatus}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  {progress.trackerStatus === "Running" && (
                    <Tooltip title="Stop Work Progress">
                      <IconButton
                        onClick={handleStop}
                        sx={{
                          color: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.8)",
                          },
                        }}
                      >
                        <FaStop />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete Work Progress">
                    <IconButton
                      onClick={() => handleDelete(progress._id)}
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.8)",
                        },
                      }}
                    >
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              marginTop: "20px",
              color: "#666666",
              fontWeight: 500,
              textAlign: "center",
              width: "100%",
            }}
          >
            No work progress found for the selected filter.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default WorkProgress;
