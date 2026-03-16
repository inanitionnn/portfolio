import { lazy, Suspense, type ReactNode } from 'react';
import { ProgressBar } from 'react95';
import { type AppId } from '../types';

// errorTrigger has no window component — it triggers an error dialog instead
const appComponents: Partial<Record<AppId, React.LazyExoticComponent<() => ReactNode>>> = {
  browser: lazy(() => import('../apps/Browser/BrowserApp')),
  explorer: lazy(() => import('../apps/Explorer/ExplorerApp')),
  recycleBin: lazy(() => import('../apps/RecycleBin/RecycleBinApp')),
  contact: lazy(() => import('../apps/Contact/ContactApp')),
  about: lazy(() => import('../apps/AboutNotepad/AboutNotepad')),
  projectViewer: lazy(() => import('../apps/ProjectViewer/ProjectViewer')),
};

export const renderApp = (appId: AppId): ReactNode => {
  const AppComponent = appComponents[appId];
  if (!AppComponent) return null;
  return (
    <Suspense
      fallback={
        <div className="window-body" style={{ padding: 8 }}>
          <ProgressBar variant="tile" />
        </div>
      }
    >
      <AppComponent />
    </Suspense>
  );
};
