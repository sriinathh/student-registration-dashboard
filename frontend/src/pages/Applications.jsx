import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { applicationService } from '../services/api';
import { useToast } from '../hooks/useToast';

const Applications = () => {
  const { success, error } = useToast();
  const [rows, setRows] = useState([]);
  const [type, setType] = useState('general');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await applicationService.getApplications();
        setRows((res.data.applications || []).map((a) => ({ id: a._id, ...a })));
      } catch (err) {
        error('Failed to fetch');
      }
    };

    fetchData();
  }, [error]);

  const handleCreate = async () => {
    try {
      await applicationService.createApplication({ type, message });
      success('Application created');
      setMessage('');
      const res = await applicationService.getApplications();
      setRows((res.data.applications || []).map((a) => ({ id: a._id, ...a })));
    } catch (err) {
      error('Failed');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Applications</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Select size="small" value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="leave">Leave</MenuItem>
          </Select>
          <TextField size="small" label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.student?.name || 'You'}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Applications;
