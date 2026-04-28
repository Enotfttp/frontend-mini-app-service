import { styled } from '@mui/material/styles';

export const ErrorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 100,
  gap: 10,
  fontFamily: 'inherit',
  minHeight: '40vh',
  color: theme.palette.text.primary,
}));

export const ErrorIcon = styled('span')(({ theme }) => ({
  fontSize: 72,
  lineHeight: 1,
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
    '40%': { transform: 'translateY(-10px)' },
    '60%': { transform: 'translateY(-5px)' },
  },
  animation: 'bounce 2s infinite',
  filter: theme.palette.mode === 'dark' ? 'grayscale(0.2)' : 'none',
}));

export const ErrorTitle = styled('h1')(({ theme }) => ({
  fontSize: 28,
  fontWeight: 700,
  color: theme.palette.text.primary,
  margin: 0,
}));

export const ErrorDescription = styled('p')(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.secondary,
  margin: 0,
}));

export const StyledErrorAction = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 12,
  alignItems: 'center',
  marginTop: 16,
});

export const PrimaryButton = styled('button')(({ theme }) => ({
  padding: '10px 20px',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
}));

export const SecondaryButton = styled('button')(({ theme }) => ({
  padding: '10px 20px',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transform: 'translateY(-2px)',
  },
}));

export const StyledErrorDetails = styled('details')(({ theme }) => ({
  marginTop: 15,
  textAlign: 'left',
  maxWidth: 560,
  width: '100%',
  '& summary': {
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 8,
  },
  '& pre': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
    padding: 12,
    borderRadius: 6,
    fontSize: 12,
    overflowX: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
  },
}));
