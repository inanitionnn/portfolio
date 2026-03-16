import { useWindowStore } from '../../store/windowStore';
import { useWindowId } from '../../contexts/WindowContext';
import { projects } from '../../data/projects';
import styles from './ProjectViewer.module.css';

const RULER_TICKS = Array.from({ length: 32 }, (_, i) => i);

const ProjectViewer = () => {
  const windowId = useWindowId();
  const meta = useWindowStore((s) => s.windows.find((w) => w.id === windowId)?.meta);
  const projectId = meta?.projectId as string | undefined;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.paper}>
          <p className={styles.notFound}>File not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {/* Menu bar */}
      <div className={styles.menuBar}>
        {['File', 'Edit', 'View', 'Format', 'Help'].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button className={styles.toolbarBtn} title="Bold">
            <b>B</b>
          </button>
          <button className={styles.toolbarBtn} title="Italic">
            <i>I</i>
          </button>
          <button className={styles.toolbarBtn} title="Underline">
            <u>U</u>
          </button>
        </div>
        <div className={styles.toolbarDivider} />
        <div className={styles.toolbarGroup}>
          <select className={styles.fontSelect} defaultValue="Times New Roman" disabled>
            <option>Times New Roman</option>
          </select>
          <select className={styles.sizeSelect} defaultValue="12" disabled>
            <option>12</option>
          </select>
        </div>
      </div>

      {/* Ruler */}
      <div className={styles.ruler}>
        <div className={styles.rulerInner}>
          {RULER_TICKS.map((i) => (
            <div
              key={i}
              className={`${styles.tick} ${i % 4 === 0 ? styles.tickMajor : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable document area */}
      <div className={styles.wrapper}>
        <div className={styles.paper}>
          {/* Title */}
          <h1 className={styles.title}>{project.name}</h1>

          {/* URL */}
          <p className={styles.urlLine}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {project.url}
            </a>
          </p>

          <hr className={styles.divider} />

          {/* Description */}
          <p className={styles.section}>
            <span className={styles.label}>Description:</span> {project.description}
          </p>

          {/* Tech Stack */}
          <div className={styles.sectionBlock}>
            <span className={styles.label}>Tech Stack:</span>
            <div className={styles.tags}>
              {project.stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Contributions */}
          <div className={styles.sectionBlock}>
            <span className={styles.label}>Key Contributions:</span>
            <ul className={styles.bullets}>
              {project.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <p className={styles.copyright}>© 2024 Oleksandr Tarasiuk</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
