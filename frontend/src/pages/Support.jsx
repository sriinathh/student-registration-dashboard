import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  Chip,
} from '@mui/material';
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { supportService, helpService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Support = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchingTickets, setFetchingTickets] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [tabValue, setTabValue] = useState(0);
  const [myTickets, setMyTickets] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
    category: 'general',
  });

  // Fetch user's tickets and FAQ on mount
  useEffect(() => {
    fetchUserTickets();
    fetchFAQ();
  }, []);

  const fetchUserTickets = async () => {
    try {
      setFetchingTickets(true);
      const response = await supportService.getMyTickets();
      setMyTickets(response.data.tickets || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setFetchingTickets(false);
    }
  };

  const fetchFAQ = async () => {
    try {
      const response = await helpService.getByCategory('general');
      setFaqItems(response.data.articles || []);
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    try {
      setLoading(true);
      await supportService.createTicket(formData);
      
      setMessage({ type: 'success', text: 'Support ticket created! We will respond within 24 hours.' });
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: '',
        category: 'general',
      });
      
      // Refresh tickets
      fetchUserTickets();
      
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit support ticket' 
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#ff6b6b';
      case 'in-progress':
        return '#ffd43b';
      case 'resolved':
        return '#51cf66';
      case 'closed':
        return '#868e96';
      default:
        return '#3b82f6';
    }
  };

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@edusmart.com',
      response: 'Response within 24 hours',
      color: '#3b82f6',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+91 1234-567-890',
      response: 'Available 9AM - 6PM IST',
      color: '#10b981',
    },
    {
      icon: Clock,
      title: 'Live Chat',
      description: 'Chat with our team',
      response: 'Available 24/7',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Support Center 🆘
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            We're here to help. Get support through multiple channels
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Support Channels */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {supportChannels.map((channel, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: '1rem',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(30, 41, 59, 0.5)'
                      : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: channel.color,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '0.75rem',
                    background: `${channel.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: channel.color,
                    mb: 2,
                  }}
                >
                  <channel.icon size={24} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {channel.title}
                </Typography>
                <Typography sx={{ opacity: 0.7, mb: 2 }}>
                  {channel.description}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: channel.color, fontWeight: 600 }}>
                  {channel.response}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, v) => setTabValue(v)}
            sx={{
              borderBottom: '2px solid',
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
              }
            }}
          >
            <Tab label="Create Ticket" />
            <Tab label={`My Tickets (${myTickets.length})`} />
            <Tab label="FAQ" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <GlassCard title="Send us a Message" subtitle="Describe your issue in detail">
                {message.text && (
                  <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                  </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={loading}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing</option>
                    <option value="other">Other</option>
                  </TextField>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={loading}
                  />
                  <Button
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <Send size={20} />}
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Box>
              </GlassCard>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Box>
            {fetchingTickets ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : myTickets.length === 0 ? (
              <Alert severity="info">No support tickets yet. Create one to get started!</Alert>
            ) : (
              <Grid container spacing={2}>
                {myTickets.map((ticket) => (
                  <Grid item xs={12} key={ticket._id}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: '1rem',
                        border: '1px solid',
                        borderColor: 'divider',
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(30, 41, 59, 0.5)'
                            : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {ticket.subject}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {ticket.message.substring(0, 100)}...
                          </Typography>
                        </Box>
                        <Chip
                          label={ticket.status}
                          sx={{
                            backgroundColor: `${getStatusColor(ticket.status)}20`,
                            color: getStatusColor(ticket.status),
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </Typography>
                        <Button
                          endIcon={<ArrowRight size={16} />}
                          sx={{ textTransform: 'none' }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Grid container spacing={2}>
            {faqItems.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info">No FAQ articles available at the moment.</Alert>
              </Grid>
            ) : (
              faqItems.map((article, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: '1rem',
                      border: '1px solid',
                      borderColor: 'divider',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(30, 41, 59, 0.5)'
                          : 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {article.excerpt || article.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Support;
