import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type IconType, type ErrorDialogData } from '../types/errorDialog';

interface ErrorStore {
  errors: ErrorDialogData[];
  showError: (title: string, message: string, icon?: IconType, buttons?: string[]) => void;
  dismissError: (id: string) => void;
  dismissAll: () => void;
}

export const useErrorStore = create<ErrorStore>()(
  immer((set) => ({
    errors: [],

    showError: (title, message, icon = 'error', buttons = ['OK']) =>
      set((state) => {
        state.errors.push({
          id: crypto.randomUUID(),
          icon,
          title,
          message,
          buttons,
        });
      }),

    dismissError: (id) =>
      set((state) => {
        state.errors = state.errors.filter((e) => e.id !== id);
      }),

    dismissAll: () =>
      set((state) => {
        state.errors = [];
      }),
  })),
);
