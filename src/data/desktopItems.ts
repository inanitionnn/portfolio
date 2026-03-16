import { type DesktopIconData } from '../types';
import { ICON_GRID_SIZE } from '../utils/constants';

export const INITIAL_DESKTOP_ICONS: DesktopIconData[] = [
  {
    id: 'icon-browser',
    label: 'Internet Explorer',
    icon: 'browser',
    appId: 'browser',
    position: { x: 10, y: 10 },
  },
  {
    id: 'icon-explorer',
    label: 'My Projects',
    icon: 'explorer',
    appId: 'explorer',
    position: { x: 10, y: 10 + ICON_GRID_SIZE },
  },
  {
    id: 'icon-recycleBin',
    label: 'Recycle Bin',
    icon: 'recycleBin',
    appId: 'recycleBin',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 2 },
  },
  {
    id: 'icon-contact',
    label: 'Contact Me',
    icon: 'contact',
    appId: 'contact',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 3 },
  },
  {
    id: 'icon-about',
    label: 'about_me.txt — Notepad',
    icon: 'about',
    appId: 'about',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 4 },
  },
  {
    id: 'icon-notepad',
    label: 'Untitled \u2014 Notepad',
    icon: 'notepad',
    appId: 'notepad',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 5 },
  },
  // Row 7 intentionally empty (visual gap)
  {
    id: 'minesweeper',
    label: 'Minesweeper',
    icon: 'minesweeper',
    appId: 'errorTrigger',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 7 },
    meta: { errorKey: 'game' },
  },
  {
    id: 'social-life',
    label: 'social_life.exe',
    icon: 'executable',
    appId: 'errorTrigger',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 8 },
    meta: { errorKey: 'socialLife' },
  },
  {
    id: 'sleep-schedule',
    label: 'sleep_schedule.exe',
    icon: 'executable',
    appId: 'errorTrigger',
    position: { x: 10, y: 10 + ICON_GRID_SIZE * 9 },
    meta: { errorKey: 'sleep' },
  },
];
