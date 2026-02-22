import React from 'react';
import { Box, Skeleton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

// Skeleton Loader for Cards
export const SkeletonCard = () => (
  <Box
    sx={{
      p: 3,
      borderRadius: '1rem',
      border: '1px solid',
      borderColor: 'divider',
      background: (theme) =>
        theme.palette.mode === 'dark'
          ? 'rgba(30, 41, 59, 0.5)'
          : 'rgba(255, 255, 255, 0.5)',
    }}
  >
    <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
  </Box>
);

// Skeleton Loader for Table
export const SkeletonTable = ({ rows = 5 }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: rows }).map((_, idx) => (
        <TableRow key={idx}>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// Skeleton Loader for Text
export const SkeletonText = ({ lines = 3, width = '100%' }) => (
  <Box>
    {Array.from({ length: lines }).map((_, idx) => (
      <Skeleton key={idx} variant="text" width={idx === lines - 1 ? '80%' : width} sx={{ my: 1 }} />
    ))}
  </Box>
);

// Skeleton Loader for Profile
export const SkeletonProfile = () => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
    <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto', mb: 1 }} />
    <Skeleton variant="text" width="40%" height={20} sx={{ mx: 'auto', mb: 3 }} />
    <SkeletonText lines={4} />
  </Box>
);
