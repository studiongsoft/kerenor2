import Box from '@mui/material/Box';
import banksIllustration from '../../assets/welcome/banks.png';
import campaignsIllustration from '../../assets/welcome/campaigns.png';
import conferencesIllustration from '../../assets/welcome/conferences.png';

const ILLUSTRATION_SIZE = 140;

function IllustrationImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: ILLUSTRATION_SIZE,
        height: ILLUSTRATION_SIZE,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}

export function WelcomeConferencesIllustration() {
  return <IllustrationImage src={conferencesIllustration} alt="" />;
}

export function WelcomeBanksIllustration() {
  return <IllustrationImage src={banksIllustration} alt="" />;
}

export function WelcomeCampaignsIllustration() {
  return <IllustrationImage src={campaignsIllustration} alt="" />;
}
