import type { ChangeEvent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HEADER_CONTENT_GAP } from '../../config/navigation';
import { TEXT_FIELD_WIDTH } from '../../theme/createKerenOrTheme';
import { rtlTextSx } from '../../theme/rtlLayout';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  search?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, search, action }: PageHeaderProps) {
  return (
    <Box sx={{ width: '100%', mb: 3, ...rtlTextSx }}>
      <Box sx={{ ...rtlTextSx }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, width: '100%', ...rtlTextSx }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={rtlTextSx}>
          {subtitle}
        </Typography>
      </Box>
      {search || action ? (
        <Stack
          direction="row"
          sx={{
            mt: `${HEADER_CONTENT_GAP}px`,
            alignItems: 'flex-end',
            width: '100%',
            ...rtlTextSx,
          }}
        >
          {search ? (
            <Box sx={{ width: TEXT_FIELD_WIDTH, flexShrink: 0, ...rtlTextSx }}>{search}</Box>
          ) : null}
          <Box sx={{ flex: 1 }} />
          {action ? <Box sx={{ flexShrink: 0 }}>{action}</Box> : null}
        </Stack>
      ) : null}
    </Box>
  );
}

export type { ChangeEvent };
