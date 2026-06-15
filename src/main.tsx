import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppErrorBoundary } from './components/common/AppErrorBoundary';
import { createRootStore, StoreProvider } from './stores/rootStore';
import { KerenOrThemeProvider } from './theme/KerenOrThemeProvider';

const rootStore = createRootStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <KerenOrThemeProvider>
        <StoreProvider store={rootStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StoreProvider>
      </KerenOrThemeProvider>
    </AppErrorBoundary>
  </StrictMode>,
);
