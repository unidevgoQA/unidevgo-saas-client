import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPersonLinesFill } from "react-icons/bs";
import {
  FaEdit,
  FaEnvelope,
  FaGenderless,
  FaHome,
  FaPhone,
  FaPlus,
  FaTrashAlt,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
} from "../../../../features/employee/employeeApi";
import { AuthContext } from "../../../../providers/AuthProviders";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "var(--bg-grey-color)",
}));

const StyledSearchBox = styled(TextField)({
  marginBottom: "1rem",
  width: "100%",
  maxWidth: "300px",
  borderRadius: "5px",
  backgroundColor: "white",
  border: "1px solid var(--primary-color)",
});

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

const AllEmployees = () => {

  const {user } = useContext(AuthContext);
  const { data, isLoading } = useGetAllEmployeesQuery();
  const { data : employeesDataById } = useGetAllEmployeesQuery(user?.id);
  
  const [deleteEmployee, { isSuccess, isLoading: deleteEmployeeLoading }] =
    useDeleteEmployeeMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:768px)");

  const employees = data?.data || []; // Fallback to an empty array if data is undefined

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery)
  );

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelected([]);
    } else {
      setSelected(filteredEmployees.map((employee) => employee.id));
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

  //handle Delete
  const handleDelete = (id) => {
    const deleteConfirm = window.confirm("Want to delete?");
    if (deleteConfirm) {
      deleteEmployee(id);
    }
  };

  //Delete Effects
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
    <Box sx={{ padding: "1rem", borderRadius: "10px" }}>
      <Typography
        sx={{
          fontWeight: 700,
          color: "#371edc",
          marginBottom: "10px",
        }}
        variant="h4"
        align="center"
      >
        All Employees
      </Typography>

      <ActionBar>
        <StyledSearchBox
          placeholder="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Tooltip title="Add New Employee">
            <Link to={`/dashboard/employees/add`}>
              {" "}
              <IconButton style={{ color: "var(--primary-color)" }}>
                <FaPlus />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
      </ActionBar>

      <TableContainer
        sx={{
          border: "1px solid var(--primary-color)",
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox checked={selectedAll} onChange={handleSelectAll} />
              </StyledTableCell>
              {!isMobile && <StyledTableCell>Name</StyledTableCell>}
              {!isMobile && <StyledTableCell>Role</StyledTableCell>}
              <StyledTableCell>Mobile</StyledTableCell>
              {!isMobile && <StyledTableCell>Joining Date</StyledTableCell>}
              <StyledTableCell>Email</StyledTableCell>
              {!isMobile && <StyledTableCell>Gender</StyledTableCell>}
              {!isMobile && <StyledTableCell>Address</StyledTableCell>}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(employee.id)}
                      onChange={() => handleSelect(employee.id)}
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaUserAlt
                          style={{
                            marginRight: 8,
                            color: "var(--primary-color)",
                          }}
                        />
                        <Typography>{employee.name}</Typography>
                      </div>
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      <BsPersonLinesFill
                        style={{
                          marginRight: 8,
                          color: "var(--primary-color)",
                        }}
                      />
                      {employee.role}
                    </TableCell>
                  )}
                  <TableCell>
                    <FaPhone
                      style={{ marginRight: 8, color: "var(--primary-color)" }}
                    />
                    {employee.contactNumber}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      {new Date(employee.joiningDate).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>
                    <FaEnvelope
                      style={{ marginRight: 8, color: "var(--primary-color)" }}
                    />
                    {employee.email}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <FaGenderless
                        style={{
                          marginRight: 8,
                          color: "var(--primary-color)",
                        }}
                      />
                      {employee.gender.charAt(0).toUpperCase() +
                        employee.gender.slice(1)}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      <FaHome
                        style={{
                          marginRight: 8,
                          color: "var(--primary-color)",
                        }}
                      />
                      {employee.address}
                    </TableCell>
                  )}

                  <TableCell>
                    <Tooltip title="Edit">
                      <Link to={`/dashboard/employees/edit/${employee?.id}`}>
                        {" "}
                        <IconButton style={{ color: "var(--primary-color)" }}>
                          <FaEdit />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(employee?.id)}
                        style={{ color: "var(--accent-color)" }}
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
    </Box>
  );
};

export default AllEmployees;
