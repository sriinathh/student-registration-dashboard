import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const GlassCard = ({ children, title, subtitle, icon: Icon, ...props }) => {
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        backgroundColor: isDark
          ? 'rgba(30, 41, 59, 0.8)'
          : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`,
        boxShadow: isDark
          ? '0 20px 60px rgba(0, 0, 0, 0.4)'
          : '0 20px 60px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`,
        },
        '&:hover': {
          boxShadow: isDark
            ? '0 30px 80px rgba(59, 130, 246, 0.2)'
            : '0 30px 80px rgba(59, 130, 246, 0.12)',
          transform: 'translateY(-8px)',
          borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
        },
        ...props.sx,
      }}
    >
      {(title || subtitle || Icon) && (
        <CardHeader
          avatar={Icon && <Icon size={24} style={{ color: '#3b82f6' }} />}
          title={title}
          subheader={subtitle}
          sx={{
            pb: 1,
            '& .MuiCardHeader-title': {
              fontWeight: 700,
              fontSize: '1.25rem',
            },
            '& .MuiCardHeader-subheader': {
              opacity: 0.7,
            },
          }}
        />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default GlassCard;
