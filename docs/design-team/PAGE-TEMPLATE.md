# תבנית קוד — עמוד חדש

העתיקו והתאימו.

```tsx
/**
 * Figma: [שם המסך]
 * @see https://www.figma.com/design/[fileKey]?node-id=[nodeId]
 */
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import { DesignModeToggle } from '@studiongsoft/design-lead';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingState } from '../components/common/LoadingState';
import { useSnackbar } from '../components/common/AppSnackbarProvider';
import { useMyFeatureStore } from '../stores/rootStore';

function MyFeaturePageBase() {
  const store = useMyFeatureStore();
  const { showSnackbar } = useSnackbar();

  React.useEffect(() => {
    store.load();
  }, [store]);

  if (store.isLoading) {
    return <LoadingState message="טוען..." />;
  }

  if (store.error) {
    return <ErrorState message={store.error} onRetry={() => store.load()} />;
  }

  if (store.isEmpty) {
    return (
      <EmptyState
        title="אין נתונים"
        description="תיאור מצב ריק"
        actionLabel="פעולה"
        onAction={() => store.openCreate()}
      />
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Dev only — הסירו לפני production handoff אם נדרש */}
      <DesignModeToggle />

      {/* הרכבת UI — רכיבים קיימים בלבד */}
    </Box>
  );
}

const MyFeaturePage = observer(MyFeaturePageBase);
export default MyFeaturePage;
```

## Store stub (MobX)

```typescript
// stores/MyFeatureStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchItems } from '../services/myFeatureService';

export class MyFeatureStore {
  items: MyItem[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isEmpty(): boolean {
    return !this.isLoading && !this.error && this.items.length === 0;
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchItems();
      runInAction(() => {
        this.items = data;
        this.isLoading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : 'שגיאה בטעינה';
        this.isLoading = false;
      });
    }
  }
}
```

## Mock service

```typescript
// services/myFeatureService.ts
import { withMockDelay } from './apiClient';
import { MOCK_ITEMS } from './mocks/myFeatureMockData';

export async function fetchItems(): Promise<MyItem[]> {
  return withMockDelay([...MOCK_ITEMS]);
}
```

## Route

```tsx
// routes/index.tsx
<Route path="/my-feature" element={<MyFeaturePage />} />
```
