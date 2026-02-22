import React, { useState } from 'react';
import { Box } from '@mui/material';
import ModernAppBar from './AppBar';
import ModernSidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <ModernSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: { xs: 0, lg: '280px' } }}>
        {/* AppBar */}
        <ModernAppBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
              },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
