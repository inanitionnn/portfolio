import { useEffect, useRef } from 'react';
import type { ContextMenuItem } from '../../types/contextMenu';
import styles from './ContextMenu.module.css';

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu = ({ visible, x, y, items, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  useEffect(() => {
    if (!visible || !menuRef.current) return;

    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (rect.right > vw) {
      menu.style.left = `${x - rect.width}px`;
    }
    if (rect.bottom > vh) {
      menu.style.top = `${y - rect.height}px`;
    }
  }, [visible, x, y]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return <div key={index} className={styles.separator} />;
        }

        return (
          <div
            key={index}
            className={`${styles.item} ${item.disabled ? styles.itemDisabled : ''}`}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onClose();
            }}
          >
            <span className={styles.itemIcon}>{item.icon ?? null}</span>
            <span className={styles.itemLabel}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
