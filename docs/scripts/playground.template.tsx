import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppThemeProvider, DesignModeToggle } from '@studiongsoft/design-lead';

/**
 * Playground for fast design iteration (RTL + light/dark).
 * Regenerate: pnpm docs:create-playground
 * @see DESIGN-TO-CODE.md
 */
export default function Playground() {
  return (
    <AppThemeProvider>
      <Box sx={{ p: 3, maxWidth: 480 }}>
        <Typography variant="h5" gutterBottom>
          Design playground
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          RTL · בדקו light ו-dark לפני merge
        </Typography>
        <DesignModeToggle />
        <Stack spacing={2}>
          <Button variant="contained">כפתור לדוגמה</Button>
          <TextField label="שדה לדוגמה" placeholder="הקלידו כאן" fullWidth />
        </Stack>
      </Box>
    </AppThemeProvider>
  );
}
