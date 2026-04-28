import { styled } from '@mui/material/styles';

export const ModalWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== '$customWidth',
})<{ $customWidth: string }>(({ theme, $customWidth }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
  width: $customWidth,
  maxWidth: 'min(calc(100vw - 32px), 760px)',
  maxHeight: 'calc(100vh - 32px)',
  overflow: 'auto',
  borderRadius: 14,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[theme.palette.mode === 'dark' ? 16 : 8],
  padding: theme.spacing(2.25, 2.5),
}));
