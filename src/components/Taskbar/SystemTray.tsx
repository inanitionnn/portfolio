import { useState, useEffect } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import styles from './SystemTray.module.css';

const formatTime = (date: Date): string => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const SystemTray = () => {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const { soundEnabled, toggleSound } = useSettingsStore((s) => ({
    soundEnabled: s.soundEnabled,
    toggleSound: s.toggleSound,
  }));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));

    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.tray}>
      <button
        className={styles.soundButton}
        onClick={toggleSound}
        title={soundEnabled ? 'Sound: On' : 'Sound: Off'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
      <span className={styles.clock}>{time}</span>
    </div>
  );
};
