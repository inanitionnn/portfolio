import { useState } from 'react';
import styles from './ContactApp.module.css';

const CURRENT_DATE = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const FOLDERS = [
  { id: 'inbox', label: '📥 Inbox', count: 1 },
  { id: 'outbox', label: '📤 Outbox', count: 0 },
  { id: 'sent', label: '📨 Sent Items', count: 0 },
  { id: 'deleted', label: '🗑️ Deleted Items', count: 0 },
];

const CONTACT_LINKS = [
  {
    icon: '📧',
    label: 'Email',
    display: 'tarolv3@gmail.com',
    href: 'mailto:tarolv3@gmail.com',
  },
  {
    icon: '💬',
    label: 'Telegram',
    display: '@tarolv3',
    href: 'https://t.me/tarolv3',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    display: 'linkedin.com/in/oleksandr-tarasiuk',
    href: 'https://www.linkedin.com/in/oleksandr-tarasiuk',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    display: 'github.com/tarolv3',
    href: 'https://github.com/tarolv3',
  },
];

const ContactApp = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(0);

  const showMessage = selectedFolder === 'inbox' && selectedMessage === 0;

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={`button ${styles.toolbarBtn}`}>
          <span className={styles.toolbarIcon}>✉</span> New Mail
        </button>
        <button className={`button ${styles.toolbarBtn}`} disabled>
          <span className={styles.toolbarIcon}>↩</span> Reply
        </button>
        <button className={`button ${styles.toolbarBtn}`} disabled>
          <span className={styles.toolbarIcon}>↪</span> Forward
        </button>
        <div className={styles.toolbarSep} />
        <button className={`button ${styles.toolbarBtn}`} disabled>
          <span className={styles.toolbarIcon}>🗑</span> Delete
        </button>
      </div>

      {/* Main layout */}
      <div className={styles.main}>
        {/* Left panel — folders */}
        <div className={styles.folderPanel}>
          <div className={styles.folderHeader}>Folders</div>
          <ul className={styles.folderList}>
            {FOLDERS.map((folder) => (
              <li
                key={folder.id}
                className={`${styles.folderItem} ${selectedFolder === folder.id ? styles.folderItemActive : ''}`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <span className={styles.folderLabel}>{folder.label}</span>
                {folder.count > 0 && (
                  <span className={styles.folderBadge}>({folder.count})</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right panel — message list + message pane */}
        <div className={styles.rightPanel}>
          {/* Message list */}
          <div className={styles.messageList}>
            <table className={styles.messageTable}>
              <thead>
                <tr>
                  <th className={styles.colFrom}>From</th>
                  <th className={styles.colSubject}>Subject</th>
                  <th className={styles.colDate}>Received</th>
                </tr>
              </thead>
              <tbody>
                {selectedFolder === 'inbox' ? (
                  <tr
                    className={`${styles.messageRow} ${selectedMessage === 0 ? styles.messageRowSelected : ''}`}
                    onClick={() => setSelectedMessage(0)}
                  >
                    <td className={styles.colFrom}>
                      <strong>visitor@internet.com</strong>
                    </td>
                    <td className={styles.colSubject}>
                      <strong>How to reach Oleksandr?</strong>
                    </td>
                    <td className={styles.colDate}>{CURRENT_DATE}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={3} className={styles.emptyFolder}>
                      There are no items to show in this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Message pane */}
          <div className={styles.messagePane}>
            {showMessage ? (
              <>
                {/* Message header */}
                <div className={styles.msgHeader}>
                  <table className={styles.msgHeaderTable}>
                    <tbody>
                      <tr>
                        <td className={styles.msgHeaderLabel}>From:</td>
                        <td>visitor@internet.com</td>
                      </tr>
                      <tr>
                        <td className={styles.msgHeaderLabel}>To:</td>
                        <td>tarolv3@gmail.com</td>
                      </tr>
                      <tr>
                        <td className={styles.msgHeaderLabel}>Subject:</td>
                        <td>
                          <strong>How to reach Oleksandr?</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.msgHeaderLabel}>Date:</td>
                        <td>{CURRENT_DATE}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr className={styles.msgDivider} />

                {/* Message body */}
                <div className={styles.msgBody}>
                  <p className={styles.msgGreeting}>Hey! Here&apos;s how you can reach me:</p>

                  <ul className={styles.contactList}>
                    {CONTACT_LINKS.map((link) => (
                      <li key={link.label} className={styles.contactItem}>
                        <span className={styles.contactIcon}>{link.icon}</span>
                        <span className={styles.contactLabel}>{link.label}:</span>
                        <a
                          href={link.href}
                          className={styles.contactLink}
                          target={link.href.startsWith('mailto') ? undefined : '_blank'}
                          rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                        >
                          {link.display}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <p className={styles.msgSignature}>— Oleksandr Tarasiuk, Backend Developer</p>
                </div>
              </>
            ) : (
              <div className={styles.emptyPane}>Select a message to read it.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
