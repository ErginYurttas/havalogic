import { ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { darkTheme } from './theme';
import Home from './pages/Home';
import Project from './pages/Project';
import AhuPage from './pages/AhuPage'; // ✅ Bunu ekle

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/ahu" element={<AhuPage />} /> {/* ✅ Yeni route */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
