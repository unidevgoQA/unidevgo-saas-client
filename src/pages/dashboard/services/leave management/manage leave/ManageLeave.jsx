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
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaHospital,
  FaPlane,
  FaTimes,
  FaTrashAlt,
  FaUserAlt,
} from "react-icons/fa";
import {
  useDeleteLeaveMutation,
  useGetAllLeavesQuery,
  useUpdateLeaveStatusMutation,
} from "../../../../../features/leave/leaveApi";

const StyledCard = styled(Card)({
  background: "var(--bg-dark-blue-color)",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const IconText = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
  "& svg": {
    color: "white",
  },
});

const leaveTypeIcons = {
  vacation: <FaPlane />,
  sick: <FaHospital />,
  personal: <FaUserAlt />,
};

const ManageLeave = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  const { data } = useGetAllLeavesQuery();
  const leaves = data?.data || [];

  const [deleteLeave, { isSuccess, isLoading }] = useDeleteLeaveMutation();
  const [updateLeaveStatus, { isSuccess: leaveUpdateSuccess }] =
    useUpdateLeaveStatusMutation();

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredLeaves = leaves.filter((leave) =>
    filterStatus === "all" ? true : leave.status.toLowerCase() === filterStatus
  );

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this leave?")) {
      deleteLeave(id);
    }
  };

  const handleAccept = (leaveId) => {
    updateLeaveStatus({ id: leaveId, data: { status: "Accepted" } });
  };

  const handleReject = (leaveId) => {
    updateLeaveStatus({ id: leaveId, data: { status: "Rejected" } });
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete Successfully", {
        style: {
          background: "var(--primary-color)",
          color: "#ffffff",
          borderRadius: "5px",
          padding: "10px",
        },
      });
    }
    if (isLoading) {
      toast.loading("Loading...");
    }
  }, [isSuccess, isLoading]);

  
  useEffect(() => {
    if (leaveUpdateSuccess) {
      toast.success("Status Updated", {
        style: {
          background: "var(--primary-color)",
          color: "#ffffff",
          borderRadius: "5px",
          padding: "10px",
        },
      });
    }
  }, [leaveUpdateSuccess]);

  return (
    <Box sx={{ padding: "1rem" }}>
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
        Manage Leave
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => handleStatusFilter("all")}
            sx={{
              textTransform: "none",
              backgroundColor:
                filterStatus === "all"
                  ? "var(--bg-dark-blue-color)"
                  : "var(--primary-color)",
              color: "white",
              fontWeight: "600",
              padding: "5px 15px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--bg-dark-blue-color)",
              },
            }}
          >
            All
          </Button>
          <Button
            onClick={() => handleStatusFilter("pending")}
            sx={{
              textTransform: "none",
              backgroundColor:
                filterStatus === "pending"
                  ? "var(--bg-dark-blue-color)"
                  : "var(--primary-color)",
              color: "white",
              fontWeight: "600",
              padding: "5px 15px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--bg-dark-blue-color)",
              },
            }}
          >
            Pending
          </Button>
          <Button
            onClick={() => handleStatusFilter("accepted")}
            sx={{
              textTransform: "none",
              backgroundColor:
                filterStatus === "accepted"
                  ? "var(--bg-dark-blue-color)"
                  : "var(--primary-color)",
              color: "white",
              fontWeight: "600",
              padding: "5px 15px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--bg-dark-blue-color)",
              },
            }}
          >
            Accepted
          </Button>
          <Button
            onClick={() => handleStatusFilter("rejected")}
            sx={{
              textTransform: "none",
              backgroundColor:
                filterStatus === "rejected"
                  ? "var(--bg-dark-blue-color)"
                  : "var(--primary-color)",
              color: "white",
              fontWeight: "600",
              padding: "5px 15px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "var(--bg-dark-blue-color)",
              },
            }}
          >
            Rejected
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {filteredLeaves.map((leave) => (
          <Grid item xs={12} sm={6} md={4} key={leave._id}>
            <StyledCard>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "var(--primary-color)",
                      width: "50px",
                      height: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    {leave.employeeId.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ID : {leave.employeeId}
                  </Typography>
                </Box>
                <IconText>
                  <Typography variant="body2">
                    Leave Type : {leave.leaveType}
                  </Typography>
                </IconText>
                <IconText>
                  <Typography variant="body2">
                    Total Days: {leave.totalDays}
                  </Typography>
                </IconText>
                <IconText>
                  <Typography variant="body2">
                    Status: {leave.status}
                  </Typography>
                </IconText>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Checkbox
                  checked={selected.includes(leave._id)}
                  onChange={() => handleSelect(leave._id)}
                  sx={{ color: "white" }}
                />
                <Box>
                  <Tooltip title="Accept">
                    <IconButton
                      onClick={() => handleAccept(leave._id)}
                      style={{
                        color: "white",
                        backgroundColor: "green",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <FaCheck />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reject">
                    <IconButton
                      onClick={() => handleReject(leave._id)}
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <FaTimes />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(leave._id)}
                      style={{
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                      }}
                    >
                      <FaTrashAlt />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageLeave;
