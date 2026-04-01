import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>Hi, I'm</p>
      <h1 className={styles.name}>Oleksandr Tarasiuk</h1>
      <p className={styles.title}>Backend Developer</p>
      <p className={styles.subtitle}>
        Building reliable backend systems in FinTech.
        <br />
        Node.js, NestJS, TypeScript, distributed architectures.
      </p>
      <div className={styles.cta}>
        <a href="#contact" className={styles.primary}>
          Get in touch
        </a>
        <a href="#experience" className={styles.secondary}>
          View experience
        </a>
      </div>
    </section>
  );
}
