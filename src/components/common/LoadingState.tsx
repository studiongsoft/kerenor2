import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { rtlColumnSx } from '../../theme/rtlLayout';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'טוען...' }: LoadingStateProps) {
  return (
    <Box
      sx={{
        ...rtlColumnSx,
        alignItems: 'flex-end /* @noflip */',
        py: 8,
        gap: 2,
        width: '100%',
      }}
      role="status"
      aria-live="polite"
    >
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
