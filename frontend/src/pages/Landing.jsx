import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  AppBar,
  Toolbar,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
} from "@mui/material";
import { ArrowRight, Menu as MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { mode } = useTheme();

  const features = [
    {
      title: "Student Registration",
      desc: "Seamless student onboarding with OTP verification & secure login.",
    },
    {
      title: "Analytics Dashboard",
      desc: "Monitor registrations and performance with real-time data.",
    },
    {
      title: "Profile Management",
      desc: "Manage student details with editable dashboard panels.",
    },
    {
      title: "Fast & Secure",
      desc: "Built with MERN stack for scalability and performance.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background:
          mode === "dark"
            ? "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)"
            : "linear-gradient(135deg,#f8fafc,#e0e7ff,#f8fafc)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating Gradient Background */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
          top: -150,
          right: -150,
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.25), transparent 70%)",
          bottom: -150,
          left: -150,
          animation: "float 10s ease-in-out infinite",
        }}
      />

      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(20px)",
          background:
            mode === "dark"
              ? "rgba(15,23,42,0.8)"
              : "rgba(255,255,255,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.1rem', sm: '1.5rem' },
              background:
                "linear-gradient(135deg,#6366f1,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            EduSmart
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: 600 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  sx={{
                    borderRadius: "14px",
                    px: 3,
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg,#6366f1,#ec4899)",
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/dashboard")}
                sx={{
                  borderRadius: "14px",
                  background:
                    "linear-gradient(135deg,#6366f1,#ec4899)",
                }}
              >
                Dashboard
              </Button>
            )}
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <MobileMenu isAuthenticated={isAuthenticated} navigate={navigate} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* HERO */}
      <Container sx={{ py: { xs: 6, md: 12 }, position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: { xs: 4, md: 8 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.8rem", md: "3.2rem" },
                  background:
                    "linear-gradient(135deg,#6366f1,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Next Generation Student Dashboard
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  maxWidth: { xs: '100%', md: 650 },
                  mx: { xs: 0, md: 'auto' },
                  opacity: 0.8,
                  mb: 3,
                }}
              >
                A responsive and secure student registration platform
                with modern UI and fast workflows.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<ArrowRight />}
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                >
                  Get Started
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => navigate('/help')}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: 2, animation: 'animate-fade-in 0.6s ease' }}>
              <Typography sx={{ fontWeight: 800 }}>Platform Snapshot</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>1200+</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Students Registered</Typography>
                </Box>
                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'success.main' }}>97%</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>Verified Users</Typography>
                </Box>
              </Box>
              <Box sx={{ height: 100, borderRadius: 2, background: (theme) => theme.palette.mode === 'dark' ? 'linear-gradient(90deg, rgba(99,102,241,0.06), rgba(139,92,246,0.03))' : 'linear-gradient(90deg, rgba(99,102,241,0.08), rgba(236,72,153,0.03))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>Chart preview</Typography>
              </Box>
              <Box className="cta-bar" sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Ready to onboard students?</Typography>
                <Button variant="contained" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}>Get Started</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* DASHBOARD PREVIEW */}
        <Grid container spacing={4} sx={{ mt: { xs: 4, md: 8 } }}>
          {["Total Students: 1200+", "Today's Registrations: 145", "Verified Users: 97%", "System Uptime: 99.9%"].map(
            (item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    backdropFilter: "blur(15px)",
                    background:
                      mode === "dark"
                        ? "rgba(30,41,59,0.6)"
                        : "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "0.4s",
                    textAlign: "center",
                    fontWeight: 700,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 20px 40px rgba(99,102,241,0.4)",
                    },
                  }}
                >
                  {item}
                </Card>
              </Grid>
            )
          )}
        </Grid>
        {/* Testimonials */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 3 }}>What students say</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box className="testimonial">
                <Typography sx={{ fontWeight: 700 }}>"Intuitive and fast. Saved our admissions team hours."</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>— Priya K., Registrar</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="testimonial">
                <Typography sx={{ fontWeight: 700 }}>"Clean UI and great performance on mobile."</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>— Ahmed R., Student</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="testimonial">
                <Typography sx={{ fontWeight: 700 }}>"Easy to customize and deploy for our campus."</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>— Dr. Lee, IT Admin</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* FEATURES */}
        <Box textAlign="center" mt={12} mb={6}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Why Choose EduSmart?
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "18px",
                  transition: "0.3s",
                  border: "1px solid rgba(99,102,241,0.12)",
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(99,102,241,0.12)',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{feature.title}</Typography>
                <Typography sx={{ opacity: 0.75, mt: 1 }}>{feature.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Box className="site-footer">
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>EduSmart</Typography>
              <Typography variant="body2" sx={{ opacity: 0.75, mt: 1 }}>Modern student registration and dashboard platform.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>Resources</Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <a href="#">Documentation</a>
                <a href="#">Support</a>
                <a href="#">Privacy</a>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>Contact</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>hello@edusmart.example</Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="caption" sx={{ color: '#9ca3af' }}>© 2026 EduSmart — All rights reserved</Typography>
          </Box>
        </Container>
      </Box>

      {/* FLOAT ANIMATION */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(25px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Landing;

/* Mobile menu helper component (kept in same file for simplicity) */
function MobileMenu({ isAuthenticated, navigate }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <MuiMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {!isAuthenticated ? (
          <>
            <MenuItem onClick={() => { handleClose(); navigate('/login'); }}>Login</MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/register'); }}>Register</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
        )}
      </MuiMenu>
    </>
  );
}