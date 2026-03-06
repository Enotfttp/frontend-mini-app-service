import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BoardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  padding: 16,
  alignItems: 'flex-start',
  overflowX: 'auto',
  minHeight: 'calc(100vh - 56px)',
});
