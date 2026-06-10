import {
  POPUP_TABLE_MIN_HEIGHT,
  TABLE_ACTIONS_COLUMN_WIDTH,
  TABLE_CELL_PX,
  TABLE_FOOTER_HEIGHT,
  TABLE_HEAD_HEIGHT,
  TABLE_ROW_HEIGHT,
} from '../../theme/createKerenOrTheme';

export {
  TABLE_ACTIONS_COLUMN_WIDTH,
  TABLE_CELL_PX,
  TABLE_FOOTER_HEIGHT,
  TABLE_HEAD_HEIGHT,
  TABLE_ROW_HEIGHT,
};
/** @deprecated Use TABLE_ROW_HEIGHT */
export const TABLE_CELL_HEIGHT = TABLE_ROW_HEIGHT;

/** Loading / error / empty rows — no tbody hover highlight */
export const tableMessageRowSx = {
  '&:hover': {
    backgroundColor: 'transparent',
    '& .MuiTableCell-root': {
      backgroundColor: 'transparent',
    },
  },
} as const;

/** Right-align cell content on the same vertical line as the column header */
export const tableCellInnerSx = {
  display: 'flex',
  width: '100%',
  minWidth: 0,
  height: '100%',
  justifyContent: 'flex-end /* @noflip */',
  alignItems: 'center',
} as const;

export const tableCellInnerCenterSx = {
  ...tableCellInnerSx,
  justifyContent: 'center /* @noflip */',
} as const;

export const tableCellInnerCenterEndSx = {
  ...tableCellInnerCenterSx,
  alignItems: 'flex-end',
} as const;

/** Version column — LTR text, vertically centered in cell (16px padding via tableBodyCellSx) */
export const tableVersionInnerSx = tableCellInnerSx;

/** Layout only — heights come from MuiTableCell theme overrides */
export const tableHeadCellSx = {
  textAlign: 'right /* @noflip */',
  px: TABLE_CELL_PX,
  py: 0,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap' as const,
} as const;

export const tableBodyCellSx = {
  textAlign: 'right /* @noflip */',
  px: TABLE_CELL_PX,
  py: 0,
  verticalAlign: 'middle' as const,
  boxSizing: 'border-box',
} as const;

export const tableCellContentSx = {
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  textAlign: 'right /* @noflip */',
  color: 'text.primary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const,
} as const;

export const tableCellLtrContentSx = {
  ...tableCellContentSx,
  direction: 'ltr /* @noflip */',
  unicodeBidi: 'plaintext' as const,
} as const;

/** Primary identifier columns — bank name, campaign name, conference number */
export const tablePrimaryCellContentSx = {
  ...tableCellContentSx,
  color: 'primary.main',
} as const;

export const tablePrimaryCellLtrContentSx = {
  ...tableCellLtrContentSx,
  color: 'primary.main',
} as const;

export const tableActionsCellSx = {
  ...tableBodyCellSx,
  width: 'fit-content',
} as const;

/** Conference-count column — chip aligned to start in cell with 16px padding */
export const tableConferenceCountCellSx = {
  ...tableBodyCellSx,
  textAlign: 'center /* @noflip */',
  px: TABLE_CELL_PX,
} as const;

export const tableConferenceCountInnerSx = {
  display: 'flex',
  width: '100%',
  minWidth: 0,
  height: '100%',
  justifyContent: 'flex-start /* @noflip */',
  alignItems: 'center',
} as const;

export const tableConferenceCountChipSx = {
  px: 0.5,
} as const;

export const tableSortLabelSx = {
  flexDirection: 'row',
  flexShrink: 0,
  maxWidth: '100%',
  gap: '4px',
  color: 'text.primary',
} as const;

/** Tables embedded in dialogs — 8px corners */
export const popupTableContainerSx = {
  borderRadius: '8px',
  minHeight: POPUP_TABLE_MIN_HEIGHT,
} as const;

export const popupTableEmptyCellSx = {
  ...tableBodyCellSx,
  textAlign: 'center /* @noflip */',
  verticalAlign: 'middle',
  height: `${POPUP_TABLE_MIN_HEIGHT - TABLE_HEAD_HEIGHT}px`,
} as const;

export const tablePaginationSx = {
  borderBottom: 'none',
  height: TABLE_FOOTER_HEIGHT,
  minHeight: TABLE_FOOTER_HEIGHT,
  maxHeight: TABLE_FOOTER_HEIGHT,
  '& .MuiTablePagination-toolbar': {
    height: TABLE_FOOTER_HEIGHT,
    minHeight: TABLE_FOOTER_HEIGHT,
    maxHeight: TABLE_FOOTER_HEIGHT,
    px: TABLE_CELL_PX,
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    fontSize: '14px',
    color: 'text.primary',
    margin: 0,
  },
  '& .MuiTablePagination-select': {
    fontSize: '14px',
    color: 'text.primary',
  },
  '& .MuiTablePagination-actions': {
    color: 'text.primary',
  },
} as const;
