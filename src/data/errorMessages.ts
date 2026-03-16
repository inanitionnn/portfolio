import { type IconType } from '../types/errorDialog';

interface FunnyErrorEntry {
  icon: IconType;
  title: string;
  message: string;
  buttons: string[];
}

export const funnyErrors: Record<string, FunnyErrorEntry> = {
  talent: {
    icon: 'error',
    title: 'talent.exe',
    message:
      'Error: Too much talent detected.\nSystem cannot handle this level of backend expertise.\n\nPlease reduce your skill level and try again.',
    buttons: ['OK', 'Hire Anyway'],
  },
  socialLife: {
    icon: 'warning',
    title: 'social_life.exe',
    message:
      'Warning: social_life.exe has stopped responding.\n\nThis program was last seen working in 2019.\n\nWould you like to wait or end the process?',
    buttons: ['Wait', 'End Process', "It was never running"],
  },
  sleep: {
    icon: 'error',
    title: 'sleep_schedule.exe',
    message:
      'Fatal Error: sleep_schedule.exe has encountered a critical exception.\n\nError code: 0x00COFFEE\n\nStack trace:\n  at developer.sleep(never)\n  at deadline.approaching(always)\n  at coffee.inject(mainVein)',
    buttons: ['OK', 'More Coffee'],
  },
  game: {
    icon: 'error',
    title: 'Minesweeper',
    message:
      'This program has performed an illegal operation and will be shut down.\n\nIf the problem persists, contact your system administrator.\n\n(Just kidding, I am the system administrator and I have no idea what happened.)',
    buttons: ['Close', 'Details'],
  },
  internet: {
    icon: 'warning',
    title: 'Internet Explorer',
    message:
      "Cannot find server.\n\nThe page cannot be displayed.\n\nJust kidding — you're already looking at the only page that matters.",
    buttons: ['OK'],
  },
  stackoverflow: {
    icon: 'error',
    title: 'brain.exe',
    message:
      'Stack Overflow Exception in module brain.exe\n\nToo many recursive thoughts about\nwhether to use tabs or spaces.\n\nMemory dump: ☕☕☕☕☕☕☕☕',
    buttons: ['Tabs', 'Spaces', "It doesn't matter"],
  },
  nodeModules: {
    icon: 'warning',
    title: 'Disk Space Warning',
    message:
      'Low Disk Space\n\nYou are running out of disk space on drive C:.\n\nWould you like to delete node_modules?\n\n(Estimated freed space: 47.3 GB)',
    buttons: ['Delete', 'Keep', 'npm install again'],
  },
};
