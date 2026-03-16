import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type AppId, type WindowState } from '../types';
import { DEFAULT_WINDOW_SIZE, TASKBAR_HEIGHT, Z_INDEX_BASE } from '../utils/constants';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (appId: AppId, title: string, icon: string, meta?: Record<string, unknown>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  unmaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

const OPEN_WINDOW_OFFSET = 30;
const OPEN_WINDOW_MAX_CASCADE = 10;

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: [],
    nextZIndex: Z_INDEX_BASE,

    openWindow: (appId, title, icon, meta) =>
      set((state) => {
        const offset = (state.windows.length % OPEN_WINDOW_MAX_CASCADE) * OPEN_WINDOW_OFFSET;
        const newWindow: WindowState = {
          id: crypto.randomUUID(),
          appId,
          title,
          icon,
          position: { x: offset, y: offset },
          size: { ...DEFAULT_WINDOW_SIZE },
          zIndex: state.nextZIndex,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          meta,
        };
        state.windows.push(newWindow);
        state.nextZIndex += 1;
      }),

    closeWindow: (id) =>
      set((state) => {
        state.windows = state.windows.filter((w) => w.id !== id);
      }),

    minimizeWindow: (id) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (win) win.isMinimized = true;
      }),

    restoreWindow: (id) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (!win) return;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }),

    maximizeWindow: (id) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (!win) return;
        win.prevPosition = { ...win.position };
        win.prevSize = { ...win.size };
        win.position = { x: 0, y: 0 };
        win.size = {
          width: window.innerWidth,
          height: window.innerHeight - TASKBAR_HEIGHT,
        };
        win.isMaximized = true;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }),

    unmaximizeWindow: (id) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (!win) return;
        if (win.prevPosition) win.position = { ...win.prevPosition };
        if (win.prevSize) win.size = { ...win.prevSize };
        win.prevPosition = undefined;
        win.prevSize = undefined;
        win.isMaximized = false;
      }),

    focusWindow: (id) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (!win) return;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }),

    updatePosition: (id, position) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (win) win.position = position;
      }),

    updateSize: (id, size) =>
      set((state) => {
        const win = state.windows.find((w) => w.id === id);
        if (win) win.size = size;
      }),
  })),
);

export const getActiveWindowId = (windows: WindowState[]): string | null => {
  const active = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .reduce<WindowState | null>(
      (max, w) => (max === null || w.zIndex > max.zIndex ? w : max),
      null,
    );
  return active?.id ?? null;
};
