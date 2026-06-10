import type { ConferenceFormValues } from '../types/conferenceFormSchema';
import type { ConferenceRowData } from '../types/conference';

export function fromConferenceRow(row: ConferenceRowData): ConferenceFormValues {
  return {
    number: row.number,
    code: row.code,
    purpose: row.purpose,
    description: row.description,
  };
}

export function toConferenceRow(values: ConferenceFormValues, existing?: ConferenceRowData): ConferenceRowData {
  return {
    id: existing?.id ?? `conference-${Date.now()}`,
    number: values.number.trim(),
    code: values.code.trim(),
    purpose: values.purpose.trim(),
    description: values.description.trim(),
  };
}
