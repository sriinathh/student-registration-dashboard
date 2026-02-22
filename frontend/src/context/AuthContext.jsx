import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set authorization header
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      fetchMe();
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchMe = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.log('Error fetching user:', error);
      setToken(null);
    }
  };

  const register = async (name, rollNumber, email, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', {
        name,
        rollNumber,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (userId, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/verify-otp', { userId, otp });
      setToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/resend-otp', { userId });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Resend OTP failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { identifier, password });
      setToken(response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Forgot password failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (userId, otp, newPassword, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/reset-password', {
        userId,
        otp,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Reset password failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (name, phone, branch, semester, address, avatarData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put('/auth/update-profile', {
        name,
        phone,
        branch,
        semester,
        ...(address !== undefined && { address }),
        ...(avatarData && { avatarData }),
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Update profile failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (avatarData) => {
    setLoading(true);
    setError(null);
    try {
      // If avatarData is a File, send as multipart/form-data
      if (avatarData instanceof File) {
        const form = new FormData();
        form.append('avatar', avatarData);
        const response = await api.put('/auth/upload-avatar', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUser(response.data.user);
        return response.data;
      }

      // otherwise send base64
      const response = await api.put('/auth/upload-avatar', { avatarData });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Avatar upload failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Change password failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        verifyOTP,
        resendOTP,
        login,
        forgotPassword,
        resetPassword,
        updateProfile,
        uploadAvatar,
        changePassword,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
