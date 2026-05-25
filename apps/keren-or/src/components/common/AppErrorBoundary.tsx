import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: 480, width: '100%' }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                אירעה שגיאה בלתי צפויה
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error?.message || 'נסו לרענן את הדף'}
              </Typography>
            </Alert>
            <Button variant="contained" onClick={this.handleRetry}>
              נסו שוב
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
