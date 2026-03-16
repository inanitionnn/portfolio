import { ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import original from 'react95/dist/themes/original';
import { Desktop } from './components/Desktop/Desktop';
import { Taskbar } from './components/Taskbar/Taskbar';
import { ShutdownScreen } from './components/Taskbar/ShutdownScreen';
import './App.css';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;

function App() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <Desktop />
      <Taskbar />
      <ShutdownScreen />
    </ThemeProvider>
  );
}

export default App;
