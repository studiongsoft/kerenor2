import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Outlet, useLocation } from 'react-router-dom';
import { NAV_TOP_OFFSET, SIDEBAR_WIDTH } from '../../config/navigation';
import { AppSnackbarProvider } from '../common/AppSnackbarProvider';
import { MicroAppear } from '../common/MicroAppear';
import { rtlTextSx } from '../../theme/rtlLayout';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

export function AppLayout() {
  const { pathname } = useLocation();
  const showSidebar = pathname !== '/';

  return (
    <Box sx={{ ...rtlTextSx, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader />
      {showSidebar ? <AppSidebar /> : null}
      <Box
        component="main"
        sx={{
          ...rtlTextSx,
          paddingInlineStart: showSidebar ? `${SIDEBAR_WIDTH}px` : 0,
          pt: `${NAV_TOP_OFFSET}px`,
          minHeight: '100vh',
          minWidth: 0,
        }}
      >
        <Container maxWidth="lg" sx={{ pb: 3, ...rtlTextSx }}>
          <AppSnackbarProvider>
            <MicroAppear key={pathname} variant="fadeUp" delayMs={60}>
              <Outlet />
            </MicroAppear>
          </AppSnackbarProvider>
        </Container>
      </Box>
    </Box>
  );
}
