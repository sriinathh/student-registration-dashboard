import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { Edit, Delete, Plus, Download, Search, Filter, X, Users, Building2, GraduationCap, Calendar, Mail, BookOpen, FileText, CheckCircle } from 'lucide-react';
import { studentService } from '../services/api';
import { useToast } from '../hooks/useToast';
import { SkeletonTable } from '../components/ui/SkeletonLoaders';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import StatCard from '../components/ui/StatCard';
import AnimatedCounter from '../components/dashboard/AnimatedCounter';

const Students = () => {
  const { success, error } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterYear, setFilterYear] = useState('');
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    branch: '',
    year: '',
  });

  // Fetch students
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching students - Token exists:', !!token);
      
      const response = await studentService.getAllStudents();
      const studentsData = Array.isArray(response.data.students) ? response.data.students : [];
      console.log('Students fetched successfully:', studentsData.length);
      setStudents(studentsData);
    } catch (err) {
      console.error('Error fetching students:', {
        status: err.response?.status,
        message: err.response?.data?.message || err.message,
        data: err.response?.data
      });
      error(`Failed to fetch students: ${err.response?.data?.message || err.message}`);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter & search logic
  const filteredStudents = (Array.isArray(students) ? students : []).filter((student) => {
    const matchesSearch =
      student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = !filterBranch || student?.branch === filterBranch;
    const matchesYear = !filterYear || student?.year === filterYear;

    return matchesSearch && matchesBranch && matchesYear;
  });

  const paginatedStudents = filteredStudents.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Handle dialog open/close
  const handleOpenDialog = (student = null) => {
    if (student) {
      setEditingId(student._id);
      setFormData({
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        branch: student.branch || '',
        year: student.year || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        rollNumber: '',
        branch: '',
        year: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save student (create/update)
  const handleSaveStudent = async () => {
    if (!formData.name || !formData.email || !formData.rollNumber) {
      error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await studentService.updateStudent(editingId, formData);
        success('Student updated successfully');
      } else {
        await studentService.createStudent(formData);
        success('Student registered successfully');
      }
      handleCloseDialog();
      fetchStudents();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to save student');
    }
  };

  // Handle delete
  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await studentService.deleteStudent(deleteConfirm.id);
      success('Student deleted successfully');
      setDeleteConfirm({ open: false, id: null });
      fetchStudents();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to delete student');
    } finally {
      setDeleting(false);
    }
  };

  // Export to CSV
  const handleExport = async () => {
    try {
      const response = await studentService.exportStudents();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Export successful');
    } catch (err) {
      error('Failed to export students');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Chemical'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <Box sx={{ background: (theme) => theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      {/* Page Header with Gradient Background */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
          py: 4,
          mb: 4,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Student Management
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Manage and organize all registered students efficiently
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<Download size={20} />}
                onClick={handleExport}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(59, 130, 246, 0.05)',
                  },
                }}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                startIcon={<Plus size={20} />}
                onClick={() => handleOpenDialog()}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 8px 20px rgba(59, 130, 246, 0.3)'
                      : '0 8px 20px rgba(59, 130, 246, 0.2)',
                  '&:hover': {
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 12px 30px rgba(59, 130, 246, 0.4)'
                        : '0 12px 30px rgba(59, 130, 246, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                New Student
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value={<AnimatedCounter end={students.length} duration={800} />}
              icon={Users}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Branches"
              value={<AnimatedCounter end={new Set(students.map((s) => s.branch)).size} duration={800} />}
              icon={Building2}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Years"
              value={<AnimatedCounter end={new Set(students.map((s) => s.year)).size} duration={800} />}
              icon={GraduationCap}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="This Month"
              value={
                <AnimatedCounter
                  end={students.filter((s) => {
                    const created = new Date(s.createdAt);
                    const now = new Date();
                    return (
                      created.getMonth() === now.getMonth() &&
                      created.getFullYear() === now.getFullYear()
                    );
                  }).length}
                  duration={800}
                />
              }
              icon={Calendar}
              color="error"
            />
          </Grid>
        </Grid>

        {/* Filters */}
        <Card
          sx={{
            mb: 3,
            borderRadius: '1rem',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.4) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.5) 100%)',
            backdropFilter: 'blur(10px)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 20px rgba(0, 0, 0, 0.3)'
                : '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Filter size={18} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Search & Filter
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2 }}>
              <TextField
                placeholder="Search by name, email, or roll number..."
                size="small"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                InputProps={{
                  startAdornment: <Search size={18} style={{ marginRight: 8, opacity: 0.6 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0.5rem',
                  },
                }}
              />

              <FormControl size="small" fullWidth>
                <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Building2 size={16} style={{ marginRight: 4 }} />
                  Branch
                </InputLabel>
                <Select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  label="Branch"
                  sx={{ borderRadius: '0.5rem' }}
                >
                  <MenuItem value="">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle size={16} />
                      All Branches
                    </Box>
                  </MenuItem>
                  {branches.map((branch) => (
                    <MenuItem key={branch} value={branch}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Building2 size={16} />
                        {branch}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <GraduationCap size={16} style={{ marginRight: 4 }} />
                  Year
                </InputLabel>
                <Select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  label="Year"
                  sx={{ borderRadius: '0.5rem' }}
                >
                  <MenuItem value="">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle size={16} />
                      All Years
                    </Box>
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BookOpen size={16} />
                        {year}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(searchTerm || filterBranch || filterYear) && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBranch('');
                    setFilterYear('');
                    setPage(0);
                  }}
                  endIcon={<X size={18} />}
                  sx={{ textTransform: 'none' }}
                >
                  Clear Filters
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '1rem',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                : '0 4px 15px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {loading ? (
            <SkeletonTable rows={5} />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)'
                          : 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)',
                      borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FileText size={16} />
                        Roll Number
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Users size={16} />
                        Name
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Mail size={16} />
                        Email
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Building2 size={16} />
                        Branch
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GraduationCap size={16} />
                        Year
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <CheckCircle size={16} />
                        Actions
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedStudents.map((student, idx) => (
                    <TableRow
                      key={student._id}
                      sx={{
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.1)'
                              : 'rgba(59, 130, 246, 0.06)',
                          transform: 'scale(1.01)',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {student.rollNumber}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{student.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        {student.email}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={student.branch || 'N/A'}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.15)'
                                : 'rgba(59, 130, 246, 0.1)',
                            borderColor: (theme) => theme.palette.primary.main,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={student.year || 'N/A'}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(139, 92, 246, 0.15)'
                                : 'rgba(139, 92, 246, 0.1)',
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '#c4b5fd'
                                : '#7c3aed',
                            borderColor: 'rgba(139, 92, 246, 0.5)',
                            border: '1px solid',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Tooltip title="Edit Student">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(student)}
                            sx={{
                              color: 'primary.main',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(59, 130, 246, 0.15)'
                                    : 'rgba(59, 130, 246, 0.1)',
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <Edit size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Student">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(student._id)}
                            sx={{
                              color: 'error.main',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  theme.palette.mode === 'dark'
                                    ? 'rgba(239, 68, 68, 0.15)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <Delete size={18} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </TableContainer>

        {!loading && paginatedStudents.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
              px: 3,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.3) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%)',
              borderRadius: '1rem',
              border: (theme) => `2px dashed ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 2,
                fontSize: '2rem',
              }}
            >
              📚
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3, fontWeight: 600 }}>
              No students found
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, opacity: 0.8 }}>
              Start by registering the first student to your database
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleOpenDialog()}
              startIcon={<Plus size={18} />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 20px rgba(59, 130, 246, 0.3)'
                    : '0 8px 20px rgba(59, 130, 246, 0.2)',
                '&:hover': {
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 12px 30px rgba(59, 130, 246, 0.4)'
                      : '0 12px 30px rgba(59, 130, 246, 0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Register First Student
            </Button>
          </Box>
        )}
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '1rem',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(10px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 25px 50px rgba(0, 0, 0, 0.5)'
                : '0 25px 50px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.25rem',
          }}
        >
          {editingId ? '✏️ Edit Student' : '➕ Register New Student'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Branch</InputLabel>
              <Select
                name="branch"
                value={formData.branch}
                onChange={handleFormChange}
                label="Branch"
              >
                <MenuItem value="">Select Branch</MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={formData.year}
                onChange={handleFormChange}
                label="Year"
              >
                <MenuItem value="">Select Year</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            gap: 1,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.5)'
                : 'rgba(248, 250, 252, 0.5)',
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: (theme) => theme.palette.divider,
              color: (theme) => theme.palette.text.primary,
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(100, 116, 139, 0.1)'
                    : 'rgba(226, 232, 240, 0.3)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveStudent}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 20px rgba(59, 130, 246, 0.3)'
                  : '0 8px 20px rgba(59, 130, 246, 0.2)',
              '&:hover': {
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 12px 30px rgba(59, 130, 246, 0.4)'
                    : '0 12px 30px rgba(59, 130, 246, 0.3)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {editingId ? '✏️ Update Student' : '➕ Register'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        title="Delete Student?"
        message="This action cannot be undone. The student record will be permanently deleted."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
      />

      {/* Toast Container would be rendered at app level */}
    </Box>
  );
};

export default Students;
