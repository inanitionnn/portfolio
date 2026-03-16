import { useState, useRef, useCallback, useEffect } from 'react';
import { ErrorDialog } from '../../components/ErrorDialog/ErrorDialog';
import { useWindowStore } from '../../store/windowStore';
import { useWindowId } from '../../contexts/WindowContext';
import { useErrorStore } from '../../store/errorStore';
import type { IconType } from '../../types/errorDialog';
import styles from './NotepadApp.module.css';

type MenuId = 'file' | 'edit' | 'format' | 'help';

interface LocalDialog {
  title: string;
  message: string;
  icon: IconType;
  buttons: string[];
  onClose: (btn: string) => void;
}

const NotepadApp = () => {
  const [text, setText] = useState('');
  const [wordWrap, setWordWrap] = useState(true);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [localDialog, setLocalDialog] = useState<LocalDialog | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const windowId = useWindowId();
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const showError = useErrorStore((s) => s.showError);

  useEffect(() => {
    if (!activeMenu) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [activeMenu]);

  const toggleMenu = (menuId: MenuId) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };

  const insertAtCursor = useCallback(
    (insertText: string) => {
      const ta = textareaRef.current;
      if (!ta) return;

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newText = text.slice(0, start) + insertText + text.slice(end);
      setText(newText);

      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + insertText.length;
        ta.focus();
      });
    },
    [text],
  );

  const handleNew = useCallback(() => {
    setActiveMenu(null);
    if (!text) return;

    setLocalDialog({
      title: 'Notepad',
      message: 'Do you want to save changes?',
      icon: 'warning',
      buttons: ['Yes', 'No', 'Cancel'],
      onClose: (btn) => {
        setLocalDialog(null);
        if (btn === 'No') setText('');
      },
    });
  }, [text]);

  const handleOpen = useCallback(() => {
    setActiveMenu(null);
    showError(
      'Notepad',
      'The file system is not available.\nThis is a portfolio, not an OS :)',
      'error',
    );
  }, [showError]);

  const handleSave = useCallback(async () => {
    setActiveMenu(null);
    await navigator.clipboard.writeText(text);
    showError('Notepad', 'Saved to clipboard!', 'info');
  }, [text, showError]);

  const handleExit = useCallback(() => {
    setActiveMenu(null);
    closeWindow(windowId);
  }, [closeWindow, windowId]);

  const handleUndo = useCallback(() => {
    setActiveMenu(null);
    textareaRef.current?.focus();
    document.execCommand('undo');
  }, []);

  const handleCut = useCallback(async () => {
    setActiveMenu(null);
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = text.slice(start, end);

    if (selected) {
      await navigator.clipboard.writeText(selected);
      const newText = text.slice(0, start) + text.slice(end);
      setText(newText);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start;
        ta.focus();
      });
    }
  }, [text]);

  const handleCopy = useCallback(async () => {
    setActiveMenu(null);
    const ta = textareaRef.current;
    if (!ta) return;

    const selected = text.slice(ta.selectionStart, ta.selectionEnd);
    if (selected) await navigator.clipboard.writeText(selected);
    ta.focus();
  }, [text]);

  const handlePaste = useCallback(async () => {
    setActiveMenu(null);
    const pastedText = await navigator.clipboard.readText();
    insertAtCursor(pastedText);
  }, [insertAtCursor]);

  const handleSelectAll = useCallback(() => {
    setActiveMenu(null);
    requestAnimationFrame(() => {
      textareaRef.current?.select();
    });
  }, []);

  const handleTimeDate = useCallback(() => {
    setActiveMenu(null);
    const now = new Date();
    const formatted = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;
    insertAtCursor(formatted);
  }, [insertAtCursor]);

  const handleWordWrap = useCallback(() => {
    setActiveMenu(null);
    setWordWrap((prev) => !prev);
  }, []);

  const handleAbout = useCallback(() => {
    setActiveMenu(null);
    showError(
      'About Notepad',
      'Notepad v98.0\n\nA faithful recreation for\nOleksandr\u2019s Win98 Portfolio\n\n\u00A9 2026 Not Microsoft',
      'info',
    );
  }, [showError]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'F5') {
      e.preventDefault();
      handleTimeDate();
    }
  };

  return (
    <div className={styles.container}>
      <div ref={menuBarRef} className={styles.menuBar}>
        {/* File */}
        <div className={styles.menuItem}>
          <button
            className={`${styles.menuButton} ${activeMenu === 'file' ? styles.menuButtonActive : ''}`}
            onMouseDown={() => toggleMenu('file')}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={handleNew}>
                New
              </button>
              <button className={styles.dropdownItem} onClick={handleOpen}>
                Open...
              </button>
              <button className={styles.dropdownItem} onClick={handleSave}>
                Save
              </button>
              <div className={styles.dropdownSeparator} />
              <button className={styles.dropdownItem} onClick={handleExit}>
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Edit */}
        <div className={styles.menuItem}>
          <button
            className={`${styles.menuButton} ${activeMenu === 'edit' ? styles.menuButtonActive : ''}`}
            onMouseDown={() => toggleMenu('edit')}
          >
            Edit
          </button>
          {activeMenu === 'edit' && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={handleUndo}>
                Undo
              </button>
              <div className={styles.dropdownSeparator} />
              <button className={styles.dropdownItem} onClick={handleCut}>
                Cut
              </button>
              <button className={styles.dropdownItem} onClick={handleCopy}>
                Copy
              </button>
              <button className={styles.dropdownItem} onClick={handlePaste}>
                Paste
              </button>
              <div className={styles.dropdownSeparator} />
              <button className={styles.dropdownItem} onClick={handleSelectAll}>
                Select All
              </button>
              <div className={styles.dropdownSeparator} />
              <button className={styles.dropdownItem} onClick={handleTimeDate}>
                <span>Time/Date</span>
                <span className={styles.hotkey}>F5</span>
              </button>
            </div>
          )}
        </div>

        {/* Format */}
        <div className={styles.menuItem}>
          <button
            className={`${styles.menuButton} ${activeMenu === 'format' ? styles.menuButtonActive : ''}`}
            onMouseDown={() => toggleMenu('format')}
          >
            Format
          </button>
          {activeMenu === 'format' && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={handleWordWrap}>
                <span className={styles.checkmark}>{wordWrap ? '✓' : '\u00A0'}</span>
                Word Wrap
              </button>
            </div>
          )}
        </div>

        {/* Help */}
        <div className={styles.menuItem}>
          <button
            className={`${styles.menuButton} ${activeMenu === 'help' ? styles.menuButtonActive : ''}`}
            onMouseDown={() => toggleMenu('help')}
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem} onClick={handleAbout}>
                About Notepad
              </button>
            </div>
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowX: wordWrap ? 'hidden' : 'auto',
          overflowWrap: wordWrap ? 'break-word' : 'normal',
        }}
        spellCheck={false}
      />

      {localDialog && (
        <ErrorDialog
          id="notepad-local-dialog"
          title={localDialog.title}
          message={localDialog.message}
          icon={localDialog.icon}
          buttons={localDialog.buttons}
          onClose={localDialog.onClose}
        />
      )}
    </div>
  );
};

export default NotepadApp;
