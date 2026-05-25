import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import {
  campaignFormSchema,
  defaultCampaignFormValues,
  type CampaignFormValues,
} from '../../types/campaignFormSchema';
import type { CampaignRowData } from '../../types/campaign';
import {
  formatConferencesForForm,
  parseConferencesFromText,
  syncConferenceCount,
} from '../../utils/campaignListLogic';

function fromRow(row: CampaignRowData): CampaignFormValues {
  return {
    name: row.name,
    startTime: row.startTime,
    startDate: row.startDate,
    endTime: row.endTime,
    endDate: row.endDate,
    version: row.version,
    conferencesText: formatConferencesForForm(row.conferences),
  };
}

function toRow(values: CampaignFormValues, existing?: CampaignRowData): CampaignRowData {
  const conferences = parseConferencesFromText(values.conferencesText);
  const base: CampaignRowData = {
    id: existing?.id ?? `campaign-${Date.now()}`,
    name: values.name.trim(),
    startTime: values.startTime.trim(),
    startDate: values.startDate.trim(),
    endTime: values.endTime.trim(),
    endDate: values.endDate.trim(),
    version: values.version.trim(),
    conferences,
    conferenceCount: conferences.length,
    actionType: existing?.actionType ?? 'actions',
  };
  return syncConferenceCount(base);
}

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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: defaultCampaignFormValues,
  });

  React.useEffect(() => {
    if (open) {
      reset(initialRow ? fromRow(initialRow) : defaultCampaignFormValues);
    }
  }, [open, initialRow, reset]);

  const onSubmit = (values: CampaignFormValues) => {
    onSave(toRow(values, initialRow));
  };

  return (
    <Dialog open={open} onClose={onClose} dir="rtl" fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>{mode === 'add' ? 'הוספת מבצע' : 'עריכת מבצע'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="שם המבצע"
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register('name')}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="תאריך התחלה"
                placeholder="DD/MM/YYYY"
                fullWidth
                error={Boolean(errors.startDate)}
                helperText={errors.startDate?.message}
                {...register('startDate')}
              />
              <TextField
                label="שעת התחלה"
                placeholder="HH:MM"
                fullWidth
                error={Boolean(errors.startTime)}
                helperText={errors.startTime?.message}
                {...register('startTime')}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="תאריך סיום"
                placeholder="DD/MM/YYYY"
                fullWidth
                error={Boolean(errors.endDate)}
                helperText={errors.endDate?.message}
                {...register('endDate')}
              />
              <TextField
                label="שעת סיום"
                placeholder="HH:MM"
                fullWidth
                error={Boolean(errors.endTime)}
                helperText={errors.endTime?.message}
                {...register('endTime')}
              />
            </Stack>
            <TextField
              label="גרסה"
              fullWidth
              error={Boolean(errors.version)}
              helperText={errors.version?.message}
              {...register('version')}
            />
            <TextField
              label="ועידות (שורה לכל ועידה, אופציונלי: שם | בנק)"
              multiline
              minRows={3}
              fullWidth
              {...register('conferencesText')}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>ביטול</Button>
          <Button type="submit" variant="contained">
            {mode === 'add' ? 'הוספה' : 'שמירה'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
