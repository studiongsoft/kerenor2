import { useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { confirmDialogSlotProps } from './dialogLayout';
import { PrimarySecondaryActions } from './PrimarySecondaryActions';
import { rtlTextSx } from '../../theme/rtlLayout';

interface PendingDelete {
  id: string;
  name: string;
}

export const deleteWarningMessages = {
  campaign: 'שים לב, לא ניתן לשחזר מבצע שנמחק.',
  bank: 'שים לב, לא ניתן לשחזר בנק שנמחק.',
  conference: 'שים לב, לא ניתן לשחזר ועידה שנמחקה.',
} as const;

export function useDeleteConfirm(onDelete: (id: string, name: string) => void | Promise<void>) {
  const [pending, setPending] = useState<PendingDelete | null>(null);

  const requestDelete = useCallback((id: string, name: string) => {
    setPending({ id, name });
  }, []);

  const cancelDelete = useCallback(() => {
    setPending(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!pending) {
      return;
    }
    await onDelete(pending.id, pending.name);
    setPending(null);
  }, [onDelete, pending]);

  return { pending, requestDelete, cancelDelete, confirmDelete };
}

interface DeleteConfirmDialogProps {
  open: boolean;
  name: string;
  warningMessage: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  open,
  name,
  warningMessage,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} dir="rtl" slotProps={confirmDialogSlotProps}>
      <Box
        sx={{
          display: 'flex',
          direction: 'ltr /* @noflip */',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <IconButton aria-label="סגירה" onClick={onCancel} size="small" sx={{ flexShrink: 0 }}>
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            flex: 1,
            fontWeight: 400,
            ...rtlTextSx,
          }}
        >
          אישור מחיקה
        </Typography>
      </Box>

      <DialogContent sx={{ px: 2, pt: 0, pb: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={[rtlTextSx, { mb: 0.5 }]}>
          {warningMessage}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={rtlTextSx}>
          האם אתה בטוח שברצונך למחוק את{' '}
          <Box component="span" sx={{ fontWeight: 600 }}>
            {name}
          </Box>
          ?
        </Typography>
      </DialogContent>

      <Box sx={{ px: 2, py: 2 }}>
        <PrimarySecondaryActions
          primary={
            <Button variant="contained" color="error" onClick={onConfirm}>
              מחיקה
            </Button>
          }
          secondary={
            <Button variant="outlined" color="error" onClick={onCancel}>
              ביטול
            </Button>
          }
        />
      </Box>
    </Dialog>
  );
}
