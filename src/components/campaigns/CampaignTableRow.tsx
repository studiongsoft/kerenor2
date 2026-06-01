import { type ComponentProps, type ReactNode } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CampaignRowData } from '../../types/campaign';

export type { CampaignRowData };

const rowSx = {
  height: 56,
  '& .MuiTableCell-root': {
    py: 2,
    px: 2,
    borderBottom: 1,
    borderColor: 'divider',
  },
} as const;

const actionButtonSx = {
  minWidth: 'auto',
  px: 1,
  py: 0.75,
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: '0.4px',
  textTransform: 'uppercase',
  lineHeight: '24px',
} as const;

const tableCellInnerSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end /* @noflip */',
  width: '100%',
} as const;

const tableCellTypographySx: SxProps<Theme> = {
  display: 'block',
  letterSpacing: '0.17px',
};

const tableCellLtrTypographySx: SxProps<Theme> = {
  display: 'inline-block',
  direction: 'ltr',
  unicodeBidi: 'plaintext',
  letterSpacing: '0.17px',
};

function TableCellContent({ children }: { children: ReactNode }) {
  return <Box sx={tableCellInnerSx}>{children}</Box>;
}

interface TableCellTextProps {
  children: ReactNode;
  variant?: 'body2' | 'caption';
  color?: 'text.primary' | 'primary.dark';
  ltr?: boolean;
  sx?: ComponentProps<typeof Typography>['sx'];
}

function TableCellText({
  children,
  variant = 'body2',
  color = 'text.primary',
  ltr = false,
  sx,
}: TableCellTextProps) {
  return (
    <Typography
      variant={variant}
      color={color}
      sx={[ltr ? tableCellLtrTypographySx : tableCellTypographySx, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Typography>
  );
}

function DateTimeCell({ time, date }: { time: string; date: string }) {
  return (
    <Stack spacing={0}>
      <TableCellText variant="caption" ltr sx={{ lineHeight: 1.66, letterSpacing: '0.4px' }}>
        {time}
      </TableCellText>
      <TableCellText ltr sx={{ lineHeight: 1.43 }}>
        {date}
      </TableCellText>
    </Stack>
  );
}

function StarActions() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ width: 'fit-content', alignItems: 'center' }}
    >
      <IconButton size="small" color="inherit" aria-label="כוכב ריק">
        <StarBorderIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" color="primary" aria-label="כוכב פעיל">
        <StarIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" color="error" aria-label="כוכב אדום">
        <StarIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

interface TextActionsProps {
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function TextActions({ canManage, onEdit, onDelete }: TextActionsProps) {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ width: 'fit-content', alignItems: 'center' }}
    >
      <Button
        variant="text"
        color="inherit"
        size="small"
        startIcon={<DownloadOutlinedIcon fontSize="small" />}
        sx={actionButtonSx}
      >
        הורדה
      </Button>
      <Button
        variant="text"
        color="error"
        size="small"
        startIcon={<DeleteOutlineOutlinedIcon fontSize="small" />}
        sx={actionButtonSx}
        disabled={!canManage}
        onClick={onDelete}
      >
        מחיקה
      </Button>
      <Button
        variant="text"
        color="inherit"
        size="small"
        startIcon={<EditOutlinedIcon fontSize="small" />}
        sx={actionButtonSx}
        disabled={!canManage}
        onClick={onEdit}
      >
        עריכה
      </Button>
    </Stack>
  );
}

interface CampaignTableRowProps {
  row: CampaignRowData;
  canManage: boolean;
  onEdit: (row: CampaignRowData) => void;
  onDelete: (id: string) => void;
}

export function CampaignTableRow({ row, canManage, onEdit, onDelete }: CampaignTableRowProps) {
  return (
    <TableRow sx={rowSx}>
      <TableCell align="right">
        <TableCellContent>
          <TableCellText>{row.name}</TableCellText>
        </TableCellContent>
      </TableCell>
      <TableCell align="right">
        <TableCellContent>
          <DateTimeCell time={row.startTime} date={row.startDate} />
        </TableCellContent>
      </TableCell>
      <TableCell align="right">
        <TableCellContent>
          <DateTimeCell time={row.endTime} date={row.endDate} />
        </TableCellContent>
      </TableCell>
      <TableCell align="right">
        <TableCellContent>
          <TableCellText ltr>{row.version}</TableCellText>
        </TableCellContent>
      </TableCell>
      <TableCell align="right">
        <TableCellContent>
          <TableCellText color="primary.dark" ltr sx={{ fontWeight: 400 }}>
            {row.conferenceCount}
          </TableCellText>
        </TableCellContent>
      </TableCell>
      <TableCell align="left" sx={{ width: 280, textAlign: 'left /* @noflip */' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {row.actionType === 'stars' ? (
            <StarActions />
          ) : (
            <TextActions
              canManage={canManage}
              onEdit={() => onEdit(row)}
              onDelete={() => onDelete(row.id)}
            />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
