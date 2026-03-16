import { useState } from 'react';
import { useUiStore } from '../../store/uiStore';
import { type ShutdownMode } from '../../types/shutdown';
import styles from './ShutdownDialog.module.css';

interface ShutdownDialogProps {
  onClose: () => void;
}

export const ShutdownDialog = ({ onClose }: ShutdownDialogProps) => {
  const [selected, setSelected] = useState<Exclude<ShutdownMode, 'off'>>('shutdown');
  const setShutdownMode = useUiStore((s) => s.setShutdownMode);

  const handleOk = () => {
    onClose();
    setShutdownMode(selected);
  };

  return (
    <div className={styles.overlay}>
      <div className={`window ${styles.dialog}`}>
        <div className="title-bar">
          <div className="title-bar-text">Shut Down Windows</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div className={`window-body ${styles.body}`}>
          <div className={styles.topRow}>
            <img src="/shutdown-icon.png" alt="" className={styles.icon} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <p className={styles.question}>What do you want the computer to do?</p>
          </div>

          <div className={styles.options}>
            <label className={styles.option}>
              <input
                type="radio"
                name="shutdownMode"
                value="shutdown"
                checked={selected === 'shutdown'}
                onChange={() => setSelected('shutdown')}
              />
              Shut down the computer
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                name="shutdownMode"
                value="restart"
                checked={selected === 'restart'}
                onChange={() => setSelected('restart')}
              />
              Restart the computer
            </label>
          </div>

          <div className={styles.buttons}>
            <button onClick={handleOk}>OK</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
