import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Menu, MenuItem, CircularProgress, Button } from '@mui/material';
import { BarChart3, Users, Clock, Award, MoreVertical, TrendingUp, ArrowRight, Mail, Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import AnimatedCounter from '../components/dashboard/AnimatedCounter';
import { studentService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await studentService.getDashboardStats();
        setDashboardData(response.data.data);
        
        // Fetch recent students
        fetchRecentStudents();
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const fetchRecentStudents = async () => {
    try {
      setLoadingStudents(true);
      const response = await studentService.getAllStudents();
      const studentsData = Array.isArray(response.data.students) ? response.data.students : [];
      // Show only last 5 students
      setStudents(studentsData.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const stats = [
    {
      title: 'Total Students',
      value: <AnimatedCounter end={dashboardData?.totalStudents || 0} duration={800} />,
      subtitle: 'Registered',
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Total Branches',
      value: <AnimatedCounter end={dashboardData?.totalBranches || 0} duration={800} />,
      subtitle: 'Available',
      icon: BarChart3,
      color: 'success',
    },
    {
      title: 'Avg per Branch',
      value: dashboardData?.totalStudents && dashboardData?.totalBranches 
        ? <AnimatedCounter end={Math.round(dashboardData?.totalStudents / dashboardData?.totalBranches)} duration={800} />
        : <AnimatedCounter end={0} duration={800} />,
      subtitle: 'Students',
      icon: Award,
      color: 'warning',
    },
    {
      title: 'This Month',
      value: <AnimatedCounter end={dashboardData?.thisMonthCount || 0} duration={800} />,
      subtitle: 'New registrations',
      icon: Clock,
      color: 'error',
    },
  ];

  const recentCourses = dashboardData?.recentCourses || [
    {
      id: 1,
      name: 'Advanced Algorithms',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Web Development Mastery',
      instructor: 'Prof. Mike Chen',
      progress: 60,
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Brown',
      progress: 90,
      status: 'Nearing Completion',
    },
    {
      id: 4,
      name: 'Cloud Computing Essentials',
      instructor: 'Prof. David Lee',
      progress: 45,
      status: 'In Progress',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#3b82f6';
      case 'Nearing Completion':
        return '#10b981';
      case 'Completed':
        return '#64748b';
      default:
        return '#3b82f6';
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Welcome back, {user?.name || 'Student'}! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Here's your academic dashboard. Keep up the great work!
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        ) : (
        <>
        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

        {/* Charts and Recent Activity */}
        <Grid container spacing={3}>
          {/* Performance Chart Placeholder */}
          <Grid item xs={12} lg={6}>
            <GlassCard
              title="Performance Overview"
              subtitle="Last 4 weeks"
              icon={TrendingUp}
              sx={{ height: '100%' }}
            >
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.05)'
                      : 'rgba(59, 130, 246, 0.08)',
                  border: '2px dashed',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'rgba(59, 130, 246, 0.15)',
                }}
              >
                <Typography sx={{ opacity: 0.5, textAlign: 'center' }}>
                  📊 Chart visualization placeholder
                  <br />
                  <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                    Integrate your favorite charting library (Chart.js, Recharts, etc.)
                  </Typography>
                </Typography>
              </Box>
            </GlassCard>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} lg={6}>
            <GlassCard
              title="Quick Stats"
              icon={BarChart3}
              sx={{ height: '100%' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Assignments Completed', value: '34/42', color: '#3b82f6' },
                  { label: 'Exams Passed', value: '6/7', color: '#10b981' },
                  { label: 'Average Score', value: '87.5%', color: '#f59e0b' },
                  { label: 'Study Hours This Week', value: '24.5h', color: '#8b5cf6' },
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Grid>
        </Grid>

        {/* Recent Students */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={24} />
              Recent Students
            </Typography>
            <Button 
              endIcon={<ArrowRight size={18} />}
              onClick={() => navigate('/students')}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              View All
            </Button>
          </Box>
          
          {loadingStudents ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress size={40} />
            </Box>
          ) : students.length > 0 ? (
            <GlassCard>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ borderBottom: '2px solid', borderColor: 'divider' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Roll Number</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Branch</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Year</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow
                        key={student._id}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.05)'
                                : 'rgba(59, 130, 246, 0.08)',
                          },
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {student.rollNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {student.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Mail size={16} style={{ opacity: 0.6 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                              {student.email}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Building2 size={16} style={{ opacity: 0.6 }} />
                            <Chip 
                              label={student.branch || 'N/A'} 
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 500 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GraduationCap size={16} style={{ opacity: 0.6 }} />
                            <Typography variant="body2">{student.year || 'N/A'}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={student.isVerified ? 'Verified' : 'Pending'} 
                            size="small"
                            color={student.isVerified ? 'success' : 'warning'}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </GlassCard>
          ) : (
            <GlassCard>
              <Box sx={{ textAlign: 'center', py: 4, opacity: 0.6 }}>
                <Users size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  No Students Found
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
                  Students will appear here once they are registered
                </Typography>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/students')}
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Go to Students Page
                </Button>
              </Box>
            </GlassCard>
          )}
        </Box>

        {/* Recent Courses Table */}
        <Box sx={{ mt: 4 }}>
          <GlassCard title="Enrolled Courses" subtitle="Your current courses">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ borderBottom: '2px solid', borderColor: 'divider' }}>
                    <TableCell sx={{ fontWeight: 700 }}>Course Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Instructor</TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Progress
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentCourses.map((course) => (
                    <TableRow
                      key={course.id}
                      sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.05)'
                              : 'rgba(59, 130, 246, 0.08)',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {course.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            position: 'relative',
                            width: 100,
                            height: 8,
                            borderRadius: '4px',
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.1)'
                                : 'rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            mx: 'auto',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              height: '100%',
                              width: `${course.progress}%`,
                              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                              borderRadius: '4px',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
                          {course.progress}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={course.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(course.status) + '20',
                            color: getStatusColor(course.status),
                            fontWeight: 600,
                            border: `1px solid ${getStatusColor(course.status)}40`,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, course.id)}
                          sx={{
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(59, 130, 246, 0.12)',
                            },
                          }}
                        >
                          <MoreVertical size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Action Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
              <MenuItem onClick={handleMenuClose}>Download Materials</MenuItem>
              <MenuItem onClick={handleMenuClose}>Submit Assignment</MenuItem>
            </Menu>
          </GlassCard>
        </Box>
        </>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
