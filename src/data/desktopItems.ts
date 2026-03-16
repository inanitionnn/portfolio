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
];
