import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.heading}>About</h2>
      <div className={styles.content}>
        <p>
          I'm a backend developer based in Kyiv, Ukraine, with 2.5+ years of
          experience building production systems. I specialize in Node.js
          ecosystem — NestJS, TypeScript, and PostgreSQL — with a focus on
          FinTech and banking.
        </p>
        <p>
          Currently at{' '}
          <a href="https://42flows.tech" target="_blank" rel="noopener noreferrer">
            42flows.tech
          </a>
          , working on a cashback platform that serves major Ukrainian banks. My
          day-to-day involves microservices architecture, message brokers, and
          multi-database environments where mistakes directly affect financial
          transactions.
        </p>
        <p>
          I value doing things right architecturally — even when it takes more
          upfront effort. I'm comfortable diving into legacy codebases, working
          with production databases, and taking ownership of critical system
          components.
        </p>
        <p>
          Outside of work, I'm interested in finance, rock climbing, guitar,
          and learning German.
        </p>
      </div>
    </section>
  );
}
