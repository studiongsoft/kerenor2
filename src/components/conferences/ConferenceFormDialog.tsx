import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import {
  conferenceFormSchema,
  defaultConferenceFormValues,
  type ConferenceFormValues,
} from '../../types/conferenceFormSchema';
import type { ConferenceRowData } from '../../types/conference';
import { fromConferenceRow, toConferenceRow } from '../../utils/conferenceFormLogic';
import { rtlTextSx } from '../../theme/rtlLayout';
import {
  conferenceFormDialogSlotProps,
  DIALOG_TITLE_CONTENT_GAP,
  formDialogContentSx,
  textFieldWidthSx,
} from '../shared/dialogLayout';
import { DialogFormHeader } from '../shared/DialogFormHeader';
import { PrimarySecondaryActions } from '../shared/PrimarySecondaryActions';

interface ConferenceFormDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  initialRow?: ConferenceRowData;
  onClose: () => void;
  onSave: (row: ConferenceRowData) => void;
}

export function ConferenceFormDialog({
  open,
  mode,
  initialRow,
  onClose,
  onSave,
}: ConferenceFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ConferenceFormValues>({
    resolver: zodResolver(conferenceFormSchema),
    defaultValues: defaultConferenceFormValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (open) {
      reset(initialRow ? fromConferenceRow(initialRow) : defaultConferenceFormValues);
    }
  }, [open, initialRow, reset]);

  const onSubmit = (values: ConferenceFormValues) => {
    onSave(toConferenceRow(values, initialRow));
  };

  const title = mode === 'add' ? 'הוספת ועידה' : 'עריכת ועידה';

  return (
    <Dialog open={open} onClose={onClose} dir="rtl" slotProps={conferenceFormDialogSlotProps}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogFormHeader
          title={title}
          onClose={onClose}
          titleVariant="h4"
          titleBottomGap={DIALOG_TITLE_CONTENT_GAP}
        />

        <Box sx={formDialogContentSx}>
          <Stack spacing={3}>
            <TextField
              label="מספר (7 ספרות)"
              required
              sx={textFieldWidthSx}
              error={Boolean(errors.number)}
              helperText={errors.number?.message}
              slotProps={{
                input: { sx: rtlTextSx },
                inputLabel: { sx: rtlTextSx },
              }}
              {...register('number')}
            />
            <TextField
              label="ייעוד"
              required
              sx={textFieldWidthSx}
              error={Boolean(errors.purpose)}
              helperText={errors.purpose?.message}
              slotProps={{
                input: { sx: rtlTextSx },
                inputLabel: { sx: rtlTextSx },
              }}
              {...register('purpose')}
            />
            <TextField
              label="קוד (3 ספרות)"
              sx={textFieldWidthSx}
              error={Boolean(errors.code)}
              helperText={errors.code?.message}
              slotProps={{
                input: { sx: rtlTextSx },
                inputLabel: { sx: rtlTextSx },
              }}
              {...register('code')}
            />
            <TextField
              label="תיאור"
              sx={textFieldWidthSx}
              multiline
              minRows={4}
              slotProps={{
                input: { sx: rtlTextSx },
                inputLabel: { sx: rtlTextSx },
              }}
              {...register('description')}
            />

            <PrimarySecondaryActions
              primary={
                <Button type="submit" variant="contained" disabled={!isValid}>
                  שמור
                </Button>
              }
              secondary={
                <Button variant="outlined" onClick={onClose}>
                  ביטול
                </Button>
              }
            />
          </Stack>
        </Box>
      </form>
    </Dialog>
  );
}
