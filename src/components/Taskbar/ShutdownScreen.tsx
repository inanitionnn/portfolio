import { useEffect } from 'react';
import { useUiStore } from '../../store/uiStore';
import styles from './ShutdownScreen.module.css';

const RESTART_DELAY_MS = 3000;

export const ShutdownScreen = () => {
  const { shutdownMode, setShutdownMode } = useUiStore((s) => ({
    shutdownMode: s.shutdownMode,
    setShutdownMode: s.setShutdownMode,
  }));

  useEffect(() => {
    if (shutdownMode === 'restart') {
      const timer = setTimeout(() => {
        setShutdownMode('off');
        window.location.reload();
      }, RESTART_DELAY_MS);
      return () => clearTimeout(timer);
    }
  }, [shutdownMode, setShutdownMode]);

  if (shutdownMode === 'off') return null;

  if (shutdownMode === 'shutdown') {
    return (
      <div className={styles.shutdownScreen}>
        <div className={styles.shutdownMessage}>
          <p>It is now safe to turn off</p>
          <p>your computer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.restartScreen}>
      <p className={styles.restartText}>Windows 98</p>
      <p className={styles.restartSub}>Please wait while your computer restarts...</p>
    </div>
  );
};
