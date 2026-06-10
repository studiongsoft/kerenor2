import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

interface TableIconActionsProps {
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  disableEdit?: boolean;
  disableDelete?: boolean;
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
      <IconButton size="small" color="inherit" aria-label="הורדה" onClick={onDownload}>
        <DownloadOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        aria-label="עריכה"
        disabled={disableEdit}
        onClick={onEdit}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        aria-label="מחיקה"
        disabled={disableDelete}
        onClick={onDelete}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
