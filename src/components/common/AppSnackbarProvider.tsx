import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarMessage {
  message: string;
  severity: SnackbarSeverity;
}

interface SnackbarContextValue {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function AppSnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SnackbarMessage>({
    message: '',
    severity: 'info',
  });

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarSeverity = 'info') => {
      setCurrent({ message, severity });
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback((_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={current.severity} variant="filled" sx={{ width: '100%' }}>
          {current.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within AppSnackbarProvider');
  }
  return context;
}
