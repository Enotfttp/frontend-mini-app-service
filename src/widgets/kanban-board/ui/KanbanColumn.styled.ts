import { Box, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ColumnPaper = styled(Paper)(({ theme }) => ({
  width: 272,
  minWidth: 272,
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 100px)',
  flexShrink: 0,
}));

export const ColumnHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 8px 4px',
  gap: 4,
});

export const DragHandle = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.text.disabled,
  cursor: 'grab',
  flexShrink: 0,
  '&:active': { cursor: 'grabbing' },
}));

export const CardsList = styled(Box)({
  overflowY: 'auto',
  padding: '0 8px 4px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flexGrow: 1,
});

export const ColumnFooter = styled(Box)({
  padding: '0 8px 8px',
});

export const DeleteColumnButton = styled(IconButton)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.text.disabled,
  '&:hover': { color: theme.palette.error.main },
}));
