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
import React, { useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaGem,
  FaHome,
  FaPhone,
  FaPlus,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} from "../../../../features/company/companyApi";

const StyledSearchBox = styled(TextField)({
  marginBottom: "1.5rem",
  width: "100%",
  maxWidth: "495px",
  background: "var(--bg-dark-blue-color)",
  color: '#fff',  // This sets the color of the typed text
  borderRadius: "5px",
  padding: "10px 15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.27)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    "& fieldset": {
      border: "none",
    },
    "& input": {
      color: "#fff",  // This makes the typed text color white
    },
    "& input::placeholder": {
      color: "#fff",  // This sets the placeholder text color to white
    },
  },
});


const StyledCard = styled(Card)({
  background: "var(--bg-dark-blue-color)",
  color : '#fff',
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

const AllCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");
  const { data } = useGetAllCompanyQuery();
  const [deleteCompany, { isSuccess, isLoading }] = useDeleteCompanyMutation();

  const companies = data?.data;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCompanies = companies?.filter((company) =>
    company.name.toLowerCase().includes(searchQuery)
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
      deleteCompany(id);
    }
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography
        sx={{
          fontWeight: 700,
          backgroundColor: "var(--bg-color)",
          border: "1px solid var(--primary-color)",
          color : '#fff',
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
        variant="h5"
        align="left"
      >
        All Companies
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
          placeholder="Search Companies..."
          variant="outlined"
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch  style={{ color: "var(--primary-color)" , fontSize : '24px'}} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Add New Company">
            <Link to={"/register"}>
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
      </Box>

      <Grid container spacing={3}>
        {filteredCompanies && filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
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
                      src={company.profileImageUrl}
                      alt={company.name}
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                        border: "2px solid white",
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {company.name}
                    </Typography>
                  </Box>
                  <IconText>
                    <FaEnvelope />
                    <Typography>{company.email}</Typography>
                  </IconText>
                  {!isMobile && (
                    <>
                      <IconText>
                        <FaGem />
                        <Typography>{company.subscription}</Typography>
                      </IconText>
                      <IconText>
                        <FaPhone />
                        <Typography>{company.contactNumber}</Typography>
                      </IconText>
                      <IconText>
                        <FaHome />
                        <Typography>{company.address}</Typography>
                      </IconText>
                    </>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Checkbox
                    checked={selected.includes(company.id)}
                    onChange={() => handleSelect(company.id)}
                    sx={{ color: "white" }}
                  />
                  <Box>
                    <Tooltip title="Edit">
                      <Link to={`/dashboard/companies/edit/${company.id}`}>
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
                      <Link to={`/dashboard/companies/details/${company?.id}`}>
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
                        onClick={() => handleDelete(company?.id)}
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "gray" }}
            >
              No companies available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AllCompanies;
