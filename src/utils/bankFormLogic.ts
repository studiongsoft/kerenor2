import type { BankFormValues } from '../types/bankFormSchema';
import type { BankRowData } from '../types/bank';

export function fromBankRow(row: BankRowData): BankFormValues {
  return {
    name: row.name,
    description: row.description,
    conferences: [],
  };
}

export function toBankRow(values: BankFormValues, existing?: BankRowData): BankRowData {
  return {
    id: existing?.id ?? `bank-${Date.now()}`,
    name: values.name.trim(),
    description: values.description.trim(),
    version: existing?.version ?? 'V1',
    conferenceCount: values.conferences.length,
  };
}
