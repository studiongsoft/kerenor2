import { useCallback, useEffect, type ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { ConferenceFormDialog } from '../components/conferences/ConferenceFormDialog';
import { DeleteConfirmDialog, deleteWarningMessages, useDeleteConfirm } from '../components/shared/DeleteConfirmDialog';
import { DataTable } from '../components/table/DataTable';
import { PageHeader } from '../components/table/PageHeader';
import { TableIconActions } from '../components/table/TableIconActions';
import { tableBodyCellSx, tableCellContentSx, tableCellInnerSx, tableCellLtrContentSx, tablePrimaryCellInnerSx, tablePrimaryCellLtrLinkSx } from '../components/table/tableStyles';
import { tableRowPhaseSx } from '../components/table/tableRowAnimations';
import { useSnackbar } from '../components/common/AppSnackbarProvider';
import { useConferenceStore } from '../stores/rootStore';
import type { ConferenceRowData, ConferenceSortColumn } from '../types/conference';
import type { DataTableColumn } from '../types/table';

const COLUMNS: DataTableColumn<ConferenceSortColumn>[] = [
  { id: 'number', label: 'מס׳ ועידה' },
  { id: 'code', label: 'קוד' },
  { id: 'purpose', label: 'ייעוד' },
  { id: 'description', label: 'תיאור' },
];

function ConferencesPageBase() {
  const store = useConferenceStore();
  const { showItemToast } = useSnackbar();

  useEffect(() => {
    store.loadConferences();
  }, [store]);

  const handleSave = useCallback(
    async (row: Parameters<typeof store.saveConference>[0]) => {
      const wasEdit = Boolean(store.editingRow);
      const ok = await store.saveConference(row);
      if (ok) {
        showItemToast({
          entity: 'conference',
          action: wasEdit ? 'edit' : 'add',
          name: row.number,
        });
      }
    },
    [showItemToast, store],
  );

  const handleAdd = useCallback(() => {
    store.openAddDialog();
  }, [store]);

  const handleEdit = useCallback(
    (row: ConferenceRowData) => {
      store.openEditDialog(row);
    },
    [store],
  );

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      const ok = await store.deleteConference(id);
      if (ok) {
        showItemToast({ entity: 'conference', action: 'delete', name });
      }
    },
    [showItemToast, store],
  );

  const { pending, requestDelete, cancelDelete, confirmDelete } = useDeleteConfirm(handleDelete);

  return (
    <>
      <PageHeader
        title="ניהול ועידות"
        subtitle="קבוצות של ועידות המשויכות לבנקי משאבים."
        search={
          <TextField
            size="small"
            placeholder="חיפוש ועידה..."
            value={store.searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => store.setSearchQuery(e.target.value)}
            fullWidth
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
        }
        action={
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
            הוספת ועידה
          </Button>
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
        onRetry={() => store.loadConferences()}
        emptyIcon="conferences"
        emptyTitle="לא נמצאו ועידות"
        emptyDescription={
          store.searchQuery ? 'נסו לשנות את מילות החיפוש' : 'הוסיפו ועידה חדשה כדי להתחיל'
        }
        rows={store.paginatedRows}
        getRowKey={(row) => row.id}
        renderRow={(row, phase, rowKey) => (
          <TableRow data-row-key={rowKey} sx={tableRowPhaseSx(phase)}>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tablePrimaryCellInnerSx}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  underline="none"
                  onClick={() => handleEdit(row)}
                  sx={tablePrimaryCellLtrLinkSx}
                >
                  {row.number}
                </Link>
              </Box>
            </TableCell>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tableCellInnerSx}>
                <Typography variant="body2" color="text.primary" sx={tableCellLtrContentSx}>
                  {row.code}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tableCellInnerSx}>
                <Typography variant="body2" sx={tableCellContentSx}>
                  {row.purpose}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tableCellInnerSx}>
                <Typography variant="body2" color="text.primary" sx={tableCellContentSx}>
                  {row.description}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tableCellInnerSx}>
                <TableIconActions
                  onEdit={() => handleEdit(row)}
                  onDelete={() => requestDelete(row.id, row.number)}
                />
              </Box>
            </TableCell>
          </TableRow>
        )}
      />

      <ConferenceFormDialog
        open={store.dialogOpen}
        mode={store.editingRow ? 'edit' : 'add'}
        initialRow={store.editingRow}
        onClose={() => store.closeDialog()}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={Boolean(pending)}
        name={pending?.name ?? ''}
        warningMessage={deleteWarningMessages.conference}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

const ConferencesPage = observer(ConferencesPageBase);
export default ConferencesPage;
