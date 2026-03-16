import { type ReactNode } from 'react';
import { Rnd, type RndResizeCallback, type DraggableData, type DraggableEvent } from 'react-rnd';
import { useShallow } from 'zustand/react/shallow';
import { useWindowStore, getActiveWindowId } from '../../store/windowStore';
import styles from './Window.module.css';

interface WindowProps {
  id: string;
  children: ReactNode;
}

export const Window = ({ id, children }: WindowProps) => {
  const { position, size, zIndex, isMinimized, isMaximized, title, icon } =
    useWindowStore(
      useShallow((s) => {
        const w = s.windows.find((w) => w.id === id)!;
        return {
          position: w.position,
          size: w.size,
          zIndex: w.zIndex,
          isMinimized: w.isMinimized,
          isMaximized: w.isMaximized,
          title: w.title,
          icon: w.icon,
        };
      }),
    );

  const isActive = useWindowStore((s) => getActiveWindowId(s.windows) === id);

  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, unmaximizeWindow, updatePosition, updateSize } =
    useWindowStore(
      useShallow((s) => ({
        focusWindow: s.focusWindow,
        closeWindow: s.closeWindow,
        minimizeWindow: s.minimizeWindow,
        maximizeWindow: s.maximizeWindow,
        unmaximizeWindow: s.unmaximizeWindow,
        updatePosition: s.updatePosition,
        updateSize: s.updateSize,
      })),
    );

  const handleDragStop = (_e: DraggableEvent, d: DraggableData) => {
    updatePosition(id, { x: d.x, y: d.y });
  };

  const handleResizeStop: RndResizeCallback = (_e, _dir, ref, _delta, pos) => {
    updateSize(id, { width: ref.offsetWidth, height: ref.offsetHeight });
    updatePosition(id, pos);
  };

  const handleMaximizeToggle = () => {
    if (isMaximized) {
      unmaximizeWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  return (
    <Rnd
      position={position}
      size={size}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      dragHandleClassName="title-bar"
      bounds="parent"
      minWidth={200}
      minHeight={150}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      style={{ zIndex, display: isMinimized ? 'none' : 'block' }}
      onMouseDown={() => focusWindow(id)}
      className={styles.rnd}
    >
      <div className={`window ${styles.window}`}>
        <div className={`title-bar ${!isActive ? styles.titleBarInactive : ''}`}>
          <div className="title-bar-text">
            <img src={icon} className={styles.titleIcon} alt="" />
            {title}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={() => minimizeWindow(id)} />
            <button
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              onClick={handleMaximizeToggle}
            />
            <button aria-label="Close" onClick={() => closeWindow(id)} />
          </div>
        </div>
        <div className={`window-body ${styles.windowBody}`}>{children}</div>
      </div>
    </Rnd>
  );
};
