import {
  CAMPAIGN_FORM_DIALOG_WIDTH,
  CONFERENCE_FORM_DIALOG_WIDTH,
  DIALOG_EDGE_PADDING,
  DIALOG_TITLE_CONTENT_GAP,
  POPUP_SEARCH_ACTION_GAP,
  TEXT_FIELD_WIDTH,
} from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';

export { DIALOG_TITLE_CONTENT_GAP, TEXT_FIELD_WIDTH };

/** Vertical gap between major form sections (32px) */
export const FORM_DIALOG_BODY_STACK_SPACING = 4;

/** Large form popup — campaign (900px wide, height fits content) */
export const formDialogSlotProps = {
  paper: {
    sx: {
      width: CAMPAIGN_FORM_DIALOG_WIDTH,
      maxWidth: CAMPAIGN_FORM_DIALOG_WIDTH,
      height: 'fit-content',
    },
  },
} as const;

/** Bank add/edit — same width as campaign, height fits content (no date row) */
export const bankFormDialogSlotProps = {
  paper: {
    sx: {
      width: CAMPAIGN_FORM_DIALOG_WIDTH,
      maxWidth: CAMPAIGN_FORM_DIALOG_WIDTH,
    },
  },
} as const;

/** Conference add/edit popup */
export const conferenceFormDialogSlotProps = {
  paper: {
    sx: {
      width: CONFERENCE_FORM_DIALOG_WIDTH,
      maxWidth: CONFERENCE_FORM_DIALOG_WIDTH,
    },
  },
} as const;

/** @deprecated use conferenceFormDialogSlotProps */
export const compactFormDialogSlotProps = conferenceFormDialogSlotProps;

/** Confirmation popups */
export const confirmDialogSlotProps = {
  paper: {
    sx: {
      width: 480,
      maxWidth: 480,
    },
  },
} as const;

export const formDialogContentSx = {
  px: `${DIALOG_EDGE_PADDING}px`,
  pt: `${DIALOG_EDGE_PADDING}px`,
  pb: `${DIALOG_EDGE_PADDING}px`,
  width: '100%',
  height: 'fit-content',
  ...rtlTextSx,
} as const;

export const formDialogFieldRowSx = {
  flexDirection: 'row /* @noflip */',
  gap: 2,
  width: '100%',
} as const;

export const formDialogBodyTextSx = {
  ...rtlTextSx,
  width: '100%',
} as const;

export const textFieldWidthSx = {
  width: TEXT_FIELD_WIDTH,
  maxWidth: TEXT_FIELD_WIDTH,
  flexShrink: 0,
} as const;

export const popupSearchActionRowSx = {
  display: 'flex',
  direction: 'ltr /* @noflip */',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end /* @noflip */',
  gap: `${POPUP_SEARCH_ACTION_GAP}px`,
  mb: 2,
} as const;
