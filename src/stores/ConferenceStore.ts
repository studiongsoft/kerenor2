import { makeAutoObservable, runInAction } from 'mobx';
import {
  deleteConference as deleteConferenceService,
  fetchConferences,
  saveConference as saveConferenceService,
} from '../services/conferenceService';
import type {
  ConferenceRowData,
  ConferenceSortColumn,
  ConferenceSortState,
} from '../types/conference';
import { DEFAULT_CONFERENCE_SORT } from '../types/conference';
import { TABLE_ROWS_PER_PAGE } from '../types/table';
import { filterConferences, sortConferences } from '../utils/conferenceListLogic';
import { toggleSort } from '../utils/sortLogic';

export class ConferenceStore {
  conferences: ConferenceRowData[] = [];

  isLoading = false;

  error: string | null = null;

  searchQuery = '';

  sort: ConferenceSortState = DEFAULT_CONFERENCE_SORT;

  page = 0;

  rowsPerPage = TABLE_ROWS_PER_PAGE;

  dialogOpen = false;

  editingRow: ConferenceRowData | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get filteredRows(): ConferenceRowData[] {
    return filterConferences(this.conferences, this.searchQuery);
  }

  get sortedRows(): ConferenceRowData[] {
    return sortConferences(this.filteredRows, this.sort);
  }

  get paginatedRows(): ConferenceRowData[] {
    return this.sortedRows.slice(
      this.page * this.rowsPerPage,
      this.page * this.rowsPerPage + this.rowsPerPage,
    );
  }

  get isEmpty(): boolean {
    return !this.isLoading && !this.error && this.filteredRows.length === 0;
  }

  async loadConferences(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchConferences();
      runInAction(() => {
        this.conferences = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בטעינת ועידות';
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

  handleSort(column: ConferenceSortColumn): void {
    this.sort = toggleSort(this.sort, column);
    this.page = 0;
  }

  openAddDialog(): void {
    this.editingRow = undefined;
    this.dialogOpen = true;
  }

  openEditDialog(row: ConferenceRowData): void {
    this.editingRow = row;
    this.dialogOpen = true;
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.editingRow = undefined;
  }

  async saveConference(row: ConferenceRowData): Promise<boolean> {
    try {
      const saved = await saveConferenceService(row);
      runInAction(() => {
        const exists = this.conferences.some((item) => item.id === saved.id);
        this.conferences = exists
          ? this.conferences.map((item) => (item.id === saved.id ? saved : item))
          : [...this.conferences, saved];
        this.dialogOpen = false;
        this.editingRow = undefined;
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בשמירת ועידה';
      });
      return false;
    }
  }

  async deleteConference(id: string): Promise<boolean> {
    try {
      await deleteConferenceService(id);
      runInAction(() => {
        this.conferences = this.conferences.filter((item) => item.id !== id);
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה במחיקת ועידה';
      });
      return false;
    }
  }
}
