import { Box, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)({
  userSelect: 'none',
  transition: 'box-shadow 0.15s',
});

export const StyledCardContent = styled(CardContent)({
  padding: '8px 10px !important',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 4,
});

export const CardTextContent = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
});

export const DescriptionRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 4,
});

export const DeleteCardButton = styled(IconButton)(({ theme }) => ({
  opacity: 0,
  flexShrink: 0,
  padding: 2,
  color: theme.palette.text.secondary,
  '.MuiCard-root:hover &': { opacity: 1 },
  '&:hover': { color: theme.palette.error.main },
}));
