import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Paper,
  Chip,
} from '@mui/material';
import {
  Save,
  Edit2,
  Upload,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Check,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, uploadAvatar, loading: contextLoading } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    rollNumber: user?.rollNumber || '',
    phone: user?.phone || '',
    branch: user?.branch || '',
    semester: user?.semester || '',
    address: user?.address || '',
  });

  // Load user profile data on component mount
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        rollNumber: user.rollNumber || '',
        phone: user.phone || '',
        branch: user.branch || '',
        semester: user.semester || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setUploading(true);
      await updateProfile(
        profileData.name,
        profileData.phone,
        profileData.branch,
        profileData.semester,
        profileData.address
      );
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB' });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select a valid image file' });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result);
    reader.readAsDataURL(file);
  };

  const handleUploadAvatar = async () => {
    if (!previewImage) {
      setMessage({ type: 'error', text: 'Please select an image first' });
      return;
    }

    try {
      setUploading(true);
      // If a File was selected, compress it then send the File; otherwise send base64
      if (selectedFile) {
        const compressed = await compressImage(selectedFile, 1024, 1024, 0.8);
        await uploadAvatar(compressed);
      } else {
        await uploadAvatar(previewImage);
      }
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
      setOpenUploadDialog(false);
      setPreviewImage(null);
      setSelectedFile(null);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload avatar' });
    } finally {
      setUploading(false);
    }
  };

  // Compress image client-side to reduce upload size and avoid server limits
  const compressImage = (file, maxWidth = 1024, maxHeight = 1024, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = async () => {
        let { width, height } = image;
        const aspect = width / height;
        if (width > maxWidth) {
          width = maxWidth;
          height = Math.round(width / aspect);
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = Math.round(height * aspect);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Compression failed'));
            const compressedFile = new File([blob], file.name, { type: blob.type });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      image.onerror = (err) => reject(err);

      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        image.src = e.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const activityHistory = [
    { date: '2 days ago', action: 'Submitted Assignment', course: 'Data Structures' },
    { date: '1 week ago', action: 'Scored 92/100 in Quiz', course: 'Algorithms' },
    { date: '2 weeks ago', action: 'Attended Class', course: 'Database Systems' },
    { date: '1 month ago', action: 'Completed Course', course: 'Web Development' },
  ];

  return (
    <Box sx={{ pb: 4, background: (theme) =>
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 1) 100%)'
        : 'linear-gradient(180deg, rgba(240, 245, 255, 0.8) 0%, rgba(240, 245, 255, 1) 100%)',
      minHeight: '100vh'
    }}>
      {/* Profile Header with Impressive Design */}
      <Box
        sx={{
          py: 6,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
          borderBottom: '1px solid',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Avatar Section with Upload */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 160,
                  height: 160,
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={user?.avatar || user?.avatarData || undefined}
                  sx={{
                    width: 160,
                    height: 160,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    fontSize: '4rem',
                    fontWeight: 800,
                    border: '4px solid',
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff'),
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)',
                    },
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Button
                  onClick={() => setOpenUploadDialog(true)}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    minWidth: 'auto',
                    p: 0,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.3s ease',
                    border: '3px solid',
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? '#1e293b' : '#ffffff'),
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)',
                    },
                  }}
                >
                  <Upload size={24} />
                </Button>
              </Box>
            </Box>

            {/* Profile Info Section */}
            <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 0.5,
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #e0f2fe 0%, #c7d2fe 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {profileData.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      {profileData.rollNumber}
                    </Typography>
                    {profileData.branch && (
                      <>
                        <Typography sx={{ opacity: 0.5 }}>•</Typography>
                        <Typography variant="body1" sx={{ opacity: 0.7 }}>
                          {profileData.branch}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Button
                  startIcon={editMode ? <Save size={20} /> : <Edit2 size={20} />}
                  onClick={editMode ? handleSave : () => setEditMode(true)}
                  variant={editMode ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '0.75rem',
                    px: 3,
                    py: 1.2,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: editMode ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent',
                    '&:hover': {
                      background: editMode
                        ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                        : 'rgba(59, 130, 246, 0.1)',
                    },
                  }}
                  disabled={uploading || contextLoading}
                >
                  {uploading || contextLoading ? <CircularProgress size={20} /> : (editMode ? 'Save' : 'Edit Profile')}
                </Button>
              </Box>

              {/* Quick Info Grid */}
              <Grid container spacing={2}>
                {[
                  { icon: Mail, label: 'Email', value: profileData.email },
                  { icon: Phone, label: 'Phone', value: profileData.phone || 'Not added' },
                  { icon: MapPin, label: 'Location', value: 'Tech City' },
                  { icon: Calendar, label: 'Joined', value: 'Jan 2022' },
                ].map((item, idx) => (
                  <Grid item xs={6} sm={3} key={idx}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: '0.75rem',
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(59, 130, 246, 0.08)'
                            : 'rgba(59, 130, 246, 0.05)',
                        border: '1px solid',
                        borderColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(59, 130, 246, 0.1)',
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '0.5rem',
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.15)'
                              : 'rgba(59, 130, 246, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#3b82f6',
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={18} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          sx={{ opacity: 0.6, display: 'block', mb: 0.3, whiteSpace: 'nowrap' }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {message.text && (
          <Alert
            severity={message.type}
            onClose={() => setMessage({ type: '', text: '' })}
            sx={{ mb: 3, borderRadius: '0.75rem' }}
          >
            {message.text}
          </Alert>
        )}

        {/* Tabs */}
        <Box
          sx={{
            mb: 3,
            background: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
            borderRadius: '1rem',
            p: 1,
            display: 'inline-block',
            border: '1px solid',
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'),
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, value) => setTabValue(value)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                borderRadius: '0.75rem',
                color: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                '&.Mui-selected': {
                  color: '#3b82f6',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'rgba(59, 130, 246, 0.08)',
                },
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab label="📋 Personal Information" />
            <Tab label="🎓 Academic Details" />
            <Tab label="⏱️ Activity History" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Grid container spacing={3}>
          {/* Personal Information Tab */}
          {tabValue === 0 && (
            <>
              <Grid item xs={12} md={6}>
                <GlassCard title="Contact Information">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Full Name
                      </Typography>
                      <TextField
                        fullWidth
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!editMode}
                        placeholder="Enter your full name"
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            '&.Mui-disabled': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        value={profileData.email}
                        disabled
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.5, display: 'block' }}>
                        Email cannot be changed
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Phone Number
                      </Typography>
                      <TextField
                        fullWidth
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!editMode}
                        placeholder="Enter your phone number"
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            '&.Mui-disabled': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </GlassCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <GlassCard title="Location & Address">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Address
                      </Typography>
                      <TextField
                        fullWidth
                        value={profileData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!editMode}
                        placeholder="Enter your address"
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            '&.Mui-disabled': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Box>

                    {editMode && (
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          borderRadius: '0.75rem',
                          py: 1.3,
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                          },
                        }}
                      >
                        Update Location on Map
                      </Button>
                    )}
                  </Box>
                </GlassCard>
              </Grid>
            </>
          )}

          {/* Academic Details Tab */}
          {tabValue === 1 && (
            <>
              <Grid item xs={12} md={6}>
                <GlassCard title="Academic Information">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.6, mb: 1, fontWeight: 600 }}>
                        Roll Number
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 800,
                          p: 1.5,
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.08)'
                              : 'rgba(59, 130, 246, 0.05)',
                          borderRadius: '0.75rem',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.15)'
                              : 'rgba(59, 130, 246, 0.1)',
                        }}
                      >
                        {profileData.rollNumber}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Department/Branch
                      </Typography>
                      <TextField
                        fullWidth
                        value={profileData.branch}
                        onChange={(e) => handleInputChange('branch', e.target.value)}
                        disabled={!editMode}
                        placeholder="Enter your department"
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            '&.Mui-disabled': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, opacity: 0.7, fontWeight: 600 }}>
                        Current Semester
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={profileData.semester}
                        onChange={(e) => handleInputChange('semester', e.target.value)}
                        disabled={!editMode}
                        placeholder="Enter your semester"
                        variant="outlined"
                        inputProps={{ min: 1, max: 8 }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem',
                            '&.Mui-disabled': {
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(255,255,255,0.03)'
                                  : 'rgba(0,0,0,0.02)',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </GlassCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <GlassCard title="Academic Performance">
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {[
                      { label: 'Current CGPA', value: '3.85/4.0', icon: '⭐' },
                      { label: 'Semester GPA', value: '3.92/4.0', icon: '📈' },
                      { label: 'Courses Completed', value: '24', icon: '📚' },
                      { label: 'Credits Earned', value: '96/120', icon: '🎖️' },
                    ].map((item, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1.5,
                          borderRadius: '0.75rem',
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.05)'
                              : 'rgba(59, 130, 246, 0.03)',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.1)'
                              : 'rgba(59, 130, 246, 0.05)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '1.3rem' }}>{item.icon}</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 600 }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <Chip
                          label={item.value}
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: 'white',
                            height: 32,
                            '& .MuiChip-label': {
                              px: 2,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </GlassCard>
              </Grid>
            </>
          )}

          {/* Activity History Tab */}
          {tabValue === 2 && (
            <Grid item xs={12}>
              <GlassCard title="Recent Activity">
                <List sx={{ width: '100%' }}>
                  {activityHistory.map((item, idx) => (
                    <Box key={idx}>
                      <ListItem
                        sx={{
                          px: 2,
                          py: 2,
                          borderRadius: '0.75rem',
                          mb: 1,
                          background: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.04)'
                              : 'rgba(59, 130, 246, 0.03)',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(59, 130, 246, 0.1)'
                              : 'rgba(59, 130, 246, 0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.08)'
                                : 'rgba(59, 130, 246, 0.06)',
                            transform: 'translateX(4px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '0.75rem',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mr: 2,
                            flexShrink: 0,
                          }}
                        >
                          <Clock size={20} />
                        </Box>
                        <ListItemText
                          primary={item.action}
                          secondary={`${item.course} • ${item.date}`}
                          primaryTypographyProps={{ fontWeight: 700 }}
                          secondaryTypographyProps={{ sx: { opacity: 0.7 } }}
                        />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </GlassCard>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Upload Avatar Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={() => {
          setOpenUploadDialog(false);
          setPreviewImage(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontSize: '1.3rem',
            pb: 1,
          }}
        >
          📸 Upload Profile Picture
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ py: 2 }}>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
              Choose a clear image to use as your profile picture. Image will be visible to all students.
            </Typography>

            {previewImage ? (
              <Box
                sx={{
                  mb: 3,
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: '#3b82f6',
                }}
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 300,
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ) : (
              <Button
                onClick={() => fileInputRef.current?.click()}
                fullWidth
                sx={{
                  height: 140,
                  borderRadius: '1rem',
                  border: '2px dashed #3b82f6',
                  color: '#3b82f6',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(59, 130, 246, 0.05)'
                      : 'rgba(59, 130, 246, 0.03)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(59, 130, 246, 0.08)',
                    borderColor: '#2563eb',
                  },
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Upload size={40} style={{ marginBottom: 12, opacity: 0.7 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Click to select image
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 0.5 }}>
                    JPG, PNG up to 5MB
                  </Typography>
                </Box>
              </Button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => {
              setOpenUploadDialog(false);
              setPreviewImage(null);
            }}
            sx={{
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadAvatar}
            variant="contained"
            disabled={!previewImage || uploading}
            sx={{
              borderRadius: '0.75rem',
              textTransform: 'none',
              fontWeight: 700,
              background: previewImage
                ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                : 'rgba(0,0,0,0.2)',
              '&:hover': {
                background: previewImage
                  ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                  : 'rgba(0,0,0,0.2)',
              },
            }}
          >
            {uploading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : <Check size={20} sx={{ mr: 1 }} />}
            {uploading ? 'Uploading...' : 'Upload Picture'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
