import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type ShutdownMode } from '../types/shutdown';

interface UiStore {
  shutdownMode: ShutdownMode;
  setShutdownMode: (mode: ShutdownMode) => void;
}

export const useUiStore = create<UiStore>()(
  immer((set) => ({
    shutdownMode: 'off',

    setShutdownMode: (mode) =>
      set((state) => {
        state.shutdownMode = mode;
      }),
  })),
);
