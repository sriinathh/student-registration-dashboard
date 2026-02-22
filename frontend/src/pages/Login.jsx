import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import GlassCard from '../components/ui/GlassCard';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or Roll Number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await login(formData.identifier, formData.password);

      if (!response.success) {
        if (response.userId) {
          navigate(`/verify-otp/${response.userId}`);
        }
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      const errMsg = error || 'Login failed';
      setLocalError(errMsg);
    }
  };

  return (
    <AuthLayout
      hideHeader
      title="Welcome Back"
      subtitle="Sign in to your student account"
    >
      <GlassCard>
        {localError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: '0.75rem',
              border: '1px solid',
              borderColor: 'error.main',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(239, 68, 68, 0.05)',
              animation: 'slideDown 0.3s ease',
              '@keyframes slideDown': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {localError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
              Email or Roll Number
            </Typography>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: '#3b82f6',
                }}
              >
                <Mail size={18} />
              </Box>
              <TextField
                fullWidth
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                error={!!errors.identifier}
                helperText={errors.identifier}
                placeholder="your@email.com "
                disabled={loading}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    pl: 4.5,
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      borderWidth: '2px',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 0 0 4px rgba(59, 130, 246, 0.15)'
                          : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 1.5,
                    '&::placeholder': {
                      opacity: 0.5,
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
              Password
            </Typography>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: '#3b82f6',
                }}
              >
                <Lock size={18} />
              </Box>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                placeholder="••••••••"
                disabled={loading}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    pl: 4.5,
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      borderWidth: '2px',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 0 0 4px rgba(59, 130, 246, 0.15)'
                          : '0 0 0 4px rgba(59, 130, 246, 0.1)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 1.5,
                    '&::placeholder': {
                      opacity: 0.5,
                    },
                  },
                }}
              />
              <Box
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: 'absolute',
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#8b5cf6',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  },
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Box>
            </Box>
          </Box>

          {/* Remember Me & Forgot Password */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)',
                    '&.Mui-checked': {
                      color: '#3b82f6',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                  Remember me
                </Typography>
              }
            />
            <Link
              onClick={() => navigate('/forgot-password')}
              sx={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#8b5cf6',
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: '1.05rem',
              fontWeight: 700,
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              textTransform: 'none',
              letterSpacing: '0.4px',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 10px 30px rgba(59, 130, 246, 0.2)'
                  : '0 10px 30px rgba(59, 130, 246, 0.15)',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              border: 'none',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 20px 50px rgba(59, 130, 246, 0.3)'
                    : '0 20px 50px rgba(59, 130, 246, 0.25)',
              },
              '&:active': {
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                opacity: 0.7,
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </form>

        <Divider sx={{ my: 3, opacity: 0.5 }} />

        {/* Sign Up Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            opacity: 0.8,
          }}
        >
          Don't have an account?{' '}
          <Link
            onClick={() => navigate('/register')}
            sx={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#8b5cf6',
                textDecoration: 'underline',
              },
            }}
          >
            Create one now
          </Link>
        </Typography>
      </GlassCard>
    </AuthLayout>
  );
};

export default Login;
