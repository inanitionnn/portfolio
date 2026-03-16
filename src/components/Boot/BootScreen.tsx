import { useEffect, useState } from 'react';
import { ProgressBar } from 'react95';
import { useSounds } from '../../hooks/useSounds';
import styles from './BootScreen.module.css';

type BootPhase = 'black' | 'logo' | 'progress' | 'done';

interface BootScreenProps {
  onBootComplete: () => void;
}

const PROGRESS_INTERVAL_MS = 50;
const PROGRESS_STEP = 5;

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [phase, setPhase] = useState<BootPhase>('black');
  const [progress, setProgress] = useState(0);
  const { playStartup } = useSounds();

  useEffect(() => {
    const toLogoTimer = setTimeout(() => setPhase('logo'), 200);
    return () => clearTimeout(toLogoTimer);
  }, []);

  useEffect(() => {
    if (phase !== 'logo') return;
    const toProgressTimer = setTimeout(() => setPhase('progress'), 300);
    return () => clearTimeout(toProgressTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'progress') return;

    playStartup();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + PROGRESS_STEP;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (progress < 100) return;

    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 300);

    return () => clearTimeout(doneTimer);
  }, [progress]);

  useEffect(() => {
    if (phase !== 'done') return;
    onBootComplete();
  }, [phase, onBootComplete]);

  return (
    <div className={styles.screen}>
      {(phase === 'logo' || phase === 'progress' || phase === 'done') && (
        <div className={styles.logoWrapper}>
          <div className={styles.logoGrid}>
            <div className={`${styles.logoSquare} ${styles.red}`} />
            <div className={`${styles.logoSquare} ${styles.green}`} />
            <div className={`${styles.logoSquare} ${styles.blue}`} />
            <div className={`${styles.logoSquare} ${styles.yellow}`} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoWindows}>Windows</span>
            <span className={styles.logo98}>98</span>
          </div>
        </div>
      )}

      {phase === 'progress' && (
        <div className={styles.progressWrapper}>
          <ProgressBar value={progress} />
        </div>
      )}
    </div>
  );
};
