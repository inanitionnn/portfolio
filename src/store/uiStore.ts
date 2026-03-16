import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type ShutdownMode } from '../types/shutdown';
import { type AppPhase } from '../types/appPhase';

interface UiStore {
  appPhase: AppPhase;
  setAppPhase: (phase: AppPhase) => void;
  shutdownMode: ShutdownMode;
  setShutdownMode: (mode: ShutdownMode) => void;
}

export const useUiStore = create<UiStore>()(
  immer((set) => ({
    appPhase: 'booting',

    setAppPhase: (phase) =>
      set((state) => {
        state.appPhase = phase;
      }),

    shutdownMode: 'off',

    setShutdownMode: (mode) =>
      set((state) => {
        state.shutdownMode = mode;
      }),
  })),
);
