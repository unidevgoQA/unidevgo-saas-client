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
  FaTrashAlt
} from "react-icons/fa";

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

const AllCompanies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery)
  );

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

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
                <FaSearch style={{ color: "#371edc" }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Add New Company">
            <IconButton
              style={{
                backgroundColor: "#371edc",
                color: "white",
                borderRadius: "50%",
              }}
            >
              <FaPlus />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredCompanies.map((company) => (
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
                    <IconButton
                      style={{
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        marginRight :"10px"
                      }}
                    >
                      <FaEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
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

export default AllCompanies;
