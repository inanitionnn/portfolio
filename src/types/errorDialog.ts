export type IconType = 'error' | 'warning' | 'info';

export interface ErrorDialogData {
  id: string;
  icon: IconType;
  title: string;
  message: string;
  buttons: string[];
}
