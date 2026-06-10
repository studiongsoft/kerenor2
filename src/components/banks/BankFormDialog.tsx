import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { Control, FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  bankFormSchema,
  defaultBankFormValues,
  type BankFormValues,
} from '../../types/bankFormSchema';
import type { ConferenceAllocation } from '../../types/conferenceAllocationSchema';
import type { BankRowData } from '../../types/bank';
import { fromBankRow, toBankRow } from '../../utils/bankFormLogic';
import { rtlTextSx } from '../../theme/rtlLayout';
import { AllocatedConferencesSection } from '../shared/AllocatedConferencesSection';
import {
  bankFormDialogSlotProps,
  formDialogContentSx,
  formDialogFieldRowSx,
  DIALOG_TITLE_CONTENT_GAP,
  textFieldWidthSx,
} from '../shared/dialogLayout';
import { DialogFormHeader } from '../shared/DialogFormHeader';
import { PrimarySecondaryActions } from '../shared/PrimarySecondaryActions';

interface BankFormDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  initialRow?: BankRowData;
  onClose: () => void;
  onSave: (row: BankRowData) => void;
}

type ConferencesFormSlice = { conferences: ConferenceAllocation[] };

export function BankFormDialog({
  open,
  mode,
  initialRow,
  onClose,
  onSave,
}: BankFormDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: defaultBankFormValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (open) {
      reset(initialRow ? fromBankRow(initialRow) : defaultBankFormValues);
    }
  }, [open, initialRow, reset]);

  const onSubmit = (values: BankFormValues) => {
    onSave(toBankRow(values, initialRow));
  };

  const title = mode === 'add' ? 'הוספת בנק' : 'עריכת בנק';

  return (
    <Dialog open={open} onClose={onClose} dir="rtl" slotProps={bankFormDialogSlotProps}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogFormHeader
          title={title}
          onClose={onClose}
          titleVariant="h4"
          titleBottomGap={DIALOG_TITLE_CONTENT_GAP}
        />

        <Box sx={formDialogContentSx}>
          <Stack spacing={2.5}>
            <Stack sx={formDialogFieldRowSx}>
              <TextField
                label="שם הבנק"
                required
                sx={textFieldWidthSx}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                slotProps={{
                  input: { sx: rtlTextSx },
                  inputLabel: { sx: rtlTextSx },
                }}
                {...register('name')}
              />
              <TextField
                label="תיאור"
                sx={textFieldWidthSx}
                slotProps={{
                  input: { sx: rtlTextSx },
                  inputLabel: { sx: rtlTextSx },
                }}
                {...register('description')}
              />
            </Stack>

            <Divider />

            <AllocatedConferencesSection
              control={control as unknown as Control<ConferencesFormSlice>}
              errors={errors as unknown as FieldErrors<ConferencesFormSlice>}
              sectionTitle={(count) => `ועידות בבנק (${count})`}
              conflictsColumnLabel="התנגשויות (בנקים)"
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
