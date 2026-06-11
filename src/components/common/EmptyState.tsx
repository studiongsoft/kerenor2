import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MicroAppear } from './MicroAppear';
import { useResolvedColorMode } from '../../theme/useResolvedColorMode';
import { rtlColumnSx } from '../../theme/rtlLayout';
import {
  EMPTY_STATE_ICON_SIZE,
  EMPTY_STATE_LIGHT_ICON_OPACITY,
  getEmptyStateIconSrc,
  type EmptyStateIcon,
} from './emptyStateIcons';

interface EmptyStateProps {
  icon: EmptyStateIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title = 'אין נתונים להצגה',
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const colorMode = useResolvedColorMode();

  return (
    <MicroAppear
      variant="fadeUp"
      sx={{
        ...rtlColumnSx,
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        gap: 1,
        width: '100%',
      }}
    >
      <Box
        component="img"
        src={getEmptyStateIconSrc(icon, colorMode)}
        alt=""
        sx={{
          width: EMPTY_STATE_ICON_SIZE,
          height: EMPTY_STATE_ICON_SIZE,
          objectFit: 'contain',
          display: 'block',
          mb: 1,
          opacity: colorMode === 'light' ? EMPTY_STATE_LIGHT_ICON_OPACITY : 1,
        }}
      />
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      ) : null}
    </MicroAppear>
  );
}
