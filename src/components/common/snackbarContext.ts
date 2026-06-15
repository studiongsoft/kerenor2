import { createContext, useContext } from 'react';
import type { ItemToastPayload } from './toastMessages';

export interface SnackbarContextValue {
  showItemToast: (payload: ItemToastPayload) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within AppSnackbarProvider');
  }
  return context;
}
