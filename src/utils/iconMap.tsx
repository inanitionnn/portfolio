import { type SVGProps } from 'react';
import { Ie, FolderExe, RecycleEmpty, RecycleFull, Mail, Notepad, Notepad2, Write1, Progman1, Winmine1 } from '@react95/icons';
import { type AppId } from '../types';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const appIconMap: Partial<Record<AppId, IconComponent>> = {
  browser: Ie,
  explorer: FolderExe,
  recycleBin: RecycleFull,
  contact: Mail,
  about: Notepad,
  notepad: Notepad2,
  projectViewer: Write1,
  errorTrigger: Progman1,
};

export const namedIconMap: Record<string, IconComponent> = {
  executable: Progman1,
  minesweeper: Winmine1,
};

export const recycleBinIconMap = {
  empty: RecycleEmpty,
  full: RecycleFull,
} satisfies Record<string, IconComponent>;
