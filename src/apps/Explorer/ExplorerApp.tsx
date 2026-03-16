import { useState, useCallback } from 'react';
import { FolderExe, Write1 } from '@react95/icons';
import { useWindowStore } from '../../store/windowStore';
import { projects } from '../../data/projects';
import { type ExplorerPath } from '../../types/explorer';
import { type Project } from '../../types';
import styles from './ExplorerApp.module.css';

const YEAR_FOLDERS: ExplorerPath[] = ['2024', '2025'];

const addressBarValue = (path: ExplorerPath): string => {
  if (path === 'root') return 'C:\\My Projects';
  return `C:\\My Projects\\${path}`;
};

const ExplorerApp = () => {
  const [currentPath, setCurrentPath] = useState<ExplorerPath>('root');
  const [history, setHistory] = useState<ExplorerPath[]>(['root']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openWindow = useWindowStore((s) => s.openWindow);

  const navigate = useCallback(
    (path: ExplorerPath) => {
      const newHistory = history.slice(0, historyIndex + 1).concat(path);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath(path);
      setSelectedId(null);
    },
    [history, historyIndex],
  );

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedId(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedId(null);
    }
  };

  const goUp = () => {
    if (currentPath !== 'root') {
      navigate('root');
    }
  };

  const handleProjectOpen = (project: Project) => {
    openWindow('projectViewer', project.name, 'projectViewer', { projectId: project.id });
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;
  const canGoUp = currentPath !== 'root';

  const visibleProjects =
    currentPath !== 'root' ? projects.filter((p) => p.year === Number(currentPath)) : [];

  const itemCount =
    currentPath === 'root' ? `${YEAR_FOLDERS.length} object(s)` : `${visibleProjects.length} object(s)`;

  return (
    <div className={styles.explorer}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarButtons}>
          <button className="button" disabled={!canGoBack} onClick={goBack} title="Back">
            ◄ Back
          </button>
          <button className="button" disabled={!canGoForward} onClick={goForward} title="Forward">
            Forward ►
          </button>
          <button className="button" disabled={!canGoUp} onClick={goUp} title="Up">
            ▲ Up
          </button>
        </div>
        <div className={styles.addressBar}>
          <span className={styles.addressLabel}>Address</span>
          <input
            className={styles.addressInput}
            type="text"
            readOnly
            value={addressBarValue(currentPath)}
          />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Tree panel */}
        <div className={styles.treePanel}>
          <div
            className={`${styles.treeItem} ${currentPath === 'root' ? styles.treeItemActive : ''}`}
            onClick={() => navigate('root')}
          >
            <FolderExe className={styles.treeIcon} />
            <span>My Projects</span>
          </div>
          {YEAR_FOLDERS.map((year) => (
            <div
              key={year}
              className={`${styles.treeItem} ${styles.treeItemChild} ${currentPath === year ? styles.treeItemActive : ''}`}
              onClick={() => navigate(year)}
            >
              <FolderExe className={styles.treeIcon} />
              <span>{year}</span>
            </div>
          ))}
        </div>

        {/* Splitter */}
        <div className={styles.splitter} />

        {/* Main panel */}
        <div
          className={styles.mainPanel}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedId(null);
          }}
        >
          {currentPath === 'root'
            ? YEAR_FOLDERS.map((year) => (
              <div
                key={year}
                className={`${styles.fileIcon} ${selectedId === year ? styles.fileIconSelected : ''}`}
                onClick={() => setSelectedId(year)}
                onDoubleClick={() => navigate(year)}
              >
                <FolderExe className={styles.iconImg} />
                <span className={styles.iconLabel}>{year}</span>
              </div>
            ))
            : visibleProjects.map((project) => (
              <div
                key={project.id}
                className={`${styles.fileIcon} ${selectedId === project.id ? styles.fileIconSelected : ''}`}
                onClick={() => setSelectedId(project.id)}
                onDoubleClick={() => handleProjectOpen(project)}
              >
                <Write1 className={styles.iconImg} />
                <span className={styles.iconLabel}>{project.name}.doc</span>
              </div>
            ))}
        </div>
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <span className={styles.statusSection}>{itemCount}</span>
        {selectedId && (
          <span className={styles.statusSection}>
            {currentPath === 'root'
              ? selectedId
              : visibleProjects.find((p) => p.id === selectedId)?.name ?? ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default ExplorerApp;
