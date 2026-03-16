import useSound from 'use-sound';
import { useSettingsStore } from '../store/settingsStore';

export const useSoundEffect = (src: string) => {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const volume = useSettingsStore((s) => s.volume);
  const [play] = useSound(src, { volume, soundEnabled });
  return play;
};
