// Premium SaaS Color System
export const colors = {
  dark: {
    bg: {
      primary: '#0f172a', // Main background
      secondary: '#1e293b', // Secondary surface
      tertiary: '#334155', // Tertiary surface
    },
    text: {
      primary: '#f1f5f9', // Main text
      secondary: '#cbd5e1', // Secondary text
      tertiary: '#94a3b8', // Tertiary text
    },
    border: '#334155',
    accent: '#3b82f6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#8b5cf6',
  },
  light: {
    bg: {
      primary: '#ffffff', // Main background
      secondary: '#eef5ff', // Secondary surface - distinct light blue
      tertiary: '#f1f5f9', // Tertiary surface
    },
    text: {
      primary: '#0f172a', // Main text
      secondary: '#475569', // Secondary text
      tertiary: '#64748b', // Tertiary text
    },
    border: '#bfdbfe',
    accent: '#3b82f6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#8b5cf6',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', // Blue to Purple
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Green
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', // Red
  subtle: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
};
