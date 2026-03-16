import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type DesktopIconData } from '../types';
import { INITIAL_DESKTOP_ICONS } from '../data/desktopItems';

interface DesktopStore {
  icons: DesktopIconData[];
  recycleBinItems: DesktopIconData[];
  moveIcon: (id: string, position: { x: number; y: number }) => void;
  moveToRecycleBin: (iconId: string) => void;
  restoreFromRecycleBin: (iconId: string) => void;
  deleteFromRecycleBin: (iconId: string) => void;
  emptyRecycleBin: () => void;
}

export const useDesktopStore = create<DesktopStore>()(
  immer((set) => ({
    icons: INITIAL_DESKTOP_ICONS,
    recycleBinItems: [
      {
        id: 'joke-social',
        label: 'my_social_life.txt',
        icon: 'about',
        appId: 'about',
        position: { x: 0, y: 0 },
        meta: {
          isJoke: true,
          errorMsg: 'File not found: my_social_life.txt\n\nThe system cannot locate this file.\nIt may never have existed.',
        },
      },
      {
        id: 'joke-sleep',
        label: 'sleep_schedule.exe',
        icon: 'browser',
        appId: 'browser',
        position: { x: 0, y: 0 },
        meta: {
          isJoke: true,
          errorMsg: 'Runtime Error: sleep.dll is missing from your system.\n\nPlease reinstall sleep and try again.\nError code: 0xDEADB3D',
        },
      },
    ],

    moveIcon: (id, position) =>
      set((state) => {
        const icon = state.icons.find((i) => i.id === id);
        if (icon) icon.position = position;
      }),

    moveToRecycleBin: (iconId) =>
      set((state) => {
        const index = state.icons.findIndex((i) => i.id === iconId);
        if (index === -1) return;
        const [icon] = state.icons.splice(index, 1);
        state.recycleBinItems.push(icon);
      }),

    restoreFromRecycleBin: (iconId) =>
      set((state) => {
        const index = state.recycleBinItems.findIndex((i) => i.id === iconId);
        if (index === -1) return;
        const [icon] = state.recycleBinItems.splice(index, 1);
        state.icons.push(icon);
      }),

    deleteFromRecycleBin: (iconId) =>
      set((state) => {
        state.recycleBinItems = state.recycleBinItems.filter((i) => i.id !== iconId);
      }),

    emptyRecycleBin: () =>
      set((state) => {
        state.recycleBinItems = [];
      }),
  })),
);
