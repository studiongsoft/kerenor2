export type ToastEntity = 'campaign' | 'bank' | 'conference';
export type ToastAction = 'add' | 'edit' | 'delete';

export interface ItemToastPayload {
  entity: ToastEntity;
  action: ToastAction;
  name: string;
}

const ENTITY_COPY: Record<
  ToastEntity,
  { label: string; added: string; edited: string; deleted: string }
> = {
  campaign: {
    label: 'המבצע',
    added: 'נוסף',
    edited: 'עודכן',
    deleted: 'נמחק',
  },
  bank: {
    label: 'הבנק',
    added: 'נוסף',
    edited: 'עודכן',
    deleted: 'נמחק',
  },
  conference: {
    label: 'הועידה',
    added: 'נוספה',
    edited: 'עודכנה',
    deleted: 'נמחקה',
  },
};

const ACTION_VERB: Record<ToastAction, keyof (typeof ENTITY_COPY)['campaign']> = {
  add: 'added',
  edit: 'edited',
  delete: 'deleted',
};

export function formatItemToastMessage({ entity, action, name }: ItemToastPayload): string {
  const copy = ENTITY_COPY[entity];
  const verb = copy[ACTION_VERB[action]];
  return `${copy.label} '${name}' ${verb} בהצלחה`;
}
