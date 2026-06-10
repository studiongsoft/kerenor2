import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DIALOG_EDGE_PADDING } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';

interface DialogFormHeaderProps {
  title: string;
  onClose: () => void;
  /** @default 'h6' */
  titleVariant?: 'h4' | 'h6';
  /** Space below title row before form content (px). @default 8 */
  titleBottomGap?: number;
}

/** RTL dialog title row — close (×) pinned to physical top-left, title on the right. */
export function DialogFormHeader({
  title,
  onClose,
  titleVariant = 'h6',
  titleBottomGap = 8,
}: DialogFormHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        direction: 'ltr /* @noflip */',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        width: '100%',
        px: `${DIALOG_EDGE_PADDING}px`,
        pt: `${DIALOG_EDGE_PADDING}px`,
        pb: `${titleBottomGap}px`,
      }}
    >
      <IconButton aria-label="סגירה" onClick={onClose} size="small" sx={{ flexShrink: 0 }}>
        <CloseIcon />
      </IconButton>
      <Typography
        variant={titleVariant}
        component="h2"
        sx={{
          flex: 1,
          fontWeight: titleVariant === 'h6' ? 600 : 400,
          textAlign: 'right /* @noflip */',
          ...rtlTextSx,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
