import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteLeaveMutation,
  useGetAllLeavesByEmployeeQuery,
} from "../../../../../features/leave/leaveApi";
import { AuthContext } from "../../../../../providers/AuthProviders";
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: "var(--bg-grey-color)",
  }));
  
  const ActionBar = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 0rem",
    borderRadius: "8px",
    margin: "1rem 0rem",
    flexWrap: "wrap",
    gap: "10px",
  });
  
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
  
  const AllLeaves = () => {
    const isMobile = useMediaQuery("(max-width:768px)");
    const [selectedAll, setSelectedAll] = useState(false);
    const [selected, setSelected] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const { user } = useContext(AuthContext);
    const { data } = useGetAllLeavesByEmployeeQuery(user?.id);
  
    const [deleteLeave, { isSuccess, isLoading }] = useDeleteLeaveMutation();
  
    const leaves = data?.data || [];
  
    const handleStatusFilter = (status) => {
      setFilterStatus(status);
    };
  
    const filteredLeaves = leaves.filter((leave) =>
      filterStatus === "all" ? true : leave.status.toLowerCase() === filterStatus
    );
  
    const handleSelectAll = () => {
      if (selectedAll) {
        setSelected([]);
      } else {
        setSelected(filteredLeaves.map((leave) => leave._id));
      }
      setSelectedAll(!selectedAll);
    };
  
    const handleSelect = (id) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((item) => item !== id));
      } else {
        setSelected([...selected, id]);
      }
    };
  
    const handleDelete = (id) => {
      const deleteConfirm = window.confirm("Do you want to delete this leave?");
      if (deleteConfirm) {
        deleteLeave(id);
      }
    };
  
    useEffect(() => {
      if (isSuccess) {
        toast.success("Deleted Successfully", { id: "delete-leave" });
      }
      if (isLoading) {
        toast.loading("Loading", { id: "delete-leave" });
      }
    }, [isSuccess, isLoading]);
  
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
         Leaves
        </Typography>
  
        <ActionBar>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FilterButton
              onClick={() => handleStatusFilter("all")}
              className={filterStatus === "all" ? "active" : ""}
            >
              All
            </FilterButton>
            <FilterButton
              onClick={() => handleStatusFilter("pending")}
              className={filterStatus === "pending" ? "active" : ""}
            >
              Pending
            </FilterButton>
            <FilterButton
              onClick={() => handleStatusFilter("accepted")}
              className={filterStatus === "accepted" ? "active" : ""}
            >
              Accepted
            </FilterButton>
            <FilterButton
              onClick={() => handleStatusFilter("rejected")}
              className={filterStatus === "rejected" ? "active" : ""}
            >
              Rejected
            </FilterButton>
          </Box>
          <Tooltip title="Apply for Leave">
            <Link to={`/dashboard/leave/apply`}>
              <IconButton
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#5948CE",
                  },
                }}
              >
                <FaPlus />
              </IconButton>
            </Link>
          </Tooltip>
        </ActionBar>
  
        {filteredLeaves.length > 0 ? (
          <TableContainer
            sx={{
              border: "1px solid var(--primary-color)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Checkbox checked={selectedAll} onChange={handleSelectAll} />
                  </StyledTableCell>
                  <StyledTableCell>Employee ID</StyledTableCell>
                  {!isMobile && <StyledTableCell>Leave Type</StyledTableCell>}
                  <StyledTableCell>Total Days</StyledTableCell>
                  {!isMobile && <StyledTableCell>Status</StyledTableCell>}
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeaves.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(leave._id)}
                        onChange={() => handleSelect(leave._id)}
                      />
                    </TableCell>
                    <TableCell>{leave.employeeId}</TableCell>
                    {!isMobile && <TableCell>{leave.leaveType}</TableCell>}
                    <TableCell>{leave.totalDays}</TableCell>
                    {!isMobile && <TableCell>{leave.status}</TableCell>}
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(leave._id)}
                          sx={{
                            color: "var(--accent-color)",
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        >
                          <FaTrashAlt />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            sx={{
              marginTop: "20px",
              color: "#666666",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            No leaves found for the selected filter.
          </Typography>
        )}
      </Box>
    );
  };
  
  export default AllLeaves;
  