import { projects } from '../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                    <span className={styles.arrow}> ↗</span>
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <span className={styles.company}>{project.company}</span>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tags}>
              {project.stack.map((s) => (
                <span key={s} className={styles.tag}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
