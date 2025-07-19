import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Home />
    </ThemeProvider>
  );
}

export default App; // <- Bu satır kritik!