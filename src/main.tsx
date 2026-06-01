import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
import { AppSnackbarProvider } from './components/common/AppSnackbarProvider';
import { createRootStore, StoreProvider } from './stores/rootStore';
import { KerenOrThemeProvider } from './theme/KerenOrThemeProvider';

const rootStore = createRootStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <KerenOrThemeProvider>
        <AppSnackbarProvider>
          <StoreProvider store={rootStore}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StoreProvider>
        </AppSnackbarProvider>
      </KerenOrThemeProvider>
    </AppErrorBoundary>
  </StrictMode>,
);
