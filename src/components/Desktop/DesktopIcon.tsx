import { useRef, useState, useEffect, useCallback } from 'react';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { type DesktopIconData } from '../../types';
import { useDesktopStore } from '../../store/desktopStore';
import { useWindowStore } from '../../store/windowStore';
import { appIconMap, recycleBinIconMap } from '../../utils/iconMap';
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

  const nodeRef = useRef<HTMLDivElement>(null);
  const clickTimeRef = useRef<number>(0);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);

  const isRecycleBin = appId === 'recycleBin';

  const RecycleBinIcon = recycleBinItems.length > 0
    ? recycleBinIconMap.full
    : recycleBinIconMap.empty;

  const IconComponent = isRecycleBin ? RecycleBinIcon : appIconMap[appId];

  const handleDragStop = (_e: DraggableEvent, d: DraggableData) => {
    const snapped = {
      x: snapToGrid(d.x),
      y: snapToGrid(d.y),
    };
    moveIcon(id, snapped);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (contextMenuOpen) {
      setContextMenuOpen(false);
      return;
    }

    const now = Date.now();
    const isDoubleClick = now - clickTimeRef.current < 400;
    clickTimeRef.current = now;

    if (isDoubleClick) {
      openWindow(appId, label, appId);
    } else {
      onSelect(id);
    }
  };

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (isRecycleBin) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect(id);
    setContextMenuOpen(true);
  }, [isRecycleBin, id, onSelect]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setContextMenuOpen(false);
    moveToRecycleBin(id);
  };

  useEffect(() => {
    if (!contextMenuOpen) return;

    const handleOutsideClick = () => setContextMenuOpen(false);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [contextMenuOpen]);

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      position={position}
      onStop={handleDragStop}
      grid={[ICON_GRID_SIZE, ICON_GRID_SIZE]}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`${styles.icon} ${isSelected ? styles.selected : ''}`}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        <div className={styles.iconImage}>
          <IconComponent width={32} height={32} />
        </div>
        <span className={styles.iconLabel}>{label}</span>

        {contextMenuOpen && (
          <div className={styles.contextMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.contextMenuItem} onClick={handleDelete}>
              Delete
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};
