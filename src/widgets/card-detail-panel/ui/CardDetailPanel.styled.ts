import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DrawerContent = styled(Box)({
  width: 380,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowX: 'hidden',
});

export const DetailHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '14px 16px',
  minHeight: 56,
  backgroundColor: theme.palette.background.paper,
}));
