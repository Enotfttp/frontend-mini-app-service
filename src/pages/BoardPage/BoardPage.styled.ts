import { AppBar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageWrapper = styled(Box)({
  minHeight: '100vh',
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  color: theme.palette.text.primary, // override AppBar's default white (primary.contrastText)
}));
