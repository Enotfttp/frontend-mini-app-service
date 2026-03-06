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
        palette: { mode },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
