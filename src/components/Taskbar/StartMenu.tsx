import { useEffect, useRef, useState } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { appIconMap } from '../../utils/iconMap';
import { INITIAL_DESKTOP_ICONS } from '../../data/desktopItems';
import { ShutdownDialog } from './ShutdownDialog';
import styles from './StartMenu.module.css';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROGRAMS = INITIAL_DESKTOP_ICONS.filter((item) => item.appId !== 'recycleBin');

export const StartMenu = ({ isOpen, onClose }: StartMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isShutdownOpen, setIsShutdownOpen] = useState(false);

  const openWindow = useWindowStore((s) => s.openWindow);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsProgramsOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProgramClick = (item: (typeof PROGRAMS)[number]) => {
    openWindow(item.appId, item.label, item.appId);
    onClose();
  };

  const handleShutDown = () => {
    setIsShutdownOpen(true);
  };

  return (
    <>
      <div ref={menuRef} className={styles.menu}>
        <div className={styles.sidebar}>
          <span className={styles.sidebarText}>Windows 98</span>
        </div>

        <div className={styles.items}>
          <div
            className={`${styles.item} ${isProgramsOpen ? styles.itemActive : ''}`}
            onMouseEnter={() => setIsProgramsOpen(true)}
            onMouseLeave={() => setIsProgramsOpen(false)}
          >
            <span className={styles.itemIcon}>📁</span>
            <span className={styles.itemLabel}>Programs</span>
            <span className={styles.arrow}>▶</span>

            {isProgramsOpen && (
              <div className={styles.submenu}>
                {PROGRAMS.map((item) => {
                  const IconComponent = appIconMap[item.appId];
                  return (
                    <button
                      key={item.id}
                      className={styles.submenuItem}
                      onClick={() => handleProgramClick(item)}
                    >
                      {IconComponent ? (
                        <IconComponent width={16} height={16} className={styles.appIcon} />
                      ) : (
                        <span className={styles.itemIcon}>📄</span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <hr className={styles.separator} />

          <button className={styles.item} onClick={handleShutDown}>
            <span className={styles.itemIcon}>🔌</span>
            <span className={styles.itemLabel}>Shut Down...</span>
          </button>
        </div>
      </div>

      {isShutdownOpen && (
        <ShutdownDialog
          onClose={() => {
            setIsShutdownOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};
