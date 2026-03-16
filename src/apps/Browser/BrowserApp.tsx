import { useWindowStore } from '../../store/windowStore';
import styles from './BrowserApp.module.css';

const SKILLS = [
  'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL',
  'Kafka', 'Docker', 'AWS', 'Go', 'Python',
];

const BrowserApp = () => {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className={styles.browser}>
      {/* IE5 toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarButtons}>
          <button className="button" disabled title="Back">◄</button>
          <button className="button" disabled title="Forward">►</button>
          <button className="button" title="Refresh">↺</button>
          <button className="button" title="Home">⌂</button>
        </div>
        <div className={styles.addressBar}>
          <span className={styles.addressLabel}>Address</span>
          <input
            className={styles.addressInput}
            type="text"
            readOnly
            value="http://oleksandr.dev"
          />
          <button className="button" title="Go">Go</button>
        </div>
      </div>

      {/* Page content */}
      <div className={styles.page}>
        {/* Hero */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Oleksandr Tarasiuk</h1>
          <h2 className={styles.heroSubtitle}>Backend Developer</h2>
          <p className={styles.heroMeta}>3+ years of Node.js, NestJS, TypeScript in Banking &amp; Fintech</p>
        </div>

        <div className={styles.marqueeWrap}>
          <span className={styles.marqueeText}>
            🌐 Welcome to my personal homepage! &nbsp;&nbsp;&nbsp; 🚀 Hire me! &nbsp;&nbsp;&nbsp; 💾 Best viewed at 800x600 &nbsp;&nbsp;&nbsp; 🌐 Welcome to my personal homepage! &nbsp;&nbsp;&nbsp; 🚀 Hire me! &nbsp;&nbsp;&nbsp; 💾 Best viewed at 800x600 &nbsp;&nbsp;&nbsp;
          </span>
        </div>

        <div className={styles.counterBadge}>
          <span>🚧 UNDER CONSTRUCTION 🚧</span>
          <span className={styles.counter}>You are visitor #001337</span>
        </div>

        <hr className={styles.divider} />

        {/* Skills */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>⚙ Skills</h3>
          <table className={styles.skillsTable}>
            <tbody>
              <tr>
                {SKILLS.map((skill) => (
                  <td key={skill}>
                    <span className={styles.skillBadge}>{skill}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <hr className={styles.divider} />

        {/* Experience */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>💼 Experience</h3>
          <table className={styles.expTable}>
            <tbody>
              <tr>
                <td className={styles.expCompany}>42flows.tech</td>
                <td className={styles.expRole}>Backend Developer</td>
                <td className={styles.expPeriod}>2025 – Present</td>
              </tr>
              <tr>
                <td className={styles.expCompany}>CGS Team</td>
                <td className={styles.expRole}>Backend Developer</td>
                <td className={styles.expPeriod}>2023 – 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className={styles.divider} />

        {/* Quick Links */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>🔗 Quick Links</h3>
          <div className={styles.quickLinks}>
            <button
              className="button"
              onClick={() => openWindow('explorer', 'My Projects', 'explorer')}
            >
              📁 View Projects
            </button>
            <button
              className="button"
              onClick={() => openWindow('contact', 'Contact Me', 'contact')}
            >
              ✉ Contact Me
            </button>
            <a
              className={styles.cvLink}
              href="/cv.pdf"
              download
            >
              💾 Download CV
            </a>
          </div>
        </div>

        <hr className={styles.divider} />

        <footer className={styles.footer}>
          <p>Best viewed in Internet Explorer 5.0 at 800×600</p>
          <p>© 1999–2025 Oleksandr Tarasiuk. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BrowserApp;
