'use client ';

import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#43294D',
    },
    secondary: {
      main: '#f3e9f1',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
});

export default theme;
