import {
    Avatar,
    Box,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { FaDownload, FaEdit, FaEnvelope, FaGem, FaHome, FaPhone, FaPlus, FaTrashAlt, FaUserAlt } from "react-icons/fa";

const companies = [
  {
    id: "56789",
    name: "FutureWorks Inc.",
    email: "hello@futureworks.com",
    subscription: "gold",
    profileImageUrl: "https://futureworks.com/images/avatar.png",
    address: "789 Progress Lane, Tech City, NY",
    contactNumber: "1122334455",
    createdAt: "2025-01-06T14:02:30.881Z",
  },
  {
    id: "56790",
    name: "TechForward Solutions",
    email: "contact@techforward.com",
    subscription: "silver",
    profileImageUrl: "https://techforward.com/images/avatar.png",
    address: "456 Innovation Way, Silicon Valley, CA",
    contactNumber: "2233445566",
    createdAt: "2025-01-01T10:00:00.000Z",
  },
  {
    id: "56791",
    name: "Pioneer Coders",
    email: "info@pioneercoders.com",
    subscription: "bronze",
    profileImageUrl: "https://pioneercoders.com/images/avatar.png",
    address: "123 Code Street, Startup City, TX",
    contactNumber: "3344556677",
    createdAt: "2024-12-15T09:30:00.000Z",
  },
  {
    id: "56792",
    name: "NextGen Tech",
    email: "info@nextgentech.com",
    subscription: "gold",
    profileImageUrl: "https://nextgentech.com/images/avatar.png",
    address: "101 Future Drive, Tech City, NY",
    contactNumber: "4455667788",
    createdAt: "2024-11-10T08:00:00.000Z",
  },
  {
    id: "56793",
    name: "InnoWorks",
    email: "contact@innoworks.com",
    subscription: "silver",
    profileImageUrl: "https://innoworks.com/images/avatar.png",
    address: "202 Creativity Lane, Innovation City, TX",
    contactNumber: "5566778899",
    createdAt: "2024-10-05T12:00:00.000Z",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
}));

const StyledSearchBox = styled(TextField)({
  marginBottom: "1rem",
  width: "100%",
  maxWidth: "300px",
  borderRadius: "20px",
  backgroundColor: "white",
});

const ActionBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
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

const AllCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery)
  );

  const handleSelectAll = () => {
    if (selectedAll) {
      setSelected([]);
    } else {
      setSelected(filteredCompanies.map((company) => company.id));
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
    <Box sx={{ backgroundColor: "#f8f8f8", padding: "1rem" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "1rem", color: "#371edc", textAlign: isMobile ? "center" : "left" }}
      >
        All Companies
      </Typography>

      <ActionBar>
        <StyledSearchBox
          placeholder="Search Companies"
          variant="outlined"
          size="small"
          onChange={handleSearch}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Add New Company">
            <IconButton color="primary">
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selectedAll}
                  onChange={handleSelectAll}
                />
              </StyledTableCell>
              {!isMobile && <StyledTableCell>Image</StyledTableCell>}
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              {!isMobile && <StyledTableCell>Subscription</StyledTableCell>}
              <StyledTableCell>Contact</StyledTableCell>
              {!isMobile && <StyledTableCell>Address</StyledTableCell>}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(company.id)}
                      onChange={() => handleSelect(company.id)}
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Avatar
                        src={company.profileImageUrl}
                        alt={company.name}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <FaUserAlt style={{ marginRight: 8 , color : 'var(--primary-color)' }} />
                    {company.name}
                  </TableCell>
                  <TableCell>
                    <FaEnvelope style={{ marginRight: 8 , color : 'var(--primary-color)' }} />
                    {company.email}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <FaGem style={{ marginRight: 8 , color : 'var(--primary-color)'}} />
                      {company.subscription}
                    </TableCell>
                  )}
                  <TableCell>
                    <FaPhone style={{ marginRight: 8 , color : 'var(--primary-color)'}} />
                    {company.contactNumber}
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <FaHome style={{ marginRight: 8, color : 'var(--primary-color)'}} />
                      {company.address}
                    </TableCell>
                  )}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton style={{color : 'var(--primary-color)'}}>
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton style={{color : 'var(--accent-color)'}}>
                        <FaTrashAlt />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredCompanies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaginationContainer>
    </Box>
  );
};

export default AllCompanies;
