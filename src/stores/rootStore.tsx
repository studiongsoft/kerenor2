import { createContext, useContext, type ReactNode } from 'react';
import { BankStore } from './BankStore';
import { CampaignStore } from './CampaignStore';
import { ConferenceStore } from './ConferenceStore';

export interface RootStore {
  campaignStore: CampaignStore;
  bankStore: BankStore;
  conferenceStore: ConferenceStore;
}

export function createRootStore(): RootStore {
  return {
    campaignStore: new CampaignStore(),
    bankStore: new BankStore(),
    conferenceStore: new ConferenceStore(),
  };
}

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({
  store,
  children,
}: {
  store: RootStore;
  children: ReactNode;
}) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useRootStore(): RootStore {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useRootStore must be used within StoreProvider');
  }
  return store;
}

export function useCampaignStore(): CampaignStore {
  return useRootStore().campaignStore;
}

export function useBankStore(): BankStore {
  return useRootStore().bankStore;
}

export function useConferenceStore(): ConferenceStore {
  return useRootStore().conferenceStore;
}
