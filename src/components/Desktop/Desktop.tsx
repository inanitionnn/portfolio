import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDesktopStore } from '../../store/desktopStore';
import { useWindowStore } from '../../store/windowStore';
import { Window } from '../Window/Window';
import { DesktopIcon } from './DesktopIcon';
import { renderApp } from '../../utils/registry';
import { TASKBAR_HEIGHT } from '../../utils/constants';
import styles from './Desktop.module.css';

export const Desktop = () => {
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const icons = useDesktopStore((s) => s.icons);
  const windows = useWindowStore(useShallow((s) => s.windows.filter((w) => w.isOpen)));

  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedIconId(null);
    }
  };

  return (
    <div
      className={styles.desktop}
      style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
      onClick={handleDesktopClick}
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
    </div>
  );
};
