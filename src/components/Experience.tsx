import { experience } from '../data/experience';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.timeline}>
        {experience.map((job) => (
          <article key={job.company + job.period} className={styles.card}>
            <div className={styles.meta}>
              <span className={styles.period}>{job.period}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.role}>
                {job.role}{' '}
                <span className={styles.company}>@ {job.company}</span>
              </h3>
              <p className={styles.description}>{job.description}</p>
              <ul className={styles.highlights}>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className={styles.tags}>
                {job.stack.map((s) => (
                  <span key={s} className={styles.tag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
