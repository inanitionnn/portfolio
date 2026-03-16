import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type DesktopIconData } from '../types';

interface DesktopStore {
  icons: DesktopIconData[];
  recycleBinItems: DesktopIconData[];
  moveIcon: (id: string, position: { x: number; y: number }) => void;
  moveToRecycleBin: (iconId: string) => void;
  restoreFromRecycleBin: (iconId: string) => void;
  emptyRecycleBin: () => void;
}

export const useDesktopStore = create<DesktopStore>()(
  immer((set) => ({
    icons: [],
    recycleBinItems: [],

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

    emptyRecycleBin: () =>
      set((state) => {
        state.recycleBinItems = [];
      }),
  })),
);
