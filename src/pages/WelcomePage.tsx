import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MicroAppear } from '../components/common/MicroAppear';
import {
  WelcomeBanksIllustration,
  WelcomeCampaignsIllustration,
  WelcomeConferencesIllustration,
} from '../components/welcome/WelcomeIllustrations';
import { WelcomeCard } from '../components/welcome/WelcomeCard';
import { microAppearStagger } from '../theme/microAnimations';
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
      <MicroAppear variant="fadeUp">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            fontSize: 48,
            fontWeight: 400,
            mb: 2,
          }}
        >
          ברוכים הבאים למערכת עידון
        </Typography>
      </MicroAppear>

      <MicroAppear variant="fadeUp" delayMs={60}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            textAlign: 'center',
            width: '100%',
            fontSize: 16,
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          ניהול הקצאות עורקים ותדרים לגיבוי ויצירת בנקים ומבצעים ברשת קרן אור.
        </Typography>
      </MicroAppear>

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
        {WELCOME_CARDS.map(({ title, to, illustration }, index) => (
          <MicroAppear
            key={to}
            variant="scaleIn"
            delayMs={120 + microAppearStagger(index, 70)}
          >
            <WelcomeCard title={title} to={to} illustration={illustration} />
          </MicroAppear>
        ))}
      </Stack>
    </Box>
  );
}
