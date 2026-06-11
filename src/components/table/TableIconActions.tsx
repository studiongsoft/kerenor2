import type { ReactElement } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

interface TableIconActionsProps {
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

const tooltipSlotProps = {
  popper: { dir: 'rtl' as const },
  tooltip: {
    sx: {
      fontSize: 12,
      lineHeight: 1.4,
      py: 0.5,
      px: 1,
    },
  },
};

function ActionTooltip({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <Tooltip title={title} placement="top" enterDelay={300} slotProps={tooltipSlotProps}>
      {children}
    </Tooltip>
  );
}

export function TableIconActions({
  onDownload,
  onEdit,
  onDelete,
  disableEdit = false,
  disableDelete = false,
}: TableIconActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        alignItems: 'center',
        flexShrink: 0,
        gap: '4px',
        color: 'action.active',
        '& .MuiIconButton-root': {
          padding: '6px',
        },
        '& .MuiSvgIcon-root': {
          color: 'action.active',
        },
      }}
    >
      <ActionTooltip title="הורדה">
        <IconButton size="small" color="inherit" aria-label="הורדה" onClick={onDownload}>
          <DownloadOutlinedIcon fontSize="small" />
        </IconButton>
      </ActionTooltip>
      <ActionTooltip title="עריכה">
        <span style={{ display: 'inline-flex' }}>
          <IconButton
            size="small"
            color="inherit"
            aria-label="עריכה"
            disabled={disableEdit}
            onClick={onEdit}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </ActionTooltip>
      <ActionTooltip title="מחיקה">
        <span style={{ display: 'inline-flex' }}>
          <IconButton
            size="small"
            color="inherit"
            aria-label="מחיקה"
            disabled={disableDelete}
            onClick={onDelete}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </ActionTooltip>
    </Stack>
  );
}
