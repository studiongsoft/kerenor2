/**
 * Figma: קרן אור כלים — ניהול מבצעים / הרשאות
 * @see https://www.figma.com/design/n0ef0AHZbDk6sw2rQZQMFV?node-id=11776-17394
 */
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DesignModeToggle } from '@studiongsoft/design-lead';
import { CampaignFormDialog } from '../components/campaigns/CampaignFormDialog';
import { CampaignTableRow } from '../components/campaigns/CampaignTableRow';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingState } from '../components/common/LoadingState';
import { useSnackbar } from '../components/common/AppSnackbarProvider';
import { useCampaignStore } from '../stores/rootStore';
import type { CampaignPermission, CampaignSortColumn } from '../types/campaign';

const tableHeadCellSx = {
  textAlign: 'right /* @noflip */',
  '& .MuiTableSortLabel-root': {
    width: '100%',
    justifyContent: 'flex-end /* @noflip */',
  },
} as const;

const SORT_COLUMNS: { id: CampaignSortColumn; label: string }[] = [
  { id: 'name', label: 'שם המבצע' },
  { id: 'start', label: 'תחילת מבצע' },
  { id: 'end', label: 'סיום מבצע' },
  { id: 'version', label: 'גרסה' },
  { id: 'conferenceCount', label: 'כמות ועידות' },
];

function PermissionsManagementPageBase() {
  const store = useCampaignStore();
  const { showSnackbar } = useSnackbar();

  React.useEffect(() => {
    store.loadCampaigns();
  }, [store]);

  const handleSave = async (row: Parameters<typeof store.saveCampaign>[0]) => {
    const wasEdit = Boolean(store.editingRow);
    const ok = await store.saveCampaign(row);
    if (ok) {
      showSnackbar(wasEdit ? 'המבצע עודכן בהצלחה' : 'המבצע נוסף בהצלחה', 'success');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await store.deleteCampaign(id);
    if (ok) {
      showSnackbar('המבצע נמחק בהצלחה', 'success');
    }
  };

  const renderTableBody = () => {
    if (store.isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6}>
            <LoadingState message="טוען מבצעים..." />
          </TableCell>
        </TableRow>
      );
    }

    if (store.error) {
      return (
        <TableRow>
          <TableCell colSpan={6}>
            <ErrorState message={store.error} onRetry={() => store.loadCampaigns()} />
          </TableCell>
        </TableRow>
      );
    }

    if (store.isEmpty) {
      return (
        <TableRow>
          <TableCell colSpan={6}>
            <EmptyState
              title="לא נמצאו מבצעים"
              description={
                store.searchQuery
                  ? 'נסו לשנות את מילות החיפוש'
                  : 'הוסיפו מבצע חדש כדי להתחיל'
              }
              actionLabel={store.canManage && !store.searchQuery ? 'הוספת מבצע' : undefined}
              onAction={
                store.canManage && !store.searchQuery ? () => store.openAddDialog() : undefined
              }
            />
          </TableCell>
        </TableRow>
      );
    }

    return store.paginatedRows.map((row) => (
      <CampaignTableRow
        key={row.id}
        row={row}
        canManage={store.canManage}
        onEdit={(item) => store.openEditDialog(item)}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ px: 3, minHeight: 64 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="תפריט">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="span">
              ועידון
            </Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <DesignModeToggle />
            <Select
              size="small"
              value={store.permission}
              onChange={(e) => store.setPermission(e.target.value as CampaignPermission)}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="allocation">הקצאה (מבצעים)</MenuItem>
              <MenuItem value="view">צפייה בלבד</MenuItem>
              <MenuItem value="full">ניהול (מלא)</MenuItem>
            </Select>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Tabs
          value={store.tab}
          onChange={(_: React.SyntheticEvent, v: number) => store.setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<WorkspacesIcon />} iconPosition="start" label="ועידות" />
          <Tab icon={<ApartmentIcon />} iconPosition="start" label="בנקים" />
          <Tab icon={<WorkIcon />} iconPosition="start" label="מבצעים" />
        </Tabs>

        <Stack direction="row" sx={{ width: '100%', mb: 3, alignItems: 'flex-start' }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minWidth: 0,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="right">
              ניהול מבצעים/ הקצאה
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'start' }}>
              הקצאת ועידות לתקופות זמן מוגדרות
            </Typography>
            <TextField
              size="small"
              placeholder="חיפוש מבצע..."
              value={store.searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                store.setSearchQuery(e.target.value)
              }
              sx={{ width: 280, mt: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {store.canManage ? (
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<AddIcon />}
              sx={{ flexShrink: 0, alignSelf: 'flex-start' }}
              onClick={() => store.openAddDialog()}
            >
              הוספת מבצע
            </Button>
          ) : null}
        </Stack>

        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                {SORT_COLUMNS.map(({ id, label }) => (
                  <TableCell
                    key={id}
                    align="right"
                    sortDirection={store.sort.column === id ? store.sort.direction : false}
                    sx={tableHeadCellSx}
                  >
                    <TableSortLabel
                      active={store.sort.column === id}
                      direction={store.sort.column === id ? store.sort.direction : 'asc'}
                      onClick={() => store.handleSort(id)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="left" sx={{ width: 280 }}>
                  פעולות
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableBody()}</TableBody>
            {!store.isLoading && !store.error && !store.isEmpty ? (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={store.sortedRows.length}
                    page={store.page}
                    onPageChange={(_: React.MouseEvent<HTMLButtonElement> | null, p: number) =>
                      store.setPage(p)
                    }
                    rowsPerPage={store.rowsPerPage}
                    rowsPerPageOptions={[9]}
                    labelDisplayedRows={({
                      from,
                      to,
                      count,
                    }: {
                      from: number;
                      to: number;
                      count: number;
                    }) => `${from}-${to} מתוך ${count}`}
                  />
                </TableRow>
              </TableFooter>
            ) : null}
          </Table>
        </TableContainer>
      </Container>

      <CampaignFormDialog
        open={store.dialogOpen}
        mode={store.editingRow ? 'edit' : 'add'}
        initialRow={store.editingRow}
        onClose={() => store.closeDialog()}
        onSave={handleSave}
      />
    </Box>
  );
}

const PermissionsManagementPage = observer(PermissionsManagementPageBase);
export default PermissionsManagementPage;
