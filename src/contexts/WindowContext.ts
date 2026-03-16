import { createContext, useContext } from 'react';

export const WindowContext = createContext<string>('');

export const useWindowId = () => useContext(WindowContext);
