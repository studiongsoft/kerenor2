import { useCallback, useEffect, type ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BankFormDialog } from '../components/banks/BankFormDialog';
import { DeleteConfirmDialog, useDeleteConfirm } from '../components/shared/DeleteConfirmDialog';
import { DataTable } from '../components/table/DataTable';
import { PageHeader } from '../components/table/PageHeader';
import { TableIconActions } from '../components/table/TableIconActions';
import { tableRowPhaseSx } from '../components/table/tableRowAnimations';
import {
  tableBodyCellSx,
  tableCellContentSx,
  tableCellInnerSx,
  tableCellLtrContentSx,
  tablePrimaryCellInnerSx,
  tablePrimaryCellLinkSx,
  tableConferenceCountCellSx,
  tableConferenceCountChipSx,
  tableConferenceCountInnerSx,
  tableVersionInnerSx,
} from '../components/table/tableStyles';
import { useSnackbar } from '../components/common/AppSnackbarProvider';
import { useBankStore } from '../stores/rootStore';
import type { BankRowData, BankSortColumn } from '../types/bank';
import type { DataTableColumn } from '../types/table';

const COLUMNS: DataTableColumn<BankSortColumn>[] = [
  { id: 'name', label: 'שם הבנק' },
  { id: 'description', label: 'תיאור' },
  { id: 'version', label: 'גרסה' },
  { id: 'conferenceCount', label: 'כמות ועידות' },
];

function BanksPageBase() {
  const store = useBankStore();
  const { showItemToast } = useSnackbar();

  useEffect(() => {
    store.loadBanks();
  }, [store]);

  const handleSave = useCallback(
    async (row: Parameters<typeof store.saveBank>[0]) => {
      const wasEdit = Boolean(store.editingRow);
      const ok = await store.saveBank(row);
      if (ok) {
        showItemToast({
          entity: 'bank',
          action: wasEdit ? 'edit' : 'add',
          name: row.name,
        });
      }
    },
    [showItemToast, store],
  );

  const handleAdd = useCallback(() => {
    store.openAddDialog();
  }, [store]);

  const handleEdit = useCallback(
    (row: BankRowData) => {
      store.openEditDialog(row);
    },
    [store],
  );

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      const ok = await store.deleteBank(id);
      if (ok) {
        showItemToast({ entity: 'bank', action: 'delete', name });
      }
    },
    [showItemToast, store],
  );

  const { pending, requestDelete, cancelDelete, confirmDelete } = useDeleteConfirm(handleDelete);

  return (
    <>
      <PageHeader
        title="ניהול בנקים"
        subtitle="קבוצות קבועות של עורקים לשימוש עתידי."
        search={
          <TextField
            size="small"
            placeholder="חיפוש בנק..."
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
            הוספת בנק
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
        onRetry={() => store.loadBanks()}
        emptyIcon="banks"
        emptyTitle="לא נמצאו בנקים"
        emptyDescription={
          store.searchQuery ? 'נסו לשנות את מילות החיפוש' : 'הוסיפו בנק חדש כדי להתחיל'
        }
        rows={store.paginatedRows}
        getRowKey={(row) => row.id}
        renderRow={(row, phase) => (
          <TableRow sx={tableRowPhaseSx(phase)}>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tablePrimaryCellInnerSx}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  underline="none"
                  onClick={() => handleEdit(row)}
                  sx={tablePrimaryCellLinkSx}
                >
                  {row.name}
                </Link>
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
              <Box sx={tableVersionInnerSx}>
                <Typography variant="body2" color="text.primary" sx={tableCellLtrContentSx}>
                  {row.version}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="center" sx={tableConferenceCountCellSx}>
              <Box sx={tableConferenceCountInnerSx}>
                <Chip
                  label={`${row.conferenceCount} ועידות`}
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={tableConferenceCountChipSx}
                />
              </Box>
            </TableCell>
            <TableCell align="right" sx={tableBodyCellSx}>
              <Box sx={tableCellInnerSx}>
                <TableIconActions
                  onEdit={() => handleEdit(row)}
                  onDelete={() => requestDelete(row.id, row.name)}
                />
              </Box>
            </TableCell>
          </TableRow>
        )}
      />

      <BankFormDialog
        open={store.dialogOpen}
        mode={store.editingRow ? 'edit' : 'add'}
        initialRow={store.editingRow}
        onClose={() => store.closeDialog()}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={Boolean(pending)}
        name={pending?.name ?? ''}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

const BanksPage = observer(BanksPageBase);
export default BanksPage;
