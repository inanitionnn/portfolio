import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import type { DraggableData } from 'react-draggable';
import type { DraggableEvent } from 'react-draggable';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { type IconType } from '../../types/errorDialog';
import styles from './ErrorDialog.module.css';

const DIALOG_WIDTH = 400;
const DIALOG_Z_INDEX = 10000;

interface ErrorDialogProps {
  id: string;
  icon: IconType;
  title: string;
  message: string;
  buttons: string[];
  onClose: (button: string) => void;
}

export const ErrorDialog = ({ id: _id, icon, title, message, buttons, onClose }: ErrorDialogProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => ({
    x: Math.max(0, window.innerWidth / 2 - DIALOG_WIDTH / 2),
    y: Math.max(0, window.innerHeight / 2 - 160),
  }));

  const playError = useSoundEffect('/sounds/error.mp3');

  useEffect(() => {
    playError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = () => setIsDragging(true);

  const handleDragStop = (_e: DraggableEvent, d: DraggableData) => {
    setIsDragging(false);
    setPosition({ x: d.x, y: d.y });
  };

  return (
    <Rnd
      position={position}
      size={{ width: DIALOG_WIDTH, height: 'auto' }}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      dragHandleClassName="title-bar"
      bounds="window"
      enableResizing={false}
      style={{ zIndex: DIALOG_Z_INDEX }}
      className={`${styles.rnd} ${isDragging ? styles.dragging : ''}`}
    >
      <div className={`window ${styles.window}`}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={() => onClose('Close')} />
          </div>
        </div>
        <div className={`window-body ${styles.body}`}>
          <div className={styles.content}>
            <div className={`${styles.icon} ${styles[`icon_${icon}`]}`} aria-hidden="true">
              {icon === 'error' && <span className={styles.iconSymbol}>✕</span>}
              {icon === 'warning' && <span className={styles.iconSymbol}>!</span>}
              {icon === 'info' && <span className={styles.iconSymbol}>i</span>}
            </div>
            <p className={styles.message}>{message}</p>
          </div>
          <div className={styles.buttons}>
            {buttons.map((btn) => (
              <button key={btn} onClick={() => onClose(btn)}>
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Rnd>
  );
};
