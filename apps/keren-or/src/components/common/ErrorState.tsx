import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'אירעה שגיאה בטעינת הנתונים',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Alert
        severity="error"
        action={
          onRetry ? (
            <Button color="inherit" size="small" onClick={onRetry}>
              נסו שוב
            </Button>
          ) : undefined
        }
      >
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Box>
  );
}
