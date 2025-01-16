import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
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
import { Link } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../../../features/employee/employeeApi";
import { AuthContext } from "../../../../providers/AuthProviders";

const StyledSearchBox = styled(TextField)({
  marginBottom: "1.5rem",
  width: "100%",
  maxWidth: "510px",
  background: "white",
  borderRadius: "10px",
  padding: "10px 15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.27)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      border: "none",
    },
  },
});

const ActionBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0",
  flexWrap: "wrap",
  gap: "10px",
});

const StyledCard = styled(Card)({
  background: "linear-gradient(#371edc, #170b68)",
  color: "white",
  padding : "10px",
  borderRadius: "10px",
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


const employees = [
  {
    id: "EMP00193",
    name: "John Doe",
    email: "john.doe@company.com",
    password: "passwordJohn123",
    needsPasswordChange: false,
    role: "employee",
    designation: "Data Analyst",
    companyId: "56789",
    joiningDate: "2020-02-15T00:00:00.000Z",
    gender: "male",
    profileImageUrl: "https://example.com/profile-images/johndoe.jpg",
    address: "456 Oak Street, Metropolis, USA",
    contactNumber: "+11234567893",
    isDeleted: false,
  },
  {
    id: "EMP00194",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    password: "passwordEmily123",
    needsPasswordChange: false,
    role: "employee",
    designation: "HR Manager",
    companyId: "56789",
    joiningDate: "2018-07-22T00:00:00.000Z",
    gender: "female",
    profileImageUrl: "https://example.com/profile-images/emilydavis.jpg",
    address: "789 Pine Road, Gotham, USA",
    contactNumber: "+11234567894",
    isDeleted: false,
  },
  {
    id: "EMP00195",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    password: "passwordMichael123",
    needsPasswordChange: false,
    role: "employee",
    designation: "Project Manager",
    companyId: "56789",
    joiningDate: "2016-05-18T00:00:00.000Z",
    gender: "male",
    profileImageUrl: "https://example.com/profile-images/michaelbrown.jpg",
    address: "321 Maple Avenue, Star City, USA",
    contactNumber: "+11234567895",
    isDeleted: false,
  },
  {
    id: "EMP00196",
    name: "Sophia Martinez",
    email: "sophia.martinez@company.com",
    password: "passwordSophia123",
    needsPasswordChange: false,
    role: "employee",
    designation: "Marketing Specialist",
    companyId: "56789",
    joiningDate: "2021-03-12T00:00:00.000Z",
    gender: "female",
    profileImageUrl: "https://example.com/profile-images/sophiamartinez.jpg",
    address: "654 Birch Street, Central City, USA",
    contactNumber: "+11234567896",
    isDeleted: false,
  },
  {
    id: "EMP00197",
    name: "David Wilson",
    email: "david.wilson@company.com",
    password: "passwordDavid123",
    needsPasswordChange: false,
    role: "employee",
    designation: "UI/UX Designer",
    companyId: "56789",
    joiningDate: "2022-08-05T00:00:00.000Z",
    gender: "male",
    profileImageUrl: "https://example.com/profile-images/davidwilson.jpg",
    address: "987 Cedar Drive, Smallville, USA",
    contactNumber: "+11234567897",
    isDeleted: false,
  },
];



const AllEmployees = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetAllEmployeesQuery();
  const { data: employeesDataById } = useGetAllEmployeesQuery(user?.id);

  const [deleteEmployee, { isSuccess, isLoading: deleteEmployeeLoading }] =
    useDeleteEmployeeMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  // const employees = employeesDataById?.data || []; // Fallback to an empty array if data is undefined

  

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
    return <Typography>Loading employees...</Typography>;
  }

  if (employees.length === 0) {
    return <Typography>No employees found.</Typography>;
  }

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography
        sx={{
          fontWeight: 700,
          background: "linear-gradient(#371edc, #170b68)",
          color: "#fff",
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
        variant="h5"
        align="left"
      >
        All Employees
      </Typography>

      <ActionBar>
        <StyledSearchBox
          placeholder="Search employees..."
          variant="outlined"
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: "#371edc" }} />
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Add New Employee">
          <Link to={`/dashboard/employees/add`}>
            <IconButton
              style={{
                backgroundColor: "#371edc",
                color: "white",
                borderRadius: "50%",
              }}
            >
              <FaPlus />
            </IconButton>
          </Link>
        </Tooltip>
      </ActionBar>

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
                    sx={{
                      bgcolor: "#ffffff",
                      color: "#371edc",
                      width: "60px",
                      height: "60px",
                      fontSize: "1.5rem",
                      borderRadius: "10px",
                    }}
                    src={employee.profileImageUrl}
                    alt={employee.name}
                  >
                    {!employee.profileImageUrl && employee.name.charAt(0)}
                  </Avatar>
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
                    <Link to={`/dashboard/employees/edit/${employee?.id}`}>
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
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(employee?.id)}
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