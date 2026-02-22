import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { academicService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

const Attendance = () => {
  const { success, error } = useToast();
  const [rows, setRows] = useState([]);
  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('present');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await academicService.getAttendance();
        setRows((res.data.attendance || []).map((a) => ({ id: a._id, ...a })));
      } catch (err) {
        error('Failed to fetch attendance');
      }
    };

    fetchData();
  }, [error]);

  const handleCreate = async () => {
    try {
      await academicService.createAttendance({ student, course, status });
      success('Attendance recorded');
      setStudent('');
      setCourse('');
      const res = await academicService.getAttendance();
      setRows((res.data.attendance || []).map((a) => ({ id: a._id, ...a })));
    } catch (err) {
      error('Failed');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Attendance</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField size="small" label="Student ID" value={student} onChange={(e) => setStudent(e.target.value)} />
          <TextField size="small" label="Course ID" value={course} onChange={(e) => setCourse(e.target.value)} />
          <Select size="small" value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleCreate}>Record</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.student?.name || row.student}</TableCell>
                  <TableCell>{row.course?.name || row.course}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{new Date(row.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Attendance;
