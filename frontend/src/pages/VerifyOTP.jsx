import React, { useState, useEffect } from 'react';
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

const VerifyOTP = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { verifyOTP, resendOTP, loading, error } = useAuth();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [otp, setOtp] = useState('');
  const [localError, setLocalError] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!otp.trim()) {
      setLocalError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setLocalError('OTP must be 6 digits');
      return;
    }

    try {
      await verifyOTP(userId, otp);
      showSnackbar('Email verified successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      setLocalError(error || 'Invalid OTP');
      showSnackbar(error || 'Invalid OTP', 'error');
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(userId);
      setTimer(300);
      setCanResend(false);
      showSnackbar('OTP sent successfully', 'success');
    } catch (err) {
      showSnackbar(error || 'Failed to resend OTP', 'error');
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
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Verify Email
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              marginBottom: 3,
            }}
          >
            Enter the 6-digit OTP sent to your email
          </Typography>

          {localError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {localError}
            </Alert>
          )}

          <form onSubmit={handleVerify}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                setOtp(val);
              }}
              margin="normal"
              placeholder="000000"
              disabled={loading}
              inputProps={{
                maxLength: 6,
                style: {
                  fontSize: '2rem',
                  letterSpacing: '0.5rem',
                  textAlign: 'center',
                  fontWeight: 700,
                },
              }}
            />

            <Box
              sx={{
                marginTop: 2,
                marginBottom: 2,
                padding: '12px',
                backgroundColor: '#f0f4f8',
                borderRadius: '8px',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: timer < 60 ? '#ef5350' : '#667eea',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                Time remaining: {formatTime(timer)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
            </Button>
          </form>

          <Button
            fullWidth
            variant="text"
            disabled={!canResend || loading}
            onClick={handleResend}
            sx={{
              marginTop: 2,
              color: canResend ? '#667eea' : '#cbd5e1',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#667eea',
              },
            }}
          >
            {canResend ? 'Resend OTP' : `Resend in ${formatTime(timer)}`}
          </Button>
        </Paper>
      </Container>
      <SnackbarComponent />
    </Box>
  );
};

export default VerifyOTP;
