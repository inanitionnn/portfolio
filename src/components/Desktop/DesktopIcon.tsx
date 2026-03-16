import { useRef, useState, useCallback } from 'react';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { type DesktopIconData } from '../../types';
import { useDesktopStore } from '../../store/desktopStore';
import { useWindowStore } from '../../store/windowStore';
import { useErrorStore } from '../../store/errorStore';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useIsMobile } from '../../hooks/useIsMobile';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { appIconMap, namedIconMap, recycleBinIconMap } from '../../utils/iconMap';
import { funnyErrors } from '../../data/errorMessages';
import { ICON_GRID_SIZE } from '../../utils/constants';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  data: DesktopIconData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const snapToGrid = (value: number): number =>
  Math.round(value / ICON_GRID_SIZE) * ICON_GRID_SIZE;

export const DesktopIcon = ({ data, isSelected, onSelect }: DesktopIconProps) => {
  const { id, label, appId, position } = data;

  const moveIcon = useDesktopStore((s) => s.moveIcon);
  const moveToRecycleBin = useDesktopStore((s) => s.moveToRecycleBin);
  const recycleBinItems = useDesktopStore((s) => s.recycleBinItems);
  const openWindow = useWindowStore((s) => s.openWindow);
  const showError = useErrorStore((s) => s.showError);

  const { visible, x, y, items, showMenu, hideMenu } = useContextMenu();
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const isMobile = useIsMobile();

  const nodeRef = useRef<HTMLDivElement>(null);
  const clickTimeRef = useRef<number>(0);

  const isRecycleBin = appId === 'recycleBin';
  const isErrorTrigger = appId === 'errorTrigger';

  const RecycleBinIcon = recycleBinItems.length > 0
    ? recycleBinIconMap.full
    : recycleBinIconMap.empty;

  const IconComponent = isRecycleBin
    ? RecycleBinIcon
    : (namedIconMap[data.icon] ?? appIconMap[appId]);

  const triggerError = useCallback(() => {
    const key = data.meta?.errorKey as string | undefined;
    const entry = key ? funnyErrors[key] : undefined;
    if (entry) showError(entry.title, entry.message, entry.icon, entry.buttons);
  }, [data.meta, showError]);

  const handleDragStop = (_e: DraggableEvent, d: DraggableData) => {
    const snapped = {
      x: snapToGrid(d.x),
      y: snapToGrid(d.y),
    };
    moveIcon(id, snapped);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const now = Date.now();
    const isDoubleClick = now - clickTimeRef.current < 300;
    clickTimeRef.current = now;

    if (isDoubleClick) {
      if (isErrorTrigger) {
        triggerError();
      } else {
        openWindow(appId, label, appId);
      }
    } else {
      onSelect(id);
    }
  };

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (isRecycleBin) return;
    e.stopPropagation();
    onSelect(id);
    showMenu(e, [
      {
        label: 'Open',
        onClick: () => isErrorTrigger ? triggerError() : openWindow(appId, label, appId),
      },
      { label: 'Delete', onClick: () => moveToRecycleBin(id) },
      { type: 'separator', label: '' },
      { label: 'Properties', onClick: () => setPropertiesOpen(true) },
    ]);
  }, [isRecycleBin, isErrorTrigger, id, appId, label, onSelect, showMenu, openWindow, moveToRecycleBin, triggerError]);

  return (
    <>
      <Draggable
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
        position={isMobile ? { x: 0, y: 0 } : position}
        onStop={handleDragStop}
        grid={[ICON_GRID_SIZE, ICON_GRID_SIZE]}
        bounds="parent"
        disabled={isMobile}
      >
        <div
          ref={nodeRef}
          className={`${styles.icon} ${isSelected ? styles.selected : ''}`}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          <div className={styles.iconImage}>
            {IconComponent && <IconComponent width={32} height={32} />}
          </div>
          <span className={styles.iconLabel}>{label}</span>
        </div>
      </Draggable>

      <ContextMenu visible={visible} x={x} y={y} items={items} onClose={hideMenu} />

      {propertiesOpen && (
        <div className={styles.propertiesOverlay} onClick={() => setPropertiesOpen(false)}>
          <div
            className={`window ${styles.propertiesDialog}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-bar">
              <div className="title-bar-text">{label} Properties</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setPropertiesOpen(false)} />
              </div>
            </div>
            <div className={`window-body ${styles.propertiesBody}`}>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Name:</span>
                <span>{label}</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Type:</span>
                <span>Application</span>
              </div>
              <div className={styles.propertiesRow}>
                <span className={styles.propertiesLabel}>Location:</span>
                <span>C:\Desktop</span>
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
    </>
  );
};
