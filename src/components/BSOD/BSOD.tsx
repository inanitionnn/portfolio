import { useEffect } from 'react';
import styles from './BSOD.module.css';

interface BSODProps {
  onDismiss: () => void;
}

export const BSOD = ({ onDismiss }: BSODProps) => {
  useEffect(() => {
    const handleKey = () => onDismiss();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onDismiss]);

  return (
    <div className={styles.screen} onClick={onDismiss}>
      <div className={styles.content}>
        <p className={styles.header}>Windows</p>

        <p className={styles.body}>
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
          00010E36. The current application will be terminated.
        </p>

        <ul className={styles.list}>
          <li>Press any key to terminate the current application.</li>
          <li>Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved information in all applications.</li>
        </ul>

        <p className={styles.prompt}>Press any key to continue <span className={styles.cursor}>_</span></p>
      </div>
    </div>
  );
};
