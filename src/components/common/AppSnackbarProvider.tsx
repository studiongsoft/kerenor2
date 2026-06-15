import { useCallback, useState, type ReactNode, type SyntheticEvent } from 'react';
import Slide from '@mui/material/Slide';
import type { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { TOAST_TOP_OFFSET } from '../../config/navigation';
import { AppToast } from './AppToast';
import { SnackbarContext } from './snackbarContext';
import { formatItemToastMessage, type ItemToastPayload } from './toastMessages';

export { useSnackbar } from './snackbarContext';
export type { SnackbarContextValue } from './snackbarContext';

/** Default 4s + 25% */
const TOAST_AUTO_HIDE_MS = 5000;

interface SnackbarMessage extends ItemToastPayload {
  text: string;
}

function SlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export function AppSnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SnackbarMessage>({
    entity: 'campaign',
    action: 'add',
    name: '',
    text: '',
  });

  const showItemToast = useCallback((payload: ItemToastPayload) => {
    setCurrent({
      ...payload,
      text: formatItemToastMessage(payload),
    });
    setOpen(true);
  }, []);

  const handleClose = useCallback((_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, []);

  const handleDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showItemToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={TOAST_AUTO_HIDE_MS}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        slots={{ transition: SlideDown }}
        dir="rtl"
        sx={{
          top: `${TOAST_TOP_OFFSET}px !important`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '@media (prefers-reduced-motion: reduce)': {
            '& .MuiSlide-root': {
              transition: 'none !important',
            },
          },
        }}
      >
        <AppToast message={current.text} action={current.action} onDismiss={handleDismiss} />
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
