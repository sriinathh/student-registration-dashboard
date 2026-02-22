import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  LayoutDashboard,
  User,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
  Users,
  BarChart3,
  Clock,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ModernSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useTheme();
  const [expandedMenu, setExpandedMenu] = React.useState(null);

  const handleMenuItemClick = (path, hasSubmenu) => {
    if (hasSubmenu) {
      setExpandedMenu(expandedMenu === path ? null : path);
    } else {
      navigate(path);
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      badge: null,
    },
    {
      label: 'Students',
      icon: Users,
      path: '/students',
      badge: null,
    },
    {
      label: 'My Profile',
      icon: User,
      path: '/profile',
      badge: null,
    },
    {
      label: 'Documents',
      icon: FileText,
      path: '/documents',
      badge: '2',
    },
    {
      label: 'Academic',
      icon: BarChart3,
      path: '/academic',
      hasSubmenu: true,
      submenu: [
        { label: 'Courses', path: '/academic/courses' },
        { label: 'Grades', path: '/academic/grades' },
        { label: 'Attendance', path: '/academic/attendance' },
      ],
    },
    {
      label: 'Applications',
      icon: Clock,
      path: '/applications',
      badge: '1',
    },
  ];

  const footerMenuItems = [
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      path: '/help',
    },
    {
      label: 'Support Tickets',
      icon: FileText,
      path: '/support',
    },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          EduSmart
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ display: { xs: 'flex', lg: 'none' } }}
          size="small"
        >
          <X size={20} />
        </IconButton>
      </Box>

      <Divider />

      {/* Main Menu */}
      <List sx={{ flex: 1, py: 2, px: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.path}>
            <ListItem
              disablePadding
              sx={{
                mb: 0.5,
              }}
            >
              <ListItemButton
                onClick={() => handleMenuItemClick(item.path, item.hasSubmenu)}
                sx={{
                  borderRadius: '0.75rem',
                  mx: 0.5,
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive(item.path)
                    ? mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'rgba(59, 130, 246, 0.1)'
                    : 'transparent',
                  color: isActive(item.path) ? '#3b82f6' : 'inherit',
                  '&:hover': {
                    backgroundColor: mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path) ? '#3b82f6' : 'inherit',
                  }}
                >
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive(item.path) ? 700 : 500,
                  }}
                />
                {item.badge && (
                  <Box
                    sx={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
                {item.hasSubmenu && (
                  <ChevronRight
                    size={18}
                    style={{
                      transform: expandedMenu === item.path ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            {item.hasSubmenu && (
              <Collapse in={expandedMenu === item.path} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  {item.submenu?.map((subitem) => (
                    <ListItem key={subitem.path} disablePadding sx={{ mb: 0.25 }}>
                      <ListItemButton
                        onClick={() => navigate(subitem.path)}
                        sx={{
                          borderRadius: '0.5rem',
                          mx: 0.5,
                          py: 1,
                          fontSize: '0.875rem',
                          backgroundColor: isActive(subitem.path)
                            ? mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.1)'
                              : 'rgba(59, 130, 246, 0.05)'
                            : 'transparent',
                          color: isActive(subitem.path) ? '#3b82f6' : 'inherit',
                          '&:hover': {
                            backgroundColor: mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.08)'
                              : 'rgba(59, 130, 246, 0.03)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={subitem.label}
                          primaryTypographyProps={{
                            variant: 'caption',
                            fontWeight: isActive(subitem.path) ? 600 : 500,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>

      <Divider />

      {/* Footer Menu */}
      <List sx={{ py: 2, px: 1 }}>
        {footerMenuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '0.75rem',
                mx: 0.5,
                transition: 'all 0.3s ease',
                backgroundColor: isActive(item.path)
                  ? mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(59, 130, 246, 0.1)'
                  : 'transparent',
                color: isActive(item.path) ? '#3b82f6' : 'inherit',
                '&:hover': {
                  backgroundColor: mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgba(59, 130, 246, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: isActive(item.path) ? '#3b82f6' : 'inherit' }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: isActive(item.path) ? 700 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Premium Badge */}
      <Box
        sx={{
          p: 2,
          m: 1,
          borderRadius: '0.75rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#3b82f6' }}>
          🎓 Student Premium
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
          Early Access to new features
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          width: 280,
          flexShrink: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'flex', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default ModernSidebar;
