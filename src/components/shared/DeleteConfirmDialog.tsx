import { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { rtlTextSx } from '../../theme/rtlLayout';

interface PendingDelete {
  id: string;
  name: string;
}

export function useDeleteConfirm(onDelete: (id: string) => void | Promise<void>) {
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
    await onDelete(pending.id);
    setPending(null);
  }, [onDelete, pending]);

  return { pending, requestDelete, cancelDelete, confirmDelete };
}

interface DeleteConfirmDialogProps {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ open, name, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} dir="rtl">
      <DialogTitle sx={rtlTextSx}>אישור מחיקה</DialogTitle>
      <DialogContent sx={rtlTextSx}>
        <Typography sx={rtlTextSx}>האם אתה בטוח שברצונך למחוק את {name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onConfirm}>
          מחק
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          ביטול
        </Button>
      </DialogActions>
    </Dialog>
  );
}
