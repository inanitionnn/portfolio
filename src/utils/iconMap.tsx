import { type SVGProps } from 'react';
import { Ie, FolderExe, RecycleEmpty, RecycleFull, Mail, Notepad, Write1 } from '@react95/icons';
import { type AppId } from '../types';

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

export const appIconMap: Record<AppId, IconComponent> = {
  browser: Ie,
  explorer: FolderExe,
  recycleBin: RecycleFull,
  contact: Mail,
  about: Notepad,
  projectViewer: Write1,
};

export const recycleBinIconMap = {
  empty: RecycleEmpty,
  full: RecycleFull,
} satisfies Record<string, IconComponent>;
