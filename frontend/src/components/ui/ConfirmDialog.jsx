import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({
  open = false,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  onConfirm = () => {},
  onCancel = () => {},
  loading = false,
  variant = 'danger', // 'danger', 'warning', 'info'
  icon = null,
}) => {
  const variantConfig = {
    danger: { color: '#ef4444', bgColor: '#fef2f2' },
    warning: { color: '#f59e0b', bgColor: '#fffbeb' },
    info: { color: '#3b82f6', bgColor: '#eff6ff' },
  };

  const config = variantConfig[variant];

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {icon || (
            <AlertTriangle
              size={24}
              style={{ color: config.color, flexShrink: 0 }}
            />
          )}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(226, 232, 240, 0.8)'
                : 'rgba(51, 65, 85, 0.8)',
            mt: 1,
            fontSize: '0.95rem',
            lineHeight: '1.6',
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontSize: '0.95rem',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(100, 116, 139, 0.5)'
                : 'rgba(203, 213, 225, 1)',
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(226, 232, 240, 0.9)'
                : 'rgba(51, 65, 85, 0.9)',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(100, 116, 139, 0.1)'
                  : 'rgba(226, 232, 240, 0.3)',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(100, 116, 139, 0.7)'
                  : 'rgba(100, 116, 139, 0.5)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontSize: '0.95rem',
            background: variant === 'danger'
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              : variant === 'warning'
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            '&:hover': {
              boxShadow: variant === 'danger'
                ? '0 8px 20px rgba(239, 68, 68, 0.3)'
                : variant === 'warning'
                ? '0 8px 20px rgba(245, 158, 11, 0.3)'
                : '0 8px 20px rgba(59, 130, 246, 0.3)',
            },
          }}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
