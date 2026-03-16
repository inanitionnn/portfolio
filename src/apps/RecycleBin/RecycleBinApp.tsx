import { useState, useCallback } from 'react';
import { Notepad, Ie } from '@react95/icons';
import { useDesktopStore } from '../../store/desktopStore';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ContextMenu } from '../../components/ContextMenu/ContextMenu';
import { type DesktopIconData } from '../../types';
import styles from './RecycleBinApp.module.css';

const FILE_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  about: Notepad,
  browser: Ie,
};

const RecycleBinApp = () => {
  const recycleBinItems = useDesktopStore((s) => s.recycleBinItems);
  const restoreFromRecycleBin = useDesktopStore((s) => s.restoreFromRecycleBin);
  const deleteFromRecycleBin = useDesktopStore((s) => s.deleteFromRecycleBin);
  const emptyRecycleBin = useDesktopStore((s) => s.emptyRecycleBin);

  const playEmptyBin = useSoundEffect('/sounds/empty-recycle-bin.mp3');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [jokeErrorItem, setJokeErrorItem] = useState<DesktopIconData | null>(null);

  const { visible, x, y, items, showMenu, hideMenu } = useContextMenu();

  const handleItemDoubleClick = useCallback((item: DesktopIconData) => {
    if (item.meta?.isJoke) {
      setJokeErrorItem(item);
    } else {
      restoreFromRecycleBin(item.id);
    }
  }, [restoreFromRecycleBin]);

  const handleItemContextMenu = useCallback((e: React.MouseEvent, item: DesktopIconData) => {
    e.stopPropagation();
    setSelectedId(item.id);
    showMenu(e, [
      { label: 'Restore', onClick: () => restoreFromRecycleBin(item.id) },
      { label: 'Delete permanently', onClick: () => deleteFromRecycleBin(item.id) },
    ]);
  }, [showMenu, restoreFromRecycleBin, deleteFromRecycleBin]);

  const handleEmptyRecycleBin = () => {
    if (recycleBinItems.length === 0) return;
    emptyRecycleBin();
    playEmptyBin();
  };

  const itemCount = recycleBinItems.length;

  return (
    <div className={styles.recycleBin}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarButtons}>
          <button
            className="button"
            disabled={itemCount === 0}
            onClick={handleEmptyRecycleBin}
          >
            Empty Recycle Bin
          </button>
        </div>
        <div className={styles.addressBar}>
          <span className={styles.addressLabel}>Address</span>
          <input
            className={styles.addressInput}
            type="text"
            readOnly
            value="C:\RECYCLED"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={styles.mainPanel}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {itemCount === 0 ? (
          <div className={styles.emptyMessage}>(empty)</div>
        ) : (
          recycleBinItems.map((item) => {
            const IconComponent = FILE_ICONS[item.appId] ?? Notepad;
            return (
              <div
                key={item.id}
                className={`${styles.fileIcon} ${selectedId === item.id ? styles.fileIconSelected : ''}`}
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                onContextMenu={(e) => handleItemContextMenu(e, item)}
              >
                <IconComponent className={styles.iconImg} />
                <span className={styles.iconLabel}>{item.label}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <span className={styles.statusSection}>{itemCount} object(s)</span>
        {selectedId && (
          <span className={styles.statusSection}>
            {recycleBinItems.find((i) => i.id === selectedId)?.label ?? ''}
          </span>
        )}
      </div>

      {/* Joke error dialog */}
      {jokeErrorItem && (
        <div className={styles.errorOverlay}>
          <div className={`window ${styles.errorDialog}`}>
            <div className="title-bar">
              <div className="title-bar-text">Error</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setJokeErrorItem(null)} />
              </div>
            </div>
            <div className={`window-body ${styles.errorBody}`}>
              <div className={styles.errorIcon}>✖</div>
              <p className={styles.errorText}>
                {String(jokeErrorItem.meta?.errorMsg ?? 'Unknown error occurred.')}
              </p>
            </div>
            <div className={styles.errorFooter}>
              <button className="button" onClick={() => setJokeErrorItem(null)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <ContextMenu visible={visible} x={x} y={y} items={items} onClose={hideMenu} />
    </div>
  );
};

export default RecycleBinApp;
