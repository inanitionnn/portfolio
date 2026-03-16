import { useCallback } from 'react';
import { ThemeProvider, StyleSheetManager, createGlobalStyle } from 'styled-components';
import { styleReset } from 'react95';
import original from 'react95/dist/themes/original';
import { useUiStore } from './store/uiStore';
import { Desktop } from './components/Desktop/Desktop';
import { Taskbar } from './components/Taskbar/Taskbar';
import { BootScreen } from './components/Boot/BootScreen';
import { ShutdownScreen } from './components/ShutdownScreen/ShutdownScreen';
import { MobileHint } from './components/MobileHint/MobileHint';
import './App.css';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

function App() {
  const appPhase = useUiStore((s) => s.appPhase);
  const setAppPhase = useUiStore((s) => s.setAppPhase);
  const setShutdownMode = useUiStore((s) => s.setShutdownMode);

  const handleBootComplete = useCallback(() => {
    setAppPhase('desktop');
  }, [setAppPhase]);

  const handleRestart = useCallback(() => {
    setShutdownMode('off');
    setAppPhase('booting');
  }, [setAppPhase, setShutdownMode]);

  return (
    <StyleSheetManager shouldForwardProp={(prop) => !['variant', 'shadow'].includes(prop)}>
      <ThemeProvider theme={original}>
        <GlobalStyles />

        {appPhase === 'booting' && (
          <BootScreen onBootComplete={handleBootComplete} />
        )}

        {appPhase === 'desktop' && (
          <>
            <Desktop />
            <Taskbar />
            <MobileHint />
          </>
        )}

        {appPhase === 'shuttingDown' && (
          <ShutdownScreen onRestart={handleRestart} />
        )}
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default App;
