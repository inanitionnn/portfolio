import { useState, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDesktopStore } from '../../store/desktopStore';
import { useWindowStore } from '../../store/windowStore';
import { useErrorStore } from '../../store/errorStore';
import { useContextMenu } from '../../hooks/useContextMenu';
import { Window } from '../Window/Window';
import { DesktopIcon } from './DesktopIcon';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { ErrorDialog } from '../ErrorDialog/ErrorDialog';
import { Clippy } from '../Clippy/Clippy';
import { renderApp } from '../../utils/registry';
import { TASKBAR_HEIGHT } from '../../utils/constants';
import styles from './Desktop.module.css';

export const Desktop = () => {
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [propertiesOpen, setPropertiesOpen] = useState(false);

  const icons = useDesktopStore((s) => s.icons);
  const windows = useWindowStore(useShallow((s) => s.windows.filter((w) => w.isOpen)));
  const openWindow = useWindowStore((s) => s.openWindow);
  const errors = useErrorStore((s) => s.errors);
  const dismissError = useErrorStore((s) => s.dismissError);

  const { visible, x, y, items, showMenu, hideMenu } = useContextMenu();

  const hasOpenedBrowser = useRef(false);
  useEffect(() => {
    if (hasOpenedBrowser.current) return;
    hasOpenedBrowser.current = true;
    openWindow('browser', 'Internet Explorer', 'browser');
  }, [openWindow]);

  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedIconId(null);
    }
  };

  const handleDesktopContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    showMenu(e, [
      { label: 'New', disabled: true },
      { label: 'Properties', onClick: () => setPropertiesOpen(true) },
      { type: 'separator', label: '' },
      { label: 'Refresh' },
    ]);
  };

  return (
    <div
      className={styles.desktop}
      style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContextMenu}
    >
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          data={icon}
          isSelected={selectedIconId === icon.id}
          onSelect={setSelectedIconId}
        />
      ))}

      {windows.map((win) => (
        <Window key={win.id} id={win.id}>
          {renderApp(win.appId)}
        </Window>
      ))}

      <ContextMenu visible={visible} x={x} y={y} items={items} onClose={hideMenu} />

      {errors.map((err) => (
        <ErrorDialog
          key={err.id}
          {...err}
          onClose={(button) => {
            if (button === 'Hire Anyway') openWindow('contact', 'Contact', 'contact');
            dismissError(err.id);
          }}
        />
      ))}

      <Clippy />

      {propertiesOpen && (
        <div className={styles.propertiesOverlay} onClick={() => setPropertiesOpen(false)}>
          <div
            className={`window ${styles.propertiesDialog}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-bar">
              <div className="title-bar-text">System Properties</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setPropertiesOpen(false)} />
              </div>
            </div>
            <div className={`window-body ${styles.propertiesBody}`}>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>System:</span>
                <span>Windows 98 Portfolio Edition</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Version:</span>
                <span>4.10.2222 A</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Computer:</span>
                <span>OLEKSANDR-PC</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>RAM:</span>
                <span>640 KB (should be enough for anyone)</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Built with:</span>
                <span>React + Vite + TypeScript</span>
              </div>
            </div>
            <div className={styles.propertiesFooter}>
              <button className="button" onClick={() => setPropertiesOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
