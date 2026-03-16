import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SettingsStore {
  soundEnabled: boolean;
  volume: number;
  clippyVisible: boolean;
  toggleSound: () => void;
  setVolume: (v: number) => void;
  hideClippy: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    soundEnabled: true,
    volume: 0.5,
    clippyVisible: true,

    toggleSound: () =>
      set((state) => {
        state.soundEnabled = !state.soundEnabled;
      }),

    setVolume: (v) =>
      set((state) => {
        state.volume = v;
      }),

    hideClippy: () =>
      set((state) => {
        state.clippyVisible = false;
      }),
  })),
);
