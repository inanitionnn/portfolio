import { useState } from 'react';
import styles from './Header.module.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo}>
          OT
        </a>
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.line} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.line} ${menuOpen ? styles.open : ''}`} />
        </button>
        <ul className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
