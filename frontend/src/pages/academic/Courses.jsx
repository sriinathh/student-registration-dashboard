import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { academicService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

const Courses = () => {
  const { success, error } = useToast();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await academicService.getCourses();
        setRows((res.data.courses || []).map((c) => ({ id: c._id, ...c })));
      } catch (err) {
        error('Failed to fetch courses');
      }
    };

    fetchData();
  }, [error]);

  const handleCreate = async () => {
    try {
      await academicService.createCourse({ name });
      success('Course created');
      setName('');
      const res = await academicService.getCourses();
      setRows((res.data.courses || []).map((c) => ({ id: c._id, ...c })));
    } catch (err) {
      error('Failed');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Courses</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField size="small" label="Course name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Instructor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.instructor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Courses;
