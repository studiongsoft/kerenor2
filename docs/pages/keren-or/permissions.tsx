import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

/**
 * @deprecated העמוד עבר ל-SPA: `apps/keren-or` → `/permissions`
 * הריצו: `pnpm -F keren-or dev` (http://localhost:5173/permissions)
 */
export default function KerenOrPermissionsPageDeprecated() {
  return (
    <>
      <Head
        title="ניהול מבצעים — עבר ל-SPA"
        description="העמוד הועבר ל-apps/keren-or"
        noindex
      />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          העמוד עבר לאפליקציית SPA.
        </Alert>
        <Typography variant="h5" gutterBottom>
          ניהול מבצעים / הרשאות
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          הפרוטוטיפ זמין כעת ב-<code>apps/keren-or</code>.
        </Typography>
        <Button
          variant="contained"
          href="http://localhost:5173/permissions"
          target="_blank"
          rel="noopener noreferrer"
        >
          פתיחת SPA (dev server)
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            הריצו: <code>pnpm -F keren-or dev</code>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
