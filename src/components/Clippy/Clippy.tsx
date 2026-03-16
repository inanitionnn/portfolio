import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ContextMenu } from '../ContextMenu/ContextMenu';
import { clippyTips } from '../../data/clippyTips';
import styles from './Clippy.module.css';

const APPEAR_DELAY_MS = 10_000;
const TIP_INTERVAL_MS = 20_000;

const getRandomTipIndex = (exclude: number): number => {
  if (clippyTips.length <= 1) return 0;
  let next: number;
  do {
    next = Math.floor(Math.random() * clippyTips.length);
  } while (next === exclude);
  return next;
};

export const Clippy = () => {
  const clippyVisible = useSettingsStore((s) => s.clippyVisible);
  const hideClippy = useSettingsStore((s) => s.hideClippy);

  const [appeared, setAppeared] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * clippyTips.length));
  const [bouncing, setBouncing] = useState(false);

  const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { visible: menuVisible, x: menuX, y: menuY, items: menuItems, showMenu, hideMenu } = useContextMenu();

  const showNextTip = useCallback((excludeIndex: number) => {
    const next = getRandomTipIndex(excludeIndex);
    setTipIndex(next);
    setBubbleVisible(true);
    setBouncing(true);
  }, []);

  const scheduleTipRotation = useCallback((currentIndex: number) => {
    if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    tipTimerRef.current = setTimeout(() => {
      showNextTip(currentIndex);
    }, TIP_INTERVAL_MS);
  }, [showNextTip]);

  // Initial appearance after delay
  useEffect(() => {
    if (!clippyVisible) return;
    const timer = setTimeout(() => {
      setAppeared(true);
      setBubbleVisible(true);
    }, APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, [clippyVisible]);

  // Start rotating tips once appeared
  useEffect(() => {
    if (!appeared || !clippyVisible) return;
    scheduleTipRotation(tipIndex);
    return () => {
      if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appeared, clippyVisible]);

  // Restart rotation whenever tip changes
  useEffect(() => {
    if (!appeared || !clippyVisible) return;
    scheduleTipRotation(tipIndex);
    return () => {
      if (tipTimerRef.current) clearTimeout(tipTimerRef.current);
    };
  }, [tipIndex, appeared, clippyVisible, scheduleTipRotation]);

  // Remove bouncing class after animation completes
  useEffect(() => {
    if (!bouncing) return;
    const timer = setTimeout(() => setBouncing(false), 450);
    return () => clearTimeout(timer);
  }, [bouncing]);

  const handleCharacterClick = () => {
    showNextTip(tipIndex);
  };

  const handleBubbleClose = () => {
    setBubbleVisible(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showMenu(e, [
      {
        label: 'Hide Clippy',
        onClick: hideClippy,
      },
    ]);
  };

  if (!clippyVisible || !appeared) return null;

  return (
    <div className={`${styles.wrapper} ${styles.visible}`}>
      {bubbleVisible && (
        <div className={styles.bubble}>
          <button className={styles.closeBtn} onClick={handleBubbleClose} aria-label="Close tip">
            ×
          </button>
          {clippyTips[tipIndex]}
        </div>
      )}

      <span
        className={`${styles.character} ${bouncing ? styles.bouncing : ''}`}
        onClick={handleCharacterClick}
        onContextMenu={handleContextMenu}
        role="button"
        aria-label="Clippy assistant"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCharacterClick()}
      >
        📎
      </span>

      <ContextMenu
        visible={menuVisible}
        x={menuX}
        y={menuY}
        items={menuItems}
        onClose={hideMenu}
      />
    </div>
  );
};
