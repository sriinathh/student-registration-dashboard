import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colors, gradients } from './colors';

const createCustomTheme = (mode) => {
  const isDark = mode === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const base = createTheme({
    palette: {
      mode,
      primary: {
        main: palette.accent,
        light: '#60a5fa',
        dark: '#1e40af',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#6d28d9',
      },
      error: {
        main: palette.error,
      },
      warning: {
        main: palette.warning,
      },
      success: {
        main: palette.success,
      },
      info: {
        main: palette.info,
      },
      background: {
        default: palette.bg.primary,
        paper: palette.bg.secondary,
      },
      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
        disabled: palette.text.tertiary,
      },
      divider: palette.border,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 700,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark
                ? '0 20px 40px rgba(59, 130, 246, 0.3)'
                : '0 20px 40px rgba(59, 130, 246, 0.2)',
            },
          },
          contained: {
            background: gradients.primary,
            color: '#fff',
            boxShadow: isDark
              ? '0 10px 30px rgba(59, 130, 246, 0.2)'
              : '0 10px 30px rgba(59, 130, 246, 0.15)',
            '&:hover': {
              background: gradients.primary,
            },
          },
          outlined: {
            borderColor: palette.accent,
            color: palette.accent,
            '&:hover': {
              borderColor: palette.accent,
              backgroundColor: isDark
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(59, 130, 246, 0.05)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.75rem',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.08)',
              transition: 'all 0.3s ease',
              '& fieldset': {
                borderColor: palette.border,
              },
              '&:hover fieldset': {
                borderColor: palette.accent,
              },
              '&.Mui-focused fieldset': {
                borderColor: palette.accent,
                borderWidth: '2px',
                boxShadow: isDark
                  ? '0 0 0 4px rgba(59, 130, 246, 0.1)'
                  : '0 0 0 4px rgba(59, 130, 246, 0.15)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '1rem',
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.bg.secondary,
            boxShadow: isDark
              ? '0 10px 30px rgba(0, 0, 0, 0.3)'
              : '0 10px 30px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark
                ? '0 20px 50px rgba(0, 0, 0, 0.5)'
                : '0 20px 50px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg.secondary,
            borderBottom: `2px solid ${isDark ? 'rgba(59, 130, 246, 0.3)' : '#bfdbfe'}`,
            boxShadow: isDark
              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
              : '0 2px 10px rgba(59, 130, 246, 0.15)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.bg.secondary,
            borderRight: `1px solid ${palette.border}`,
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg.secondary,
            backgroundImage: 'none',
            borderRadius: '1rem',
            border: `1px solid ${palette.border}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: palette.border,
          },
          head: {
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.12)',
            fontWeight: 600,
            color: isDark ? palette.text.primary : '#0f172a',
          },
        },
      },
    },
  });
  // make typography scale responsively across breakpoints
  return responsiveFontSizes(base, { factor: 2 });
};

export default createCustomTheme;
