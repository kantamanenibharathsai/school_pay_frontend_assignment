import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useColorMode } from "../../contexts/ThemeContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UpdateIcon from "@mui/icons-material/Update";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "../../App.css";

const navbarStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appBar: {
    position: "static",
    marginBottom: (theme) => theme.spacing(3),
    borderBottom: "1px solid #ccc",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: (theme) => theme.spacing(1, 2),
    "@media (min-width: 900px)": {
      padding: (theme) => theme.spacing(2, 3),
    },
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  mobileMenuButton: {
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: 1,
    height: "50px",
    mr: -2,
  },
  colorModeToggle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ml: 2,
  },
  colorModeText: {
    fontSize: "0.7rem",
    mt: "-0.3rem",
  },

  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    padding: (theme) => theme.spacing(1, 2),
    textDecoration: "none",
    color: "inherit",
    textAlign: { xs: "left", sm: "center" },
    "&.active": {
      fontWeight: "bold",
      color: "skyblue",
    },
  },
  mobileMenuIcon: {
    display: "flex",
    alignItems: "center",
    width: "20px",
    height: "20px",
    fontSize: "inherit",
  },
  mobileMenuLabel: {
    ml: 1,
    fontSize: "14px",
  },
  desktopNav: {
    display: "none",
    justifyContent: "flex-end",
    padding: (theme) => theme.spacing(1, 2),
    "@media (min-width: 900px)": {
      display: "flex",
    },
  },
  desktopNavItem: {
    display: "flex",
    alignItems: "center",
    color: "inherit",
    textDecoration: "none",
    marginLeft: (theme) => theme.spacing(2),
    "&.active": {
      fontWeight: "bold",
      color: "skyblue",
    },
  },
  desktopNavIcon: {
    display: "flex",
    alignItems: "center",
    width: "20px",
    height: "20px",
    fontSize: "inherit",
  },
  desktopNavLabel: {
    ml: 1,
    fontSize: "14px",
  },
  content: {
    flexGrow: 1,
    padding: (theme) => theme.spacing(2),
  },

  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: (theme) => theme.spacing(0.1),
    py: "15px",
    position: "absolute",
    top: 77,
    left: 0,
    justifyContent: { sm: "center" },
    width: "100%",
    backgroundColor: (theme) => theme.palette.background.paper,
    boxShadow: 1,
    zIndex: 1301,
    maxHeight: 0,
    opacity: 0,
    transform: "translateY(-10px)",
    overflow: "hidden",
    transition: "max-height 1.0s ease, opacity 0.7s ease, transform 1.0s ease",
    willChange: "max-height, opacity, transform",
    "@media (min-width: 900px)": {
      display: "none",
    },
  },
};

const Navbar = ({ children }) => {
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const navItems = [
    {
      label: "Dashboard",
      to: "/",
      icon: <DashboardIcon sx={navbarStyles.mobileMenuIcon} />,
    },
    {
      label: "By School",
      to: "/school-transactions",
      icon: <SchoolIcon sx={navbarStyles.mobileMenuIcon} />,
    },
    {
      label: "Check Status",
      to: "/transaction-status",
      icon: <CheckCircleOutlineIcon sx={navbarStyles.mobileMenuIcon} />,
    },
    {
      label: "Manual Update",
      to: "/manual-update",
      icon: <UpdateIcon sx={navbarStyles.mobileMenuIcon} />,
    },
  ];

  return (
    <Box sx={navbarStyles.container}>
      <Box
        sx={{
          ...navbarStyles.appBar,
          backgroundColor: mode === "light" ? "#f8f8f8" : "#333",
          color: mode === "light" ? "#333" : "#f8f8f8",
        }}
      >
        <Box sx={navbarStyles.toolbar}>
          <Typography
            variant="h6"
            component="div"
            sx={navbarStyles.toolbarTitle}
          >
            Sch Pay
          </Typography>
          <Box sx={navbarStyles.actions}>
            <Button
              onClick={toggleMenu}
              color="inherit"
              sx={navbarStyles.mobileMenuButton}
            >
              <MenuIcon />
              <Typography sx={{ ...navbarStyles.colorModeText, mt: 0 }}>
                Menu
              </Typography>
            </Button>
            <Box sx={navbarStyles.colorModeToggle}>
              <Button onClick={toggleColorMode} color="inherit">
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </Button>
              <Typography sx={navbarStyles.colorModeText}>
                {mode === "light" ? "Dark Mode" : "Light Mode"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className={`mobile-menu${isMenuOpen ? " open" : ""}`}
          sx={navbarStyles.mobileMenu}
        >
          {navItems.map((item) => (
            <Box
              key={item.label}
              component={Link}
              to={item.to}
              onClick={handleCloseMenu}
              sx={navbarStyles.mobileMenuItem}
              className={location.pathname === item.to ? "active" : ""}
            >
              {React.cloneElement(item.icon, {
                sx: navbarStyles.mobileMenuIcon,
              })}
              <Typography sx={navbarStyles.mobileMenuLabel}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={navbarStyles.desktopNav}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.to}
              sx={navbarStyles.desktopNavItem}
              className={location.pathname === item.to ? "active" : ""}
            >
              {React.cloneElement(item.icon, {
                sx: navbarStyles.desktopNavIcon,
              })}
              <Typography sx={navbarStyles.desktopNavLabel}>
                {item.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={navbarStyles.content}>{children}</Box>
    </Box>
  );
};

export default Navbar;
