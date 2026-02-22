import React from 'react';
import {
  Alert,
  Box,
} from '@mui/material';
import { useToastContext } from '../../context/ToastContext';

const ToastContainer = () => {
  const context = useToastContext();
  const toasts = context?.toasts || [];
  const removeToast = context?.removeToast || (() => {});

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: '400px',
        pointerEvents: 'none',
      }}
    >
      {Array.isArray(toasts) && toasts.map((toast) => (
        <Alert
          key={toast.id}
          severity={toast.type}
          onClose={() => removeToast(toast.id)}
          sx={{
            animation: 'slideIn 0.3s ease-in-out',
            '@keyframes slideIn': {
              from: {
                transform: 'translateX(400px)',
                opacity: 0,
              },
              to: {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
            minWidth: '300px',
            pointerEvents: 'all',
          }}
        >
          {toast.message}
        </Alert>
      ))}
    </Box>
  );
};

export default ToastContainer;
