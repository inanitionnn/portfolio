import { useEffect, useState } from 'react';
import { useUiStore } from '../../store/uiStore';
// TODO: import { useSounds } from '../../hooks/useSounds';
import styles from './ShutdownScreen.module.css';

type ShutdownPhase = 'shutting' | 'safe';

interface ShutdownScreenProps {
  onRestart: () => void;
}

const SAFE_MESSAGE_DELAY_MS = 2000;
const AUTO_RESTART_DELAY_MS = 3000;
const RESTART_MODE_DELAY_MS = 1500;

export const ShutdownScreen = ({ onRestart }: ShutdownScreenProps) => {
  const shutdownMode = useUiStore((s) => s.shutdownMode);
  const [phase, setPhase] = useState<ShutdownPhase>('shutting');
  // TODO: const { play } = useSounds();

  useEffect(() => {
    // TODO: play('shutdown');
  }, []);

  useEffect(() => {
    if (shutdownMode === 'restart') {
      const timer = setTimeout(() => onRestart(), RESTART_MODE_DELAY_MS);
      return () => clearTimeout(timer);
    }

    if (shutdownMode === 'shutdown') {
      const safeTimer = setTimeout(() => setPhase('safe'), SAFE_MESSAGE_DELAY_MS);
      return () => clearTimeout(safeTimer);
    }
  }, [shutdownMode, onRestart]);

  useEffect(() => {
    if (phase !== 'safe') return;

    const autoRestartTimer = setTimeout(() => onRestart(), AUTO_RESTART_DELAY_MS);
    return () => clearTimeout(autoRestartTimer);
  }, [phase, onRestart]);

  const handleClick = () => {
    if (phase === 'safe') {
      onRestart();
    }
  };

  return (
    <div className={styles.screen} onClick={handleClick}>
      {phase === 'shutting' && (
        <p className={styles.message}>Windows is shutting down...</p>
      )}
      {phase === 'safe' && (
        <p className={styles.message}>
          It's now safe to turn off
          <br />
          your computer.
        </p>
      )}
    </div>
  );
};
