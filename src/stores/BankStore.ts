import { makeAutoObservable, runInAction } from 'mobx';
import {
  deleteBank as deleteBankService,
  fetchBanks,
  saveBank as saveBankService,
} from '../services/bankService';
import type { BankRowData, BankSortColumn, BankSortState } from '../types/bank';
import { DEFAULT_BANK_SORT } from '../types/bank';
import { TABLE_ROWS_PER_PAGE } from '../types/table';
import { filterBanks, sortBanks } from '../utils/bankListLogic';
import { toggleSort } from '../utils/sortLogic';

export class BankStore {
  banks: BankRowData[] = [];

  isLoading = false;

  error: string | null = null;

  searchQuery = '';

  sort: BankSortState = DEFAULT_BANK_SORT;

  page = 0;

  rowsPerPage = TABLE_ROWS_PER_PAGE;

  dialogOpen = false;

  editingRow: BankRowData | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get filteredRows(): BankRowData[] {
    return filterBanks(this.banks, this.searchQuery);
  }

  get sortedRows(): BankRowData[] {
    return sortBanks(this.filteredRows, this.sort);
  }

  get paginatedRows(): BankRowData[] {
    return this.sortedRows.slice(
      this.page * this.rowsPerPage,
      this.page * this.rowsPerPage + this.rowsPerPage,
    );
  }

  get isEmpty(): boolean {
    return !this.isLoading && !this.error && this.filteredRows.length === 0;
  }

  async loadBanks(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchBanks();
      runInAction(() => {
        this.banks = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בטעינת בנקים';
        this.isLoading = false;
      });
    }
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.page = 0;
  }

  setPage(page: number): void {
    this.page = page;
  }

  handleSort(column: BankSortColumn): void {
    this.sort = toggleSort(this.sort, column);
    this.page = 0;
  }

  openAddDialog(): void {
    this.editingRow = undefined;
    this.dialogOpen = true;
  }

  openEditDialog(row: BankRowData): void {
    this.editingRow = row;
    this.dialogOpen = true;
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.editingRow = undefined;
  }

  async saveBank(row: BankRowData): Promise<boolean> {
    try {
      const saved = await saveBankService(row);
      runInAction(() => {
        const exists = this.banks.some((item) => item.id === saved.id);
        this.banks = exists
          ? this.banks.map((item) => (item.id === saved.id ? saved : item))
          : [...this.banks, saved];
        this.dialogOpen = false;
        this.editingRow = undefined;
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בשמירת בנק';
      });
      return false;
    }
  }

  async deleteBank(id: string): Promise<boolean> {
    try {
      await deleteBankService(id);
      runInAction(() => {
        this.banks = this.banks.filter((item) => item.id !== id);
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה במחיקת בנק';
      });
      return false;
    }
  }
}
