import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  ChevronDown,
  Search,
  BookOpen,
  FileText,
  HelpCircle,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { helpService } from '../services/api';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const helpCategories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      category: 'getting-started',
      description: 'Learn the basics of using EduSmart',
    },
    {
      icon: FileText,
      title: 'Courses & Assignments',
      category: 'courses',
      description: 'Course and assignment management',
    },
    {
      icon: HelpCircle,
      title: 'Profile & Settings',
      category: 'profile',
      description: 'Manage your profile and settings',
    },
  ];

  // Load all articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter articles when search or category changes
  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredArticles(filtered);
  }, [searchQuery, articles, selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await helpService.getAllArticles();
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.trim() && query.length > 2) {
      try {
        const response = await helpService.searchArticles(query);
        setArticles(response.data.articles || []);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else if (!query.trim()) {
      fetchArticles();
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Page Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Help Center 📚
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Find answers to your questions and learn how to use EduSmart
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Help Categories */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {helpCategories.map((category, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
                sx={{
                  p: 3,
                  borderRadius: '1rem',
                  border: '2px solid',
                  borderColor: selectedCategory === category.category ? '#3b82f6' : 'divider',
                  background: (theme) =>
                    selectedCategory === category.category
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(59, 130, 246, 0.05)'
                      : theme.palette.mode === 'dark'
                      ? 'rgba(30, 41, 59, 0.5)'
                      : 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: '#3b82f6',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '0.75rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    mb: 2,
                  }}
                >
                  <category.icon size={24} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {category.title}
                </Typography>
                <Typography sx={{ opacity: 0.7, mb: 2, fontSize: '0.9rem' }}>
                  {category.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <GlassCard title="Frequently Asked Questions" subtitle="Find answers to common questions">
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} style={{ opacity: 0.5 }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          {/* Loading State */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredArticles.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {filteredArticles.map((article, idx) => (
                <Accordion
                  key={article._id || idx}
                  expanded={expanded === idx}
                  onChange={() => setExpanded(expanded === idx ? false : idx)}
                  sx={{
                    borderRadius: '0.75rem',
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.5)'
                        : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': {
                      borderColor: '#3b82f6',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ChevronDown
                        size={20}
                        style={{
                          transition: 'transform 0.3s ease',
                          transform: expanded === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    }
                    sx={{
                      py: 2,
                      '&.Mui-expanded': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(59, 130, 246, 0.05)'
                            : 'rgba(59, 130, 246, 0.08)',
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {article.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 2 }}>
                    <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                      {article.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <HelpCircle size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <Typography sx={{ opacity: 0.5 }}>
                No articles found {searchQuery ? `for "${searchQuery}"` : ''}
              </Typography>
            </Box>
          )}

          {/* Still need help */}
          {filteredArticles.length > 0 && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                borderRadius: '1rem',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'rgba(59, 130, 246, 0.05)',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ mb: 1 }}>Still need help?</Typography>
              <Typography sx={{ opacity: 0.7 }}>
                Contact our support team at support@edusmart.com
              </Typography>
            </Box>
          )}
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Help;
