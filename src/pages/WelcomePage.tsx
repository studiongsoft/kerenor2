import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  WelcomeBanksIllustration,
  WelcomeCampaignsIllustration,
  WelcomeConferencesIllustration,
} from '../components/welcome/WelcomeIllustrations';
import { WelcomeCard } from '../components/welcome/WelcomeCard';
import { rtlTextSx } from '../theme/rtlLayout';

const WELCOME_CARDS = [
  {
    title: 'מבצעים',
    to: '/campaigns',
    illustration: <WelcomeCampaignsIllustration />,
  },
  {
    title: 'בנקים',
    to: '/banks',
    illustration: <WelcomeBanksIllustration />,
  },
  {
    title: 'ועידות',
    to: '/conferences',
    illustration: <WelcomeConferencesIllustration />,
  },
] as const;

export default function WelcomePage() {
  return (
    <Box sx={{ ...rtlTextSx, py: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: 'center',
          fontSize: 60,
          fontWeight: 400,
          mb: 2,
        }}
      >
        ברוכים הבאים למערכת עידון
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          width: '100%',
          fontSize: 24,
          mb: 6,
          lineHeight: 1.6,
        }}
      >
        ניהול הקצאות עורקים ותדרים לגיבוי ויצירת בנקים ומבצעים ברשת קרן אור.
      </Typography>

      <Stack
        direction="row"
        useFlexGap
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          height: 'fit-content',
        }}
      >
        {WELCOME_CARDS.map(({ title, to, illustration }) => (
          <WelcomeCard key={to} title={title} to={to} illustration={illustration} />
        ))}
      </Stack>
    </Box>
  );
}
