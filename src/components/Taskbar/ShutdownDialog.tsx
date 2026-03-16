import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useUiStore } from '../../store/uiStore';
import { useErrorStore } from '../../store/errorStore';
import styles from './ShutdownDialog.module.css';

type DialogOption = 'shutdown' | 'restart' | 'standby';

interface ShutdownDialogProps {
  onClose: () => void;
}

export const ShutdownDialog = ({ onClose }: ShutdownDialogProps) => {
  const [selected, setSelected] = useState<DialogOption>('restart');

  const { setShutdownMode, setAppPhase } = useUiStore(
    useShallow((s) => ({
      setShutdownMode: s.setShutdownMode,
      setAppPhase: s.setAppPhase,
    })),
  );

  const showError = useErrorStore((s) => s.showError);

  const handleOk = () => {
    if (selected === 'standby') {
      showError(
        'Stand By',
        'Stand by mode is not supported on this computer.\n\nPlease try turning it off and on again.',
        'warning',
        ['OK'],
      );
      onClose();
      return;
    }

    onClose();

    if (selected === 'shutdown') {
      setAppPhase('bsod');
    } else {
      setShutdownMode('restart');
      setAppPhase('shuttingDown');
    }
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
            <img
              src="/shutdown-icon.png"
              alt=""
              className={styles.icon}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p className={styles.question}>What do you want the computer to do?</p>
          </div>

          <div className={styles.options}>
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
                value="standby"
                checked={selected === 'standby'}
                onChange={() => setSelected('standby')}
              />
              Stand by
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
