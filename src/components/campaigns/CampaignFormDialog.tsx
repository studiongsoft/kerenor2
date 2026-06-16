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
  campaignFormSchema,
  defaultCampaignFormValues,
  type CampaignFormValues,
} from '../../types/campaignFormSchema';
import type { ConferenceAllocation } from '../../types/conferenceAllocationSchema';
import type { CampaignRowData } from '../../types/campaign';
import { fromCampaignRow, toCampaignRow } from '../../utils/campaignFormLogic';
import { rtlTextSx } from '../../theme/rtlLayout';
import { AllocatedConferencesSection } from '../shared/AllocatedConferencesSection';
import {
  FORM_DIALOG_BODY_STACK_SPACING,
  formDialogContentSx,
  formDialogFieldRowSx,
  formDialogSlotProps,
  DIALOG_TITLE_CONTENT_GAP,
  textFieldWidthSx,
} from '../shared/dialogLayout';
import { DialogFormHeader } from '../shared/DialogFormHeader';
import { PrimarySecondaryActions } from '../shared/PrimarySecondaryActions';
import { CampaignFormDateTimeField } from './CampaignFormDateTimeField';

type ConferencesFormSlice = { conferences: ConferenceAllocation[] };

interface CampaignFormDialogProps {
  open: boolean;
  mode: 'add' | 'edit';
  initialRow?: CampaignRowData;
  onClose: () => void;
  onSave: (row: CampaignRowData) => void;
}

export function CampaignFormDialog({
  open,
  mode,
  initialRow,
  onClose,
  onSave,
}: CampaignFormDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: defaultCampaignFormValues,
    mode: 'onChange',
  });

  const startDate = watch('startDate');
  const startTime = watch('startTime');
  const endDate = watch('endDate');
  const endTime = watch('endTime');

  useEffect(() => {
    if (open) {
      reset(initialRow ? fromCampaignRow(initialRow) : defaultCampaignFormValues);
    }
  }, [open, initialRow, reset]);

  const onSubmit = (values: CampaignFormValues) => {
    onSave(toCampaignRow(values, initialRow));
  };

  const title = mode === 'add' ? 'מבצע חדש' : 'עריכת מבצע';

  return (
    <Dialog open={open} onClose={onClose} dir="rtl" slotProps={formDialogSlotProps}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogFormHeader
          title={title}
          onClose={onClose}
          titleVariant="h4"
          titleBottomGap={DIALOG_TITLE_CONTENT_GAP}
        />

        <Box sx={formDialogContentSx}>
          <Stack spacing={FORM_DIALOG_BODY_STACK_SPACING}>
            <Stack sx={formDialogFieldRowSx}>
              <TextField
                label="שם המבצע"
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

            <Stack sx={formDialogFieldRowSx}>
              <Box sx={textFieldWidthSx}>
                <CampaignFormDateTimeField
                  label="מועד התחלה"
                  required
                  date={startDate}
                  time={startTime}
                  skipTimeLabel="כל היום"
                  onDateChange={(value) => setValue('startDate', value, { shouldValidate: true })}
                  onTimeChange={(value) => setValue('startTime', value, { shouldValidate: true })}
                  error={Boolean(errors.startDate || errors.startTime)}
                  helperText={errors.startDate?.message ?? errors.startTime?.message}
                />
              </Box>
              <Box sx={textFieldWidthSx}>
                <CampaignFormDateTimeField
                  label="מועד סיום"
                  date={endDate}
                  time={endTime}
                  skipTimeLabel="לא משנה"
                  onDateChange={(value) => setValue('endDate', value, { shouldValidate: true })}
                  onTimeChange={(value) => setValue('endTime', value, { shouldValidate: true })}
                />
              </Box>
            </Stack>

            <Divider />

            <AllocatedConferencesSection
              control={control as unknown as Control<ConferencesFormSlice>}
              errors={errors as unknown as FieldErrors<ConferencesFormSlice>}
              sectionTitle={(count) => `ועידות מוקצעות במבצע (${count})`}
              conflictsColumnLabel="התנגשויות בתורן"
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
