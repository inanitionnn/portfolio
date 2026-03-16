export type AppId =
  | 'browser'
  | 'explorer'
  | 'recycleBin'
  | 'contact'
  | 'about'
  | 'projectViewer';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  meta?: Record<string, unknown>;
}

export interface DesktopIconData {
  id: string;
  label: string;
  icon: string;
  appId: AppId;
  position: { x: number; y: number };
  meta?: Record<string, unknown>;
}

export interface Project {
  id: string;
  name: string;
  year: number;
  url: string;
  icon: string;
  description: string;
  stack: string[];
  bullets: string[];
}
