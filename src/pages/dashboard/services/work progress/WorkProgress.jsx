import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { FaBuilding, FaClock, FaPlay, FaStop, FaUser } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #371edc, #170b68)",
  color: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const FilterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "var(--primary-color)",
  color: "white",
  fontWeight: "600",
  padding: "5px 15px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#5948CE",
  },
  "&.active": {
    backgroundColor: "#5948CE",
  },
}));

const IconText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
}));

const WorkProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState([]);

  const handleStart = () => {
    const newProgress = {
      employeeId: "EMP00193",
      companyId: "56789",
      startTime: new Date().toISOString(),
      trackerStatus: "Running",
      _id: Math.random().toString(36).substr(2, 9),
    };

    setProgressData([...progressData, newProgress]);
  };

  const handleStop = (id) => {
    setProgressData(
      progressData.map((progress) =>
        progress._id === id
          ? { ...progress, trackerStatus: "Stopped" }
          : progress
      )
    );
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredProgress = progressData.filter((progress) =>
    filterStatus === "all"
      ? true
      : progress.trackerStatus.toLowerCase() === filterStatus
  );

  return (
    <Box sx={{ padding: "1rem", borderRadius: "10px" }}>
      <Typography
        sx={{
          fontWeight: 700,
          background: "linear-gradient(#371edc, #170b68)",
          color: "#fff",
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
        variant="h4"
      >
        Work Progress
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0rem",
          marginBottom: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <FilterButton
            onClick={() => handleStatusFilter("all")}
            className={filterStatus === "all" ? "active" : ""}
          >
            All
          </FilterButton>
          <FilterButton
            onClick={() => handleStatusFilter("running")}
            className={filterStatus === "running" ? "active" : ""}
          >
            Running
          </FilterButton>
          <FilterButton
            onClick={() => handleStatusFilter("stopped")}
            className={filterStatus === "stopped" ? "active" : ""}
          >
            Stopped
          </FilterButton>
        </Box>
        <Tooltip title="Start Work Progress">
          <IconButton
            onClick={handleStart}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#5948CE",
              },
            }}
          >
            <FaPlay />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {filteredProgress.length > 0 ? (
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
                        color: "#371edc",
                        width: "60px",
                        height: "60px",
                        fontSize: "1.5rem",
                        borderRadius: "10px",
                      }}
                    >
                      <FaUser />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Employee Progress
                    </Typography>
                  </Box>
                  <IconText>
                    <FaUser />
                    <Typography>Employee ID: {progress.employeeId}</Typography>
                  </IconText>
                  <IconText>
                    <FaBuilding />
                    <Typography>Company ID: {progress.companyId}</Typography>
                  </IconText>
                  <IconText>
                    <FaClock />
                    <Typography>
                      Start Time:{" "}
                      {new Date(progress.startTime).toLocaleTimeString()}
                    </Typography>
                  </IconText>
                  <Typography
                    sx={{
                      color:
                        progress.trackerStatus === "Running" ? "#4caf50" : "red",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    Status: {progress.trackerStatus}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Checkbox
                    checked={selected.includes(progress._id)}
                    onChange={() => handleSelect(progress._id)}
                    sx={{ color: "white" }}
                  />
                  {progress.trackerStatus === "Running" && (
                    <Tooltip title="Stop Work Progress">
                      <IconButton
                        onClick={() => handleStop(progress._id)}
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
