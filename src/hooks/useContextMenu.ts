import { useState, useEffect, useCallback } from 'react';
import type { ContextMenuItem } from '../types/contextMenu';

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
}

const INITIAL_STATE: ContextMenuState = {
  visible: false,
  x: 0,
  y: 0,
  items: [],
};

export const useContextMenu = () => {
  const [state, setState] = useState<ContextMenuState>(INITIAL_STATE);

  const showMenu = useCallback((e: React.MouseEvent, items: ContextMenuItem[]) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ visible: true, x: e.clientX, y: e.clientY, items });
  }, []);

  const hideMenu = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    document.addEventListener('click', hideMenu);
    return () => document.removeEventListener('click', hideMenu);
  }, [hideMenu]);

  return { ...state, showMenu, hideMenu };
};
