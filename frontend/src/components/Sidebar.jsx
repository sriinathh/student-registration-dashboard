import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard,
  People,
  Settings,
  LogoutRounded,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { label: 'Profile', icon: <Person />, path: '/profile' },
    { label: 'Students', icon: <People />, path: '/students' },
    { label: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '1.25rem',
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Box>

      <List sx={{ padding: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => handleMenuClick(item.path)}
            sx={{
              padding: '10px 16px',
              margin: '0 8px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: '#667eea',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ padding: 2, marginTop: 'auto' }}>
        <Divider />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            padding: '10px 16px',
            margin: '8px 0',
            borderRadius: '8px',
            color: '#ef5350',
            '&:hover': {
              backgroundColor: 'rgba(239, 83, 80, 0.1)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: '#ef5350',
              minWidth: 40,
            }}
          >
            <LogoutRounded />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 500,
            }}
          />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
