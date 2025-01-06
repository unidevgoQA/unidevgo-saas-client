import {
  AppBar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { FaBars, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./header.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const menuItems = [
    {
      name: "Products",
      submenu: [
        { name: "Product 1", link: "/product1" },
        { name: "Product 2", link: "/product2" },
        { name: "Product 3", link: "/product3" },
      ],
    },
    {
      name: "Solutions",
      submenu: [
        { name: "Solution 1", link: "/solution1" },
        { name: "Solution 2", link: "/solution2" },
        { name: "Solution 3", link: "/solution3" },
      ],
    },
    {
      name: "Resources",
      submenu: [
        { name: "Resource 1", link: "/resource1" },
        { name: "Resource 2", link: "/resource2" },
        { name: "Resource 3", link: "/resource3" },
      ],
    },
    { name: "Enterprise", link: "/enterprise" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(#371edc, #170b68);",
        boxShadow: "none",
        fontFamily: "Poppins, serif",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        borderRadius: "10px",
        width: "calc(100% - 40px)", // Adjust width to respect the left and right margins
      }}
 
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src={logo} alt="Logo" style={{ height:30 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Poppins, serif",
            }}
          >
          </Typography>
        </Box>

        {/* Desktop Menu Section */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {menuItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  "&:hover .submenu": { display: "flex" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "white",
                    cursor: "pointer",
                    textTransform: "none",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Poppins, serif",
                  }}
                >
                  {item.name}
                  {item.submenu && <FaChevronDown />}
                </Box>
                {item.submenu && (
                  <Box
                    className="submenu"
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      display: "none",
                      flexDirection: "column",
                      minWidth: "150px",
                    }}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        component={Link}
                        to={subItem.link}
                        sx={{
                          textAlign: "left",
                          color: "var(--primary-color)",
                          padding: "10px 20px",
                          fontSize: "14px",
                          fontFamily: "Poppins, serif",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        {subItem.name}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Right Buttons Section */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "white",
                textTransform: "none",
                fontFamily: "Poppins, serif",
              }}
            >
              Log in
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/contact-sales"
              sx={{
                borderRadius : '30px',
                textTransform: "none",
                borderColor: "white",
                color: "white",
                fontFamily: "Poppins, serif",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              Contact sales
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/get-started"
              sx={{
                textTransform: "none",
                borderRadius : '30px',
                backgroundColor: "white",
                color: "var(--primary-color)",
                fontFamily: "Poppins, serif",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              Get Started
            </Button>
          </Box>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton edge="end" color="inherit" onClick={toggleMobileMenu}>
            <FaBars style={{ color: "white" }} />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{ "& .MuiDrawer-paper": { backgroundColor: "var(--primary-color)" } }}
      >
        <Box sx={{ width: 250, padding: 2, color: "white" }} role="presentation">
          <List>
            {menuItems.map((item, index) => (
              <Box key={index}>
                <ListItem
                  button
                  onClick={() => toggleSubmenu(index)}
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Poppins, serif",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  <ListItemText primary={item.name} />
                  {item.submenu && (
                    <Box component="span">
                      {openSubmenu === index ? <FaChevronDown /> : <FaChevronRight />}
                    </Box>
                  )}
                </ListItem>
                {item.submenu && (
                  <Collapse in={openSubmenu === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((subItem, subIndex) => (
                        <ListItem
                          button
                          key={subIndex}
                          component={Link}
                          to={subItem.link}
                          sx={{
                            paddingLeft: 4,
                            color: "white",
                            fontSize: "14px",
                            fontFamily: "Poppins, serif",
                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                          }}
                        >
                          <ListItemText primary={subItem.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
