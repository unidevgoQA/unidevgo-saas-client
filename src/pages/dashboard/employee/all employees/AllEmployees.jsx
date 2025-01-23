import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaEnvelope,
  FaGenderless,
  FaHome,
  FaPhone,
  FaPlus,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../../../features/employee/employeeApi";
import { AuthContext } from "../../../../providers/AuthProviders";

const StyledSearchBox = styled(TextField)({
  marginBottom: "1.5rem",
  width: "100%",
  maxWidth: "495px",
  background: "var(--bg-dark-blue-color)",
  color: "#fff",
  borderRadius: "5px",
  padding: "10px 15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.27)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      border: "none",
    },
    "& input": {
      color: "#fff",
    },
    "& input::placeholder": {
      color: "#fff",
    },
  },
});

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

const AllEmployees = () => {
  const { user } = useContext(AuthContext);
  const { data: employeesDataById, isLoading } = useGetAllEmployeesQuery(
    user?.id
  );

  const [deleteEmployee, { isSuccess, isLoading: deleteEmployeeLoading }] =
    useDeleteEmployeeMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  const employees = employeesDataById?.data || [];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery)
  );

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDelete = (id) => {
    const deleteConfirm = window.confirm("Want to delete?");
    if (deleteConfirm) {
      deleteEmployee(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully", { id: "employee" });
    }
    if (deleteEmployeeLoading) {
      toast.loading("Loading", { id: "employee" });
    }
  }, [isSuccess, deleteEmployeeLoading]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress color="var(--text-white-color)" size={50} />
      </Box>
    );
  }

  if (employees.length === 0) {
    return <Typography>No employees found.</Typography>;
  }

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
        All Employees
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
        <StyledSearchBox
          placeholder="Search Employees..."
          variant="outlined"
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch
                  style={{ color: "var(--primary-color)", fontSize: "24px" }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Add New Employee">
          <Link to={`/dashboard/employees/add`}>
            <IconButton
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                borderRadius: "50%",
              }}
            >
              <FaPlus />
            </IconButton>
          </Link>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {filteredEmployees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
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
                    src={employee.profileImageUrl}
                    alt={employee.name}
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      border: "2px solid white",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {employee.name}
                  </Typography>
                </Box>
                <IconText>
                  <FaPhone />
                  <Typography>{employee.contactNumber}</Typography>
                </IconText>
                <IconText>
                  <FaEnvelope />
                  <Typography>{employee.email}</Typography>
                </IconText>
                {!isMobile && (
                  <>
                    <IconText>
                      <FaGenderless />
                      <Typography>{employee.gender}</Typography>
                    </IconText>
                    <IconText>
                      <FaHome />
                      <Typography>{employee.address}</Typography>
                    </IconText>
                  </>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Checkbox
                  checked={selected.includes(employee.id)}
                  onChange={() => handleSelect(employee.id)}
                  sx={{ color: "white" }}
                />
                <Box>
                  <Tooltip title="Edit">
                    <Link to={`/dashboard/employees/edit/${employee.id}`}>
                      <IconButton
                        style={{
                          color: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      >
                        <FaEdit />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Details">
                    <Link to={`/dashboard/employees/details/${employee.id}`}>
                      <IconButton
                        style={{
                          color: "white",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      >
                        <TbListDetails />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(employee.id)}
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

export default AllEmployees;
