import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Switch,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Bell,
  Lock,
  Eye,
  Save,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { settingsService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { changePassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    assignmentReminders: true,
    gradeNotifications: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    twoFactorAuth: false,
    language: 'en',
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showEmail: false,
    showPhone: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const response = await settingsService.getSettings();
      
      if (response.data && response.data.settings) {
        const settingsData = response.data.settings;
        setSettings(settingsData.notifications || {
          emailNotifications: true,
          pushNotifications: true,
          courseUpdates: true,
          assignmentReminders: true,
          gradeNotifications: true,
        });
        setPreferences(settingsData.preferences || {
          darkMode: false,
          twoFactorAuth: false,
          language: 'en',
        });
        setPrivacy(settingsData.privacy || {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings. Using default values.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleNotificationChange = async (key) => {
    const updatedSettings = { ...settings, [key]: !settings[key] };
    setSettings(updatedSettings);

    try {
      await settingsService.updateNotifications(updatedSettings);
      setMessage({ type: 'success', text: 'Notification settings updated!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update settings' });
      setSettings(settings); // Revert
    }
  };

  const handlePreferenceChange = async (key) => {
    const updatedPreferences = { ...preferences, [key]: !preferences[key] };
    setPreferences(updatedPreferences);

    try {
      await settingsService.updatePreferences(updatedPreferences);
      setMessage({ type: 'success', text: 'Preferences updated!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update preferences' });
      setPreferences(preferences); // Revert
    }
  };

  const handlePrivacyChange = async (key) => {
    const updatedPrivacy = { ...privacy, [key]: !privacy[key] };
    setPrivacy(updatedPrivacy);

    try {
      await settingsService.updatePrivacy(updatedPrivacy);
      setMessage({ type: 'success', text: 'Privacy settings updated!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update privacy settings' });
      setPrivacy(privacy); // Revert
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setLoading(true);
      await changePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      );
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingSettings) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Settings ⚙️
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Manage your preferences and account security
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Notifications */}
          <Grid item xs={12}>
            <GlassCard title="Notifications" subtitle="Manage your notification preferences" icon={Bell}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Email Notifications', key: 'emailNotifications' },
                  { label: 'Push Notifications', key: 'pushNotifications' },
                  { label: 'Course Updates', key: 'courseUpdates' },
                  { label: 'Assignment Reminders', key: 'assignmentReminders' },
                  { label: 'Grade Notifications', key: 'gradeNotifications' },
                ].map((setting) => (
                  <Box
                    key={setting.key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '0.75rem',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(59, 130, 246, 0.05)'
                          : 'rgba(59, 130, 246, 0.08)',
                    }}
                  >
                    <Typography>{setting.label}</Typography>
                    <Switch
                      checked={settings[setting.key] || false}
                      onChange={() => handleNotificationChange(setting.key)}
                    />
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12}>
            <GlassCard title="Preferences" subtitle="Customize your experience" icon={Eye}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Dark Mode', key: 'darkMode' },
                  { label: 'Two-Factor Authentication', key: 'twoFactorAuth' },
                ].map((pref) => (
                  <Box
                    key={pref.key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '0.75rem',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(139, 92, 246, 0.05)'
                          : 'rgba(139, 92, 246, 0.08)',
                    }}
                  >
                    <Typography>{pref.label}</Typography>
                    <Switch
                      checked={preferences[pref.key] || false}
                      onChange={() => handlePreferenceChange(pref.key)}
                    />
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Grid>

          {/* Privacy */}
          <Grid item xs={12}>
            <GlassCard title="Privacy" subtitle="Control your privacy settings" icon={Lock}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Show Email in Profile', key: 'showEmail' },
                  { label: 'Show Phone in Profile', key: 'showPhone' },
                ].map((priv) => (
                  <Box
                    key={priv.key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '0.75rem',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(239, 68, 68, 0.05)'
                          : 'rgba(239, 68, 68, 0.08)',
                    }}
                  >
                    <Typography>{priv.label}</Typography>
                    <Switch
                      checked={privacy[priv.key] || false}
                      onChange={() => handlePrivacyChange(priv.key)}
                    />
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </Grid>

          {/* Password Change */}
          <Grid item xs={12}>
            <GlassCard title="Change Password" subtitle="Update your password regularly" icon={Lock}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Save size={20} />}
                  onClick={handlePasswordChange}
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  }}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </Box>
            </GlassCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings;
