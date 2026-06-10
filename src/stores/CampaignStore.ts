import { makeAutoObservable, runInAction } from 'mobx';
import {
  deleteCampaign as deleteCampaignService,
  fetchCampaigns,
  saveCampaign as saveCampaignService,
} from '../services/campaignService';
import type {
  CampaignPermission,
  CampaignRowData,
  CampaignSortColumn,
  CampaignSortState,
} from '../types/campaign';
import { DEFAULT_CAMPAIGN_SORT, canManageCampaigns } from '../types/campaign';
import { TABLE_ROWS_PER_PAGE } from '../types/table';
import { filterCampaigns, sortCampaigns, toggleSort } from '../utils/campaignListLogic';

export class CampaignStore {
  campaigns: CampaignRowData[] = [];

  isLoading = false;

  error: string | null = null;

  permission: CampaignPermission = 'full';

  searchQuery = '';

  sort: CampaignSortState = DEFAULT_CAMPAIGN_SORT;

  page = 0;

  rowsPerPage = TABLE_ROWS_PER_PAGE;

  dialogOpen = false;

  editingRow: CampaignRowData | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canManage(): boolean {
    return canManageCampaigns(this.permission);
  }

  get filteredRows(): CampaignRowData[] {
    return filterCampaigns(this.campaigns, this.searchQuery);
  }

  get sortedRows(): CampaignRowData[] {
    return sortCampaigns(this.filteredRows, this.sort);
  }

  get paginatedRows(): CampaignRowData[] {
    return this.sortedRows.slice(
      this.page * this.rowsPerPage,
      this.page * this.rowsPerPage + this.rowsPerPage,
    );
  }

  get isEmpty(): boolean {
    return !this.isLoading && !this.error && this.filteredRows.length === 0;
  }

  async loadCampaigns(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchCampaigns();
      runInAction(() => {
        this.campaigns = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בטעינת מבצעים';
        this.isLoading = false;
      });
    }
  }

  setPermission(permission: CampaignPermission): void {
    this.permission = permission;
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.page = 0;
  }

  setPage(page: number): void {
    this.page = page;
  }

  handleSort(column: CampaignSortColumn): void {
    this.sort = toggleSort(this.sort, column);
    this.page = 0;
  }

  openAddDialog(): void {
    this.editingRow = undefined;
    this.dialogOpen = true;
  }

  openEditDialog(row: CampaignRowData): void {
    this.editingRow = row;
    this.dialogOpen = true;
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.editingRow = undefined;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    if (!this.canManage) {
      return false;
    }
    try {
      await deleteCampaignService(id);
      runInAction(() => {
        this.campaigns = this.campaigns.filter((item) => item.id !== id);
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה במחיקת מבצע';
      });
      return false;
    }
  }

  async saveCampaign(row: CampaignRowData): Promise<boolean> {
    if (!this.canManage) {
      return false;
    }
    try {
      const saved = await saveCampaignService(row);
      runInAction(() => {
        const exists = this.campaigns.some((item) => item.id === saved.id);
        this.campaigns = exists
          ? this.campaigns.map((item) => (item.id === saved.id ? saved : item))
          : [...this.campaigns, saved];
        this.dialogOpen = false;
        this.editingRow = undefined;
      });
      return true;
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בשמירת מבצע';
      });
      return false;
    }
  }
}
