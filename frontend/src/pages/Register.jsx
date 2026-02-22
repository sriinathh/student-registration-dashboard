import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { User, Hash, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import GlassCard from '../components/ui/GlassCard';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.rollNumber.trim()) {
        newErrors.rollNumber = 'Roll number is required';
      }
    } else if (step === 1) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateStep(2)) {
      return;
    }

    try {
      const response = await register(
        formData.name,
        formData.rollNumber,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      navigate(`/verify-otp/${response.userId}`);
    } catch (err) {
      setLocalError(error || 'Registration failed');
    }
  };

  const steps = ['Account Info', 'Email', 'Password'];

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
                Full Name
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
                  <User size={18} />
                </Box>
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="Srinath"
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
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      py: 1.5,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
                Roll Number
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
                  <Hash size={18} />
                </Box>
                <TextField
                  fullWidth
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  error={!!errors.rollNumber}
                  helperText={errors.rollNumber}
                  placeholder="CSE001"
                  disabled={loading}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
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
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      py: 1.5,
                    },
                  }}
                />
              </Box>
            </Box>
          </>
        );
      case 1:
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
              Email Address
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="your@email.com"
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
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 1.5,
                  },
                }}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <>
            <Box sx={{ mb: 2 }}>
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
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      py: 1.5,
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

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, opacity: 0.8 }}>
                Confirm Password
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
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
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
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      py: 1.5,
                    },
                  }}
                />
                <Box
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Box>
              </Box>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout
      hideHeader
      title="Create Your Account"
      subtitle="Join thousands of students"
    >
      <GlassCard>
        {/* Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} sx={{
            '& .MuiStepLabel-root': {
              padding: '8px 0',
              minHeight: 'auto',
            },
            '& .MuiStepConnector-root': {
              top: '20px',
            }
          }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

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
          {renderStep()}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outlined"
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    opacity: 0.7,
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>
            )}
          </Box>
        </form>

        <Divider sx={{ my: 3, opacity: 0.5 }} />

        {/* Sign In Link */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            opacity: 0.8,
          }}
        >
          Already have an account?{' '}
          <Link
            onClick={() => navigate('/login')}
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
            Sign in here
          </Link>
        </Typography>
      </GlassCard>
    </AuthLayout>
  );
};

export default Register;
