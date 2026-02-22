import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authService = {
  register: (data) => api.post('/auth/register', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (data) => api.post('/auth/resend-otp', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Student endpoints
export const studentService = {
  getAllStudents: (params) => api.get('/students', { params }),
  getStudent: (id) => api.get(`/students/${id}`),
  createStudent: (data) => api.post('/students', data),
  updateStudent: (id, data) => api.put(`/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  getDashboardStats: () => api.get('/students/stats/dashboard'),
  exportStudents: () => api.get('/students/export/csv', { responseType: 'blob' }),
};

// Support endpoints
export const supportService = {
  createTicket: (data) => api.post('/support', data),
  getMyTickets: () => api.get('/support/my-tickets'),
  getTicket: (id) => api.get(`/support/${id}`),
  addReply: (id, data) => api.post(`/support/${id}/reply`, data),
  closeTicket: (id) => api.put(`/support/${id}/close`),
};

// Settings endpoints
export const settingsService = {
  getSettings: () => api.get('/settings'),
  updateNotifications: (data) => api.put('/settings/notifications', data),
  updatePreferences: (data) => api.put('/settings/preferences', data),
  updatePrivacy: (data) => api.put('/settings/privacy', data),
};

// Help endpoints
export const helpService = {
  getAllArticles: () => api.get('/help'),
  getByCategory: (category) => api.get(`/help/category/${category}`),
  getArticle: (slug) => api.get(`/help/${slug}`),
  searchArticles: (query) => api.get('/help/search', { params: { q: query } }),
  createArticle: (data) => api.post('/help/admin/create', data),
};

// Documents endpoints
export const documentsService = {
  getDocuments: () => api.get('/documents'),
  // data: FormData with fields title, description and optional file under 'file'
  uploadDocument: (formData) => api.post('/documents', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  createDocument: (data) => api.post('/documents', data),
  deleteDocument: (id) => api.delete(`/documents/${id}`),
};

// Academic endpoints
export const academicService = {
  getCourses: () => api.get('/academic/courses'),
  createCourse: (data) => api.post('/academic/courses', data),
  getGrades: () => api.get('/academic/grades'),
  createGrade: (data) => api.post('/academic/grades', data),
  getAttendance: () => api.get('/academic/attendance'),
  createAttendance: (data) => api.post('/academic/attendance', data),
};

// Applications endpoints
export const applicationService = {
  getApplications: () => api.get('/applications'),
  createApplication: (data) => api.post('/applications', data),
  updateApplication: (id, data) => api.put(`/applications/${id}`, data),
};

export default api;
