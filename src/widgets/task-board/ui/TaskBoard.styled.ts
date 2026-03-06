import { Box, Card, CardContent, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// ─── Board ────────────────────────────────────────────────────────────────────

export const BoardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  padding: 16,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  overflowX: 'auto',
  minHeight: 'calc(100vh - 56px)',
});

// ─── Column ───────────────────────────────────────────────────────────────────

export const ColumnPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  minWidth: 300,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 'calc(100vh - 100px)',
  flexShrink: 0,
}));

export const ColumnHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 12px 8px',
  gap: 8,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ColumnCardsList = styled(Box)({
  overflowY: 'auto',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  flexGrow: 1,
});

// ─── Task Card ────────────────────────────────────────────────────────────────

export const TaskCardPaper = styled(Card)({
  userSelect: 'none',
  transition: 'box-shadow 0.15s',
  cursor: 'default',
});

export const TaskCardContent = styled(CardContent)({
  padding: '10px 12px !important',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

export const TaskCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 4,
});

export const TaskCardMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
});

export const TaskCardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 4,
});

export const DeleteTaskButton = styled(IconButton)(({ theme }) => ({
  opacity: 0,
  padding: 2,
  flexShrink: 0,
  color: theme.palette.text.secondary,
  '.MuiCard-root:hover &': { opacity: 1 },
  '&:hover': { color: theme.palette.error.main },
}));
