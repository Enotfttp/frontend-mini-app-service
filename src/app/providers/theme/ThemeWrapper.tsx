import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';

import { useThemeStore } from '@shared/lib/theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const { mode } = useThemeStore();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#0c1015',
                  paper: '#151b24',
                },
              }
            : {
                background: {
                  default: '#f0f3f8',
                  paper: '#ffffff',
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
