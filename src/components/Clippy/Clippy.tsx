import { useState, useEffect, useCallback } from 'react';
import styles from './Clippy.module.css';

const TIPS = [
  "It looks like you're browsing a portfolio. Would you like help?",
  'Tip: Double-click icons to open applications.',
  'Did you know? You can drag windows around the desktop!',
  'It looks like you need to hire someone. I can help with that!',
  "Pro tip: Check out 'My Projects' to see some cool work.",
  'Need to contact the developer? Try the Contact Me icon!',
];

const TIP_INTERVAL_MS = 15000;

export const Clippy = () => {
  const [visible, setVisible] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const showNextTip = useCallback(() => {
    setTipIndex((i) => (i + 1) % TIPS.length);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const initialTimer = setTimeout(() => setVisible(true), 3000);
    const interval = setInterval(showNextTip, TIP_INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed, showNextTip]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleClose = () => setVisible(false);

  if (dismissed && !visible) return null;

  return (
    <div className={styles.container}>
      {visible && (
        <div className={styles.bubble}>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">✕</button>
          <p className={styles.text}>{TIPS[tipIndex]}</p>
          <div className={styles.bubbleButtons}>
            <button onClick={handleClose}>OK</button>
            <button onClick={handleDismiss}>Don't show again</button>
          </div>
        </div>
      )}
      <button
        className={styles.clippyBtn}
        onClick={() => setVisible((v) => !v)}
        aria-label="Clippy"
        title="Clippy"
      >
        <div className={styles.clippyBody}>
          <div className={styles.clippyEyes}>
            <div className={styles.eye} />
            <div className={styles.eye} />
          </div>
          <div className={styles.clippyMouth} />
        </div>
      </button>
    </div>
  );
};
