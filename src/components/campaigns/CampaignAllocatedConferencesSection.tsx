import type { Control, FieldErrors } from 'react-hook-form';
import type { CampaignFormValues } from '../../types/campaignFormSchema';
import type { ConferenceAllocation } from '../../types/conferenceAllocationSchema';
import { AllocatedConferencesSection } from '../shared/AllocatedConferencesSection';

type ConferencesFormSlice = { conferences: ConferenceAllocation[] };

interface CampaignAllocatedConferencesSectionProps {
  control: Control<CampaignFormValues>;
  errors: FieldErrors<CampaignFormValues>;
}

/** @deprecated Use AllocatedConferencesSection directly */
export function CampaignAllocatedConferencesSection({
  control,
  errors,
}: CampaignAllocatedConferencesSectionProps) {
  return (
    <AllocatedConferencesSection
      control={control as unknown as Control<ConferencesFormSlice>}
      errors={errors as unknown as FieldErrors<ConferencesFormSlice>}
      sectionTitle={(count) => `ועידות מוקצעות במבצע (${count})`}
      conflictsColumnLabel="התנגשויות בתורן"
    />
  );
}
