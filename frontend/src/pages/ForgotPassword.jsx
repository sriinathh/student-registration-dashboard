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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../components/Snackbar';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, error } = useAuth();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim()) {
      setLocalError('Email is required');
      return;
    }

    if (!emailRegex.test(email)) {
      setLocalError('Invalid email format');
      return;
    }

    try {
      const response = await forgotPassword(email);
      setSubmitted(true);
      showSnackbar('OTP sent to your email', 'success');
      setTimeout(() => {
        navigate(`/reset-password/${response.userId}`);
      }, 1500);
    } catch (err) {
      setLocalError(error || 'Failed to send reset OTP');
      showSnackbar(error || 'Failed to send reset OTP', 'error');
    }
  };

  if (submitted) {
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
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ color: '#66bb6a', marginBottom: 2 }}>
              ✓ OTP Sent Successfully
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Check your email for the password reset OTP. Redirecting...
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

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
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: 'center',
              marginBottom: 2,
            }}
          >
            Enter your email and we'll send you an OTP to reset your password
          </Typography>

          {localError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {localError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              placeholder="your@email.com"
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
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

export default ForgotPassword;
