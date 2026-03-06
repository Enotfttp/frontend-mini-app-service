import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AddCardButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  justifyContent: 'flex-start',
  textTransform: 'none',
  borderRadius: 4,
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

export const AddCardForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const AddCardActions = styled(Box)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});
