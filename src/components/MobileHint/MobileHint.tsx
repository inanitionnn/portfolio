import styles from './MobileHint.module.css';

export const MobileHint = () => (
  <div className={styles.hint}>
    <span className={styles.icon}>🖥️</span>
    <span className={styles.text}>
      For best experience, use desktop resolution 1024×768
    </span>
  </div>
);
