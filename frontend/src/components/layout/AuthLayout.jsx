import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const AuthLayout = ({ children, title, subtitle, hideHeader = false }) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1a202c 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: mode === 'dark'
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          top: '-20%',
          right: '-20%',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          background: mode === 'dark'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
          pointerEvents: 'none',
        }}
      />

      {/* Header (hidden for auth pages when requested) */}
      {!hideHeader && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgba(59, 130, 246, 0.05)',
                },
              }}
            >
              <ArrowLeft size={24} />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              EduSmart
            </Typography>
          </Box>

          <IconButton
            onClick={toggleTheme}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}
          >
            {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Container maxWidth="sm">
          {/* Title Section (Optional) - hidden when hideHeader=true */}
          {!hideHeader && title && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          )}

          {/* Children */}
          {children}
        </Container>
      </Box>

    </Box>
  );
};

export default AuthLayout;
