import styles from './AboutNotepad.module.css';

const CONTENT = `==============================================
ABOUT ME
Name:       Oleksandr Tarasiuk
Role:       Backend Developer
Experience: 3+ years commercial
Location:   Kyiv, Ukraine
Currently working at 42flows.tech building
banking fintech solutions with microservices
architecture.
Core stack:

Node.js / NestJS / TypeScript
PostgreSQL, Oracle, MsSQL, MongoDB
Kafka, RabbitMQ, Bull
Docker, AWS, Keycloak
Also: Python, Go, React

I enjoy building reliable distributed systems
and migrating monoliths to microservices.
==============================================
Fun facts:

Never used Windows 98 (but built this!)
This portfolio has more windows than
my apartment
==============================================`;

const MENU_ITEMS = ['File', 'Edit', 'Search', 'Help'] as const;

const AboutNotepad = () => {
  return (
    <div className={styles.notepad}>
      <div className={styles.menuBar}>
        {MENU_ITEMS.map((item) => (
          <button key={item} className={styles.menuItem}>
            {item}
          </button>
        ))}
      </div>
      <textarea className={styles.textarea} readOnly value={CONTENT} />
    </div>
  );
};

export default AboutNotepad;
