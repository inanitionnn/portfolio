import { useEffect, useState } from 'react';
import { useSounds } from '../../hooks/useSounds';
import styles from './BSOD.module.css';

const BSOD_LINES = [
  'Windows',
  '',
  'A fatal exception 0x0BADC0DE has occurred at 0028:C0FF33EE in VXD PORTFOLIO(01) +',
  '00000042. The current application will be terminated.',
  '',
  '*  Press any key to hire this developer.',
  '*  Press CTRL+ALT+DEL to restart your computer. You will',
  '   lose any unsaved information in all applications.',
  '',
  '                        Press any key to continue _',
];

const LINE_DELAY_MS = 100;

interface BSODProps {
  onDismiss: () => void;
}

export const BSOD = ({ onDismiss }: BSODProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const { playError } = useSounds();

  useEffect(() => {
    playError();
  }, [playError]);

  useEffect(() => {
    if (visibleCount >= BSOD_LINES.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, LINE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  useEffect(() => {
    const handleKeyDown = () => onDismiss();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  const isLastLine = (index: number) => index === BSOD_LINES.length - 1;
  const allVisible = visibleCount >= BSOD_LINES.length;

  return (
    <div className={styles.screen} onClick={onDismiss}>
      <div className={styles.content}>
        {BSOD_LINES.slice(0, visibleCount).map((line, index) => (
          <div key={index} className={styles.line}>
            {isLastLine(index) ? (
              <>
                {'                        Press any key to continue '}
                {allVisible && <span className={styles.cursor}>_</span>}
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
