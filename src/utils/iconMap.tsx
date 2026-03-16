import { type SVGProps } from 'react';
import { Ie, FolderExe, RecycleFull, Mail, Notepad, Write1 } from '@react95/icons';
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
