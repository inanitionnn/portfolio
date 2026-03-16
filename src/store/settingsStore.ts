import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SettingsStore {
  soundEnabled: boolean;
  volume: number;
  toggleSound: () => void;
  setVolume: (v: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    soundEnabled: true,
    volume: 0.5,

    toggleSound: () =>
      set((state) => {
        state.soundEnabled = !state.soundEnabled;
      }),

    setVolume: (v) =>
      set((state) => {
        state.volume = v;
      }),
  })),
);
