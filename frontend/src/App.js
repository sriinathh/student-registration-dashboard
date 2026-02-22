import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import createCustomTheme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import PrivateRoute from './components/PrivateRoute';
import ToastContainer from './components/ui/ToastContainer';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Support from './pages/Support';
import Documents from './pages/Documents';
import Courses from './pages/academic/Courses';
import Grades from './pages/academic/Grades';
import Attendance from './pages/academic/Attendance';
import Applications from './pages/Applications';

const AppContent = () => {
  const { mode } = useTheme();
  const theme = createCustomTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />

          {/* Auth Routes with AuthLayout */}
          <Route
            path="/register"
            element={
              <AuthLayout title="Create Account" subtitle="Join thousands of students">
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/verify-otp/:userId"
            element={
              <AuthLayout title="Verify Email" subtitle="Enter the code sent to your email">
                <VerifyOTP />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout title="Reset Password" subtitle="Enter your email to reset your password">
                <ForgotPassword />
              </AuthLayout>
            }
          />
          <Route
            path="/reset-password/:userId"
            element={
              <AuthLayout title="Set New Password" subtitle="Create a strong password">
                <ResetPassword />
              </AuthLayout>
            }
          />

          {/* Protected Routes with MainLayout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Students />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Documents />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/academic/courses"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Courses />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/academic/grades"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Grades />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/academic/attendance"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Attendance />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Applications />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/help"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Help />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Support />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </MuiThemeProvider>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
