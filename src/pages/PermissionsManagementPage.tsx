import { useCallback, useEffect, type ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { CampaignFormDialog } from '../components/campaigns/CampaignFormDialog';
import { CampaignTableRow } from '../components/campaigns/CampaignTableRow';
import { DeleteConfirmDialog, deleteWarningMessages, useDeleteConfirm } from '../components/shared/DeleteConfirmDialog';
import { DataTable } from '../components/table/DataTable';
import { PageHeader } from '../components/table/PageHeader';
import { useSnackbar } from '../components/common/AppSnackbarProvider';
import { useCampaignStore } from '../stores/rootStore';
import type { CampaignRowData, CampaignSortColumn } from '../types/campaign';
import type { DataTableColumn } from '../types/table';
import { rtlTextSx } from '../theme/rtlLayout';

const COLUMNS: DataTableColumn<CampaignSortColumn>[] = [
  { id: 'name', label: 'שם המבצע' },
  { id: 'start', label: 'תחילת מבצע' },
  { id: 'end', label: 'סיום המבצע' },
  { id: 'version', label: 'גרסה' },
  { id: 'conferenceCount', label: 'כמות ועידות' },
];

function PermissionsManagementPageBase() {
  const store = useCampaignStore();
  const { showItemToast } = useSnackbar();

  useEffect(() => {
    store.loadCampaigns();
  }, [store]);

  const handleSave = useCallback(
    async (row: Parameters<typeof store.saveCampaign>[0]) => {
      const wasEdit = Boolean(store.editingRow);
      const ok = await store.saveCampaign(row);
      if (ok) {
        showItemToast({
          entity: 'campaign',
          action: wasEdit ? 'edit' : 'add',
          name: row.name,
        });
      }
    },
    [showItemToast, store],
  );

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      const ok = await store.deleteCampaign(id);
      if (ok) {
        showItemToast({ entity: 'campaign', action: 'delete', name });
      }
    },
    [showItemToast, store],
  );

  const { pending, requestDelete, cancelDelete, confirmDelete } = useDeleteConfirm(handleDelete);

  const handleAdd = useCallback(() => {
    store.openAddDialog();
  }, [store]);

  const handleEdit = useCallback(
    (row: CampaignRowData) => {
      store.openEditDialog(row);
    },
    [store],
  );

  return (
    <>
      <PageHeader
        title="ניהול מבצעים/ הקצאה"
        subtitle="ניהול הקצאות מתוחמות בזמן והתניות מבוססות חפיפה."
        search={
          <TextField
            size="small"
            placeholder="חיפוש מבצע..."
            value={store.searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => store.setSearchQuery(e.target.value)}
            fullWidth
            slotProps={{
              input: {
                sx: rtlTextSx,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        }
        action={
          store.canManage ? (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
              הוסף מבצע
            </Button>
          ) : undefined
        }
      />

      <DataTable
        columns={COLUMNS}
        sort={store.sort}
        onSort={store.handleSort}
        page={store.page}
        totalRows={store.sortedRows.length}
        onPageChange={store.setPage}
        isLoading={store.isLoading}
        error={store.error}
        isEmpty={store.isEmpty}
        onRetry={() => store.loadCampaigns()}
        emptyIcon="campaigns"
        emptyTitle="לא נמצאו מבצעים"
        emptyDescription={
          store.searchQuery ? 'נסו לשנות את מילות החיפוש' : 'הוסיפו מבצע חדש כדי להתחיל'
        }
        emptyActionLabel={store.canManage && !store.searchQuery ? 'הוספת מבצע' : undefined}
        onEmptyAction={store.canManage && !store.searchQuery ? handleAdd : undefined}
        rows={store.paginatedRows}
        getRowKey={(row) => row.id}
        renderRow={(row, phase) => (
          <CampaignTableRow
            row={row}
            phase={phase}
            canManage={store.canManage}
            onEdit={handleEdit}
            onDelete={requestDelete}
          />
        )}
      />

      <CampaignFormDialog
        open={store.dialogOpen}
        mode={store.editingRow ? 'edit' : 'add'}
        initialRow={store.editingRow}
        onClose={() => store.closeDialog()}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={Boolean(pending)}
        name={pending?.name ?? ''}
        warningMessage={deleteWarningMessages.campaign}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

const PermissionsManagementPage = observer(PermissionsManagementPageBase);
export default PermissionsManagementPage;
