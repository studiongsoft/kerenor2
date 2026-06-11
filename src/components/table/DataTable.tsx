import { Fragment, type MouseEvent, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import type { DataTableColumn, SortState } from '../../types/table';
import { TABLE_ROWS_PER_PAGE } from '../../types/table';
import { EmptyState } from '../common/EmptyState';
import type { EmptyStateIcon } from '../common/emptyStateIcons';
import { ErrorState } from '../common/ErrorState';
import { LoadingState } from '../common/LoadingState';
import type { TableRowPresencePhase } from './tableRowAnimations';
import { usePresenceList } from './usePresenceList';
import {
  TABLE_ACTIONS_COLUMN_WIDTH,
  tableCellInnerSx,
  tableHeadCellSx,
  tableMessageRowSx,
  tablePaginationSx,
  tableSortLabelSx,
} from './tableStyles';

interface DataTableProps<C extends string, T> {
  columns: DataTableColumn<C>[];
  sort: SortState<C>;
  onSort: (column: C) => void;
  page: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  onRetry?: () => void;
  emptyIcon: EmptyStateIcon;
  emptyTitle: string;
  emptyDescription: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  actionsColumnLabel?: string;
  actionsColumnWidth?: number;
  rows: T[];
  getRowKey: (row: T) => string;
  renderRow: (row: T, phase: TableRowPresencePhase) => ReactNode;
}

export function DataTable<C extends string, T>({
  columns,
  sort,
  onSort,
  page,
  totalRows,
  onPageChange,
  isLoading,
  error,
  isEmpty,
  onRetry,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  actionsColumnLabel = 'פעולות',
  actionsColumnWidth = TABLE_ACTIONS_COLUMN_WIDTH,
  rows,
  getRowKey,
  renderRow,
}: DataTableProps<C, T>) {
  const columnCount = columns.length + 1;
  const dataColumnWidth = `calc((100% - ${actionsColumnWidth}px) / ${columns.length})`;
  const presence = usePresenceList(rows, getRowKey);

  const renderBody = () => {
    if (isLoading) {
      return (
        <TableRow sx={tableMessageRowSx}>
          <TableCell colSpan={columnCount}>
            <LoadingState message="טוען..." />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow sx={tableMessageRowSx}>
          <TableCell colSpan={columnCount}>
            <ErrorState message={error} onRetry={onRetry} />
          </TableCell>
        </TableRow>
      );
    }

    if (isEmpty) {
      return (
        <TableRow sx={tableMessageRowSx}>
          <TableCell colSpan={columnCount}>
            <EmptyState
              icon={emptyIcon}
              title={emptyTitle}
              description={emptyDescription}
              actionLabel={emptyActionLabel}
              onAction={onEmptyAction}
            />
          </TableCell>
        </TableRow>
      );
    }

    return presence.map(({ key, item, phase }) => (
      <Fragment key={key}>{renderRow(item, phase)}</Fragment>
    ));
  };

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <colgroup>
          {columns.map(({ id }) => (
            <col key={id} style={{ width: dataColumnWidth }} />
          ))}
          <col style={{ width: actionsColumnWidth }} />
        </colgroup>
        <TableHead>
          <TableRow>
            {columns.map(({ id, label, sortable = true }) => (
              <TableCell
                key={id}
                align="right"
                sortDirection={sort.column === id ? sort.direction : false}
                sx={tableHeadCellSx}
              >
                {sortable ? (
                  <TableSortLabel
                    active={sort.column === id}
                    direction={sort.column === id ? sort.direction : 'asc'}
                    onClick={() => onSort(id)}
                    sx={tableSortLabelSx}
                  >
                    {label}
                  </TableSortLabel>
                ) : (
                  <Box sx={tableCellInnerSx}>{label}</Box>
                )}
              </TableCell>
            ))}
            <TableCell align="inherit" sx={tableHeadCellSx}>
              {actionsColumnLabel}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderBody()}</TableBody>
        {!isLoading && !error && !isEmpty ? (
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={columnCount}
                count={totalRows}
                page={page}
                onPageChange={(_: MouseEvent<HTMLButtonElement> | null, nextPage: number) =>
                  onPageChange(nextPage)
                }
                rowsPerPage={TABLE_ROWS_PER_PAGE}
                rowsPerPageOptions={[TABLE_ROWS_PER_PAGE]}
                labelRowsPerPage="שורות בעמוד:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
                sx={tablePaginationSx}
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </TableContainer>
  );
}
