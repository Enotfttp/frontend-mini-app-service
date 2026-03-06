import { Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AddColumnButton = styled(Button)(({ theme }) => ({
  minWidth: 272,
  height: 42,
  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)',
  backdropFilter: 'blur(4px)',
  justifyContent: 'flex-start',
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 8,
  flexShrink: 0,
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.12)',
  },
}));

export const AddColumnPaper = styled(Paper)({
  minWidth: 272,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderRadius: 8,
  flexShrink: 0,
});

export const AddColumnActions = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});
