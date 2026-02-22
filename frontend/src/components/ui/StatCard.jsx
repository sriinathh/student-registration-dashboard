import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary', trend, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colors = {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    purple: '#8b5cf6',
  };

  const bgColor = colors[color] || colors.primary;

  return (
    <Card
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 255, 0.95) 100%)',
        border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${bgColor}22 0%, transparent 100%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${bgColor}15, transparent 70%)`,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: isDark
            ? `0 20px 50px ${bgColor}30`
            : `0 20px 50px ${bgColor}20`,
        },
        ...props.sx,
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600 }}>
              {title}
            </Typography>
          </Box>
          {Icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '0.75rem',
                background: `${bgColor}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={24} style={{ color: bgColor }} />
            </Box>
          )}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend && (
              <Box
                sx={{
                  color: trend > 0 ? '#10b981' : '#ef4444',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </Box>
            )}
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              {subtitle}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
