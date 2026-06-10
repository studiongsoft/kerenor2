import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { TableIconActions } from '../table/TableIconActions';
import {
  tableActionsCellSx,
  tableBodyCellSx,
  tableCellInnerSx,
  tableCellLtrContentSx,
  tablePrimaryCellContentSx,
  tableConferenceCountCellSx,
  tableConferenceCountChipSx,
  tableConferenceCountInnerSx,
  tableVersionInnerSx,
} from '../table/tableStyles';
import type { CampaignRowData } from '../../types/campaign';

export type { CampaignRowData };

interface CampaignTableRowProps {
  row: CampaignRowData;
  canManage: boolean;
  onEdit: (row: CampaignRowData) => void;
  onDelete: (id: string, name: string) => void;
}

function DateTimeText({ time, date }: { time: string; date: string }) {
  return (
    <Typography
      variant="body2"
      sx={[
        tableCellLtrContentSx,
        (theme) => theme.applyStyles('dark', { color: '#fff' }),
      ]}
    >
      {`${time} | ${date}`}
    </Typography>
  );
}

export function CampaignTableRow({ row, canManage, onEdit, onDelete }: CampaignTableRowProps) {
  return (
    <TableRow>
      <TableCell align="right" sx={tableBodyCellSx}>
        <Box sx={tableCellInnerSx}>
          <Link
            component="button"
            type="button"
            variant="body2"
            underline="none"
            onClick={() => onEdit(row)}
            sx={{
              ...tablePrimaryCellContentSx,
              fontWeight: 400,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {row.name}
          </Link>
        </Box>
      </TableCell>
      <TableCell align="right" sx={tableBodyCellSx}>
        <Box sx={tableCellInnerSx}>
          <DateTimeText time={row.startTime} date={row.startDate} />
        </Box>
      </TableCell>
      <TableCell align="right" sx={tableBodyCellSx}>
        <Box sx={tableCellInnerSx}>
          <DateTimeText time={row.endTime} date={row.endDate} />
        </Box>
      </TableCell>
      <TableCell align="right" sx={tableBodyCellSx}>
        <Box sx={tableVersionInnerSx}>
          <Typography variant="body2" color="text.primary" sx={tableCellLtrContentSx}>
            {row.version}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="center" sx={tableConferenceCountCellSx}>
        <Box sx={tableConferenceCountInnerSx}>
          <Chip
            label={`${row.conferenceCount} ועידות`}
            variant="outlined"
            color="primary"
            size="small"
            sx={tableConferenceCountChipSx}
          />
        </Box>
      </TableCell>
      <TableCell align="right" sx={tableActionsCellSx}>
        <Box sx={tableCellInnerSx}>
          <TableIconActions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id, row.name)}
            disableEdit={!canManage}
            disableDelete={!canManage}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
}
