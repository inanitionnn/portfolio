import { useRef } from 'react';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { type DesktopIconData } from '../../types';
import { useDesktopStore } from '../../store/desktopStore';
import { useWindowStore } from '../../store/windowStore';
import { appIconMap } from '../../utils/iconMap';
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
  const openWindow = useWindowStore((s) => s.openWindow);

  const nodeRef = useRef<HTMLDivElement>(null);
  const clickTimeRef = useRef<number>(0);

  const IconComponent = appIconMap[appId];

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
    const isDoubleClick = now - clickTimeRef.current < 400;
    clickTimeRef.current = now;

    if (isDoubleClick) {
      openWindow(appId, label, appId);
    } else {
      onSelect(id);
    }
  };

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
      >
        <div className={styles.iconImage}>
          <IconComponent width={32} height={32} />
        </div>
        <span className={styles.iconLabel}>{label}</span>
      </div>
    </Draggable>
  );
};
