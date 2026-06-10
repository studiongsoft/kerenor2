import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { ColorModeToggle } from './ColorModeToggle';
import { SidebarNavIcon } from './SidebarNavIcon';
import { MAIN_NAV_ITEMS, NAV_TOP_OFFSET, SIDEBAR_WIDTH } from '../../config/navigation';
import { useResolvedColorMode } from '../../theme/useResolvedColorMode';

export function AppSidebar() {
  const colorMode = useResolvedColorMode();

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.drawer,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          position: 'fixed',
          top: 0,
          insetInlineStart: 0,
          insetInlineEnd: 'auto',
          bottom: 0,
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          borderInlineEnd: 1,
          borderColor: 'divider',
        },
      }}
    >
      <List
        component="nav"
        aria-label="ניווט ראשי"
        sx={{ flex: 1, pt: `${NAV_TOP_OFFSET}px`, px: 0 }}
      >
        {MAIN_NAV_ITEMS.map(({ path, label, icons }) => (
          <ListItem key={path} disablePadding>
            <NavLink to={path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              {({ isActive }) => (
                <ListItemButton selected={isActive} sx={{ px: 2, py: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <SidebarNavIcon
                      src={icons[colorMode]}
                      active={isActive}
                      colorMode={colorMode}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    slotProps={{
                      primary: { variant: 'body2' },
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3, pt: 2, borderRadius: 0 }}>
        <ColorModeToggle />
      </Box>
    </Drawer>
  );
}
