import { createContext, useContext, type ReactNode } from 'react';
import { CampaignStore } from './CampaignStore';

export interface RootStore {
  campaignStore: CampaignStore;
}

export function createRootStore(): RootStore {
  return {
    campaignStore: new CampaignStore(),
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
