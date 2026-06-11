import { forwardRef } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { POPUP_BORDER_RADIUS, POPUP_SHADOW } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';
import type { ToastAction } from './toastMessages';

const TOAST_POSITIVE_ICON = '#2E7D32';
const TOAST_DELETE_ICON = '#D32F2F';
const TOAST_DARK_BG = '#2B2B2B';

interface AppToastProps {
  message: string;
  action: ToastAction;
  onDismiss: () => void;
}

function ToastActionIcon({ action }: { action: ToastAction }) {
  const iconSx = {
    flexShrink: 0,
    fontSize: 28,
  };

  if (action === 'add') {
    return <AddCircleOutlineIcon aria-hidden sx={{ ...iconSx, color: TOAST_POSITIVE_ICON }} />;
  }

  if (action === 'edit') {
    return <CheckCircleOutlineIcon aria-hidden sx={{ ...iconSx, color: TOAST_POSITIVE_ICON }} />;
  }

  return <DeleteOutlineIcon aria-hidden sx={{ ...iconSx, color: TOAST_DELETE_ICON }} />;
}

export const AppToast = forwardRef<HTMLDivElement, AppToastProps>(function AppToast(
  { message, action, onDismiss },
  ref,
) {
  return (
    <Box
      ref={ref}
      role="status"
      aria-live="polite"
      dir="rtl"
      sx={[
        rtlTextSx,
        (theme) => ({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          p: '16px',
          minWidth: 280,
          maxWidth: 560,
          borderRadius: `${POPUP_BORDER_RADIUS}px`,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: POPUP_SHADOW,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          ...theme.applyStyles('dark', {
            bgcolor: TOAST_DARK_BG,
            borderColor: 'rgba(255, 255, 255, 0.12)',
            color: theme.palette.common.white,
          }),
        }),
      ]}
    >
      <ToastActionIcon action={action} />
      <Typography
        variant="body1"
        sx={[rtlTextSx, { flex: 1, fontSize: 16, lineHeight: 1.5 }]}
      >
        {message}
      </Typography>
      <IconButton
        aria-label="סגירה"
        size="small"
        onClick={onDismiss}
        sx={{
          flexShrink: 0,
          color: 'text.secondary',
          p: 0.5,
          '&:hover': {
            color: 'text.primary',
            bgcolor: 'action.hover',
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
});
