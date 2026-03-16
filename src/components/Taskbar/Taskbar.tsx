import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWindowStore, getActiveWindowId } from '../../store/windowStore';
import { appIconMap } from '../../utils/iconMap';
import { TASKBAR_HEIGHT } from '../../utils/constants';
import { StartMenu } from './StartMenu';
import { SystemTray } from './SystemTray';
import styles from './Taskbar.module.css';

export const Taskbar = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const windows = useWindowStore(useShallow((s) => s.windows.filter((w) => w.isOpen)));
  const activeWindowId = useWindowStore((s) => getActiveWindowId(s.windows));

  const { focusWindow, minimizeWindow, restoreWindow } = useWindowStore(
    useShallow((s) => ({
      focusWindow: s.focusWindow,
      minimizeWindow: s.minimizeWindow,
      restoreWindow: s.restoreWindow,
    })),
  );

  const handleWindowButtonClick = (id: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(id);
    } else if (id === activeWindowId) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className={styles.taskbar} style={{ height: TASKBAR_HEIGHT }}>
      <div className={styles.startWrapper}>
        <button
          className={`${styles.startButton} ${isStartMenuOpen ? styles.startButtonActive : ''}`}
          onClick={() => setIsStartMenuOpen((v) => !v)}
        >
          <span className={styles.startLogo}>🪟</span>
          <span className={styles.startLabel}>Start</span>
        </button>

        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={() => setIsStartMenuOpen(false)}
        />
      </div>

      <div className={styles.divider} />

      <div className={styles.windowButtons}>
        {windows.map((win) => {
          const IconComponent = appIconMap[win.appId];
          const isActive = win.id === activeWindowId && !win.isMinimized;

          return (
            <button
              key={win.id}
              className={`${styles.windowButton} ${isActive ? styles.windowButtonActive : ''}`}
              onClick={() => handleWindowButtonClick(win.id, win.isMinimized)}
              title={win.title}
            >
              {IconComponent ? (
                <IconComponent width={16} height={16} className={styles.windowIcon} />
              ) : (
                <img src={win.icon} alt="" className={styles.windowIcon} />
              )}
              <span className={styles.windowTitle}>{win.title}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.trayWrapper}>
        <SystemTray />
      </div>
    </div>
  );
};
