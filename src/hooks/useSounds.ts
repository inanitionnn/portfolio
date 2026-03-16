// Sound sources:
// - https://pixabay.com/sound-effects/ — search "windows 98", "retro startup", "ding"
// - https://freesound.org/ — CC licensed, search "error ding", "click", "notify"
// - Create in Audacity: simple sine/square wave tones exported as MP3

import { useSoundEffect } from './useSoundEffect';

export const useSounds = () => ({
  playStartup: useSoundEffect('/sounds/startup.mp3'),
  playShutdown: useSoundEffect('/sounds/shutdown.mp3'),
  playError: useSoundEffect('/sounds/error.mp3'),
  playClick: useSoundEffect('/sounds/click.mp3'),
  playNotify: useSoundEffect('/sounds/notify.mp3'),
  playEmptyBin: useSoundEffect('/sounds/empty-recycle-bin.mp3'),
  playWindowOpen: useSoundEffect('/sounds/window-open.mp3'),
  playWindowClose: useSoundEffect('/sounds/window-close.mp3'),
});
