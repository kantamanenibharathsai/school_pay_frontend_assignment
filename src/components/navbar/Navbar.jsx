import React, { useState, useRef, useEffect } from "react";
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
import { navbarStyles } from "./NavbarStyles";

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

const Navbar = ({ children }) => {
  const location = useLocation();
  const { mode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <Box sx={navbarStyles.container}>
      <Box
        sx={navbarStyles.overlay}
        className={isMenuOpen ? "visible" : ""}
        onClick={handleCloseMenu}
      />
      <Box
        sx={{
          ...navbarStyles.appBar,
          backgroundColor: mode === "light" ? "#f8f8f8" : "#333",
          color: mode === "light" ? "#333" : "#f8f8f8",
          position: "relative",
          zIndex: 1301,
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
              ref={menuButtonRef}
              onClick={toggleMenu}
              color="inherit"
              sx={navbarStyles.mobileMenuButton}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <MenuIcon />
              <Typography sx={{ ...navbarStyles.colorModeText, mt: 0.2 }}>
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
          ref={menuRef}
          className={isMenuOpen ? "open" : ""}
          sx={navbarStyles.mobileMenu}
          role="menu"
        >
          {navItems.map((item) => (
            <Box
              key={item.label}
              component={Link}
              to={item.to}
              onClick={handleCloseMenu}
              sx={navbarStyles.mobileMenuItem}
              className={location.pathname === item.to ? "active" : ""}
              role="menuitem"
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
