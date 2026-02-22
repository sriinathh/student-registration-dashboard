import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { academicService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

const Grades = () => {
  const { success, error } = useToast();
  const [rows, setRows] = useState([]);
  const [student, setStudent] = useState('');
  const [course, setCourse] = useState('');
  const [gradeVal, setGradeVal] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await academicService.getGrades();
        setRows((res.data.grades || []).map((g) => ({ id: g._id, ...g })));
      } catch (err) {
        error('Failed to fetch grades');
      }
    };

    fetchData();
  }, [error]);

  const handleCreate = async () => {
    try {
      await academicService.createGrade({ student, course, grade: gradeVal });
      success('Grade created');
      setStudent('');
      setCourse('');
      setGradeVal('');
      const res = await academicService.getGrades();
      setRows((res.data.grades || []).map((g) => ({ id: g._id, ...g })));
    } catch (err) {
      error('Failed');
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Grades</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField size="small" label="Student ID" value={student} onChange={(e) => setStudent(e.target.value)} />
          <TextField size="small" label="Course ID" value={course} onChange={(e) => setCourse(e.target.value)} />
          <TextField size="small" label="Grade" value={gradeVal} onChange={(e) => setGradeVal(e.target.value)} />
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.student?.name || row.student}</TableCell>
                  <TableCell>{row.course?.name || row.course}</TableCell>
                  <TableCell>{row.grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Grades;
