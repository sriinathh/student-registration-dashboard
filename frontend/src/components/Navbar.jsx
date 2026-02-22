import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Brightness7,
  Brightness4,
  Logout,
  Login,
  AppRegistration,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(16px)",
        backgroundColor:
          mode === "dark" ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.9)",
        borderBottom: "1px solid",
        borderColor:
          mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          py: 1.5,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": {
              transform: "rotate(20deg)",
              backgroundColor:
                mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.05)",
            },
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {isAuthenticated ? (
          <>
            {/* Profile Button */}
            <Box
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 0.8,
                borderRadius: "14px",
                cursor: "pointer",
                border: "1px solid",
                borderColor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow:
                    mode === "dark"
                      ? "0 10px 25px rgba(0,0,0,0.4)"
                      : "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  {user?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    opacity: 0.6,
                  }}
                >
                  Student
                </Typography>
              </Box>
            </Box>

            {/* Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: "16px",
                  minWidth: 200,
                  backdropFilter: "blur(12px)",
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(30,41,59,0.95)"
                      : "rgba(255,255,255,0.95)",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/dashboard");
                  setAnchorEl(null);
                }}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  setAnchorEl(null);
                }}
              >
                Profile
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                sx={{ color: "#ef4444" }}
              >
                <Logout sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <Button
                startIcon={<Login />}
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Login
              </Button>
            )}

            {location.pathname !== "/register" && (
              <Button
                variant="contained"
                startIcon={<AppRegistration />}
                onClick={() => navigate("/register")}
                sx={{
                  borderRadius: "14px",
                  px: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                  boxShadow:
                    "0 10px 25px rgba(59,130,246,0.3)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 15px 40px rgba(59,130,246,0.4)",
                  },
                }}
              >
                Register
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;