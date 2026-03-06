import { Box, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  paddingTop: '16px !important',
});

export const TimeEstimateHint = styled(Box)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginTop: 2,
}));

export const CreatorRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});
