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
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { BsPersonLinesFill } from "react-icons/bs";
import {
  FaDailymotion,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaGenderless,
  FaHome,
  FaPhone,
  FaPlus,
  FaTrashAlt,
  FaUserAlt
} from "react-icons/fa";

const employees = [
  {
    id: "EMP0012357",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    department: "Java",
    joiningDate: "2018-03-01",
    gender: "male",
    profileImageUrl: "https://via.placeholder.com/150",
    address: "123 Elm Street",
    contactNumber: "1234567890",
    status: "On Leave",
  },
  {
    id: "EMP00190",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    department: "UI/UX",
    joiningDate: "2019-05-20",
    gender: "female",
    profileImageUrl: "https://via.placeholder.com/150",
    address: "456 Oak Avenue",
    contactNumber: "2345678901",
    status: "Active",
  },
  // Add more employees as needed
];

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
   border : '1px solid var(--primary-color)'
  
});

const ActionBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // backgroundColor: "var(--bg-grey-color)",
  padding: "1rem 0rem",
  borderRadius: "8px",
  margin: "1rem 0rem",
  flexWrap: "wrap",
  gap: "10px",
});

const PaginationContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  padding: "1rem 0",
  borderTop: "1px solid #f0f0f0",
});

const AllEmployees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:768px)");

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        // backgroundColor: "var(--bg-grey-color)",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
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
        <Box sx={{ display: "flex", alignItems:'center' ,gap: "10px" }}>
          <Tooltip title="Add New Employee">
            <IconButton style={{color :'var(--primary-color)'}}>
              <FaPlus />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Data">
            <IconButton color="secondary">
              <FaDownload />
            </IconButton>
          </Tooltip>
        </Box>
      </ActionBar>

      <TableContainer sx={{
        border : '1px solid var(--primary-color)'
      }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox checked={selectedAll} onChange={handleSelectAll} />
              </StyledTableCell>
              {!isMobile && <StyledTableCell>Name</StyledTableCell>}
              {!isMobile && <StyledTableCell>Role</StyledTableCell>}
              {/* {!isMobile && <StyledTableCell>Department</StyledTableCell>} */}
              <StyledTableCell>Mobile</StyledTableCell>
              {!isMobile && <StyledTableCell>Joining Date</StyledTableCell>}
              <StyledTableCell>Email</StyledTableCell>
              {!isMobile && <StyledTableCell>Gender</StyledTableCell>}
              {!isMobile && <StyledTableCell>Address</StyledTableCell>}
              <StyledTableCell>Employee Status</StyledTableCell>
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
               <div style={{ display: "flex", alignItems: "center" }}>
                 <BsPersonLinesFill
                   style={{
                     marginRight: 8,
                     color: "var(--primary-color)",
                   }}
                 />
                 <Typography>{employee.role}</Typography>
               </div>
             </TableCell>
                    
                  )}
                  {/* {!isMobile && (
                    <TableCell>
                      <Typography>{employee.department}</Typography>
                    </TableCell>
                  )} */}
                  <TableCell>
                    <FaPhone
                      style={{ marginRight: 8, color: "var(--primary-color)" }}
                    />
                    {employee.contactNumber}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <FaDailymotion  style={{ marginRight: 8, color: "var(--primary-color)" }}/>
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
                      <FaGenderless  style={{ marginRight: 8, color: "var(--primary-color)" }}/>
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
                    <Typography
                      sx={{
                        backgroundColor:
                          employee.status === "Active"
                            ? "var(--bg-light-green-color)"
                            : "var(--accent-color)",
                        color: "var(--white-color)",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        display: "inline-block",
                        fontSize: "12px",
                      }}
                    >
                      {employee.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton style={{ color: "var(--primary-color)" }}>
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton style={{ color: "var(--accent-color)" }}>
                        <FaTrashAlt />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <PaginationContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaginationContainer> */}
    </Box>
  );
};

export default AllEmployees;
