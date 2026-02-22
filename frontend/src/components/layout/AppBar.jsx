import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material";
import { Sun, Moon, LogOut, User, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ElegantNavbar = () => {
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifyAnchor, setNotifyAnchor] = useState(null);
  // Determine backend base URL (strip trailing /api if present)
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const backendBase = apiBase.replace(/\/api\/*$/, '');

  // Resolve avatar source robustly: full url, absolute path, relative path, or base64
  const avatarSrc = (() => {
    const a = user?.avatar;
    const b = user?.avatarData;
    if (a) {
      // already full url or data URI
      if (a.startsWith('http') || a.startsWith('data:')) return a;
      // absolute path on server
      if (a.startsWith('/')) return `${backendBase}${a}`;
      // relative path (no leading slash)
      return `${backendBase}/${a}`;
    }
    if (b) {
      return b.startsWith('data:') ? b : `data:image/jpeg;base64,${b}`;
    }
    return undefined;
  })();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 20, // 🔥 top padding
        mx: 4,
        borderRadius: 3,
        px: 4,
        py: 1.5,
        backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
        border: "1px solid",
        borderColor: mode === "dark" ? "#1f2937" : "#e5e7eb",
        boxShadow:
          mode === "dark"
            ? "0 10px 30px rgba(0,0,0,0.6)"
            : "0 10px 30px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      {/* Left - Brand */}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: "1.3rem",
          letterSpacing: "-0.5px",
          cursor: "pointer",
          background:
            "linear-gradient(90deg,#3b82f6,#8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        onClick={() => navigate("/dashboard")}
      >
          Dashboard
      </Typography>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          ml: "auto", // 🔥 pushes everything right
        }}
      >
        {/* Notification */}
        <IconButton
          aria-label="notifications"
          onClick={(e) => setNotifyAnchor(e.currentTarget)}
          sx={{
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          <Badge color="primary" variant="dot" overlap="circular">
            <Bell size={20} />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notifyAnchor}
          open={Boolean(notifyAnchor)}
          onClose={() => setNotifyAnchor(null)}
          PaperProps={{ sx: { mt: 1.5, borderRadius: 2 } }}
        >
          <MenuItem onClick={() => setNotifyAnchor(null)}>No new notifications</MenuItem>
        </Menu>

        {/* Theme Toggle */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            transition: "0.3s",
            "&:hover": {
              transform: "rotate(20deg)",
            },
          }}
        >
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        {/* Profile */}
        <Box
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 0.6,
            borderRadius: 2,
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(59,130,246,0.05)",
            },
          }}
        >
          <Avatar
            src={avatarSrc}
            sx={{
              width: 36,
              height: 36,
              background: avatarSrc ? 'transparent' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)'
            }}
          >
            {!avatarSrc ? (user?.name?.charAt(0) || "U") : null}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            {user?.name}
          </Typography>
        </Box>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: 3,
            },
          }}
        >
          <MenuItem onClick={() => navigate("/profile")}>
            <User size={16} style={{ marginRight: 8 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout} sx={{ color: "#ef4444" }}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ElegantNavbar;