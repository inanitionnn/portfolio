import { useState } from 'react';
import styles from './NotepadApp.module.css';

export default function NotepadApp() {
  const [text, setText] = useState('');

  return (
    <div className={styles.container}>
      <textarea
        className={styles.editor}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        placeholder="Type here..."
        autoFocus
      />
    </div>
  );
}
