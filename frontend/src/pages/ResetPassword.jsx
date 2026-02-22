import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../components/Snackbar';

const ResetPassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { resetPassword, loading, error } = useAuth();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/[^0-9]/g, '').slice(0, 6),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) {
      return;
    }

    try {
      await resetPassword(userId, formData.otp, formData.newPassword, formData.confirmPassword);
      showSnackbar('Password reset successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setLocalError(error || 'Password reset failed');
      showSnackbar(error || 'Password reset failed', 'error');
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 2,
            background: '#fff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              marginBottom: 3,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Reset Password
          </Typography>

          {localError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {localError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              error={!!errors.otp}
              helperText={errors.otp}
              margin="normal"
              placeholder="000000"
              disabled={loading}
              inputProps={{
                maxLength: 6,
                style: {
                  fontSize: '1.5rem',
                  letterSpacing: '0.3rem',
                  textAlign: 'center',
                  fontWeight: 700,
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              margin="normal"
              placeholder="••••••"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              placeholder="••••••"
              disabled={loading}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                marginTop: 3,
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
            </Button>
          </form>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate('/login')}
            sx={{
              marginTop: 2,
              color: '#667eea',
              fontWeight: 600,
            }}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
      <SnackbarComponent />
    </Box>
  );
};

export default ResetPassword;
