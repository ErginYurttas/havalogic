import { ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { darkTheme } from './theme';
import Home from './pages/Home';
import Project from './pages/Project';
import AhuPage from './pages/AhuPage';
import FanPage from './pages/FanPage';
import ChillerPage from './pages/ChillerPage';
import VavPage from './pages/VavPage';
import FcuPage from './pages/FcuPage';
import DatacenterPage from './pages/DatacenterPage';
import BoilerPage from './pages/BoilerPage';
import PumpPage from './pages/PumpPage';
import RoomPage from './pages/RoomPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/ahu" element={<AhuPage />} /> 
        <Route path="/fan" element={<FanPage />} />
        <Route path="/chiller" element={<ChillerPage />} />
        <Route path="/vav" element={<VavPage />} /> 
        <Route path="/fcu" element={<FcuPage />} />
        <Route path="/datacenter" element={<DatacenterPage />} />
        <Route path="/boiler" element={<BoilerPage />} />
        <Route path="/datacenter" element={<DatacenterPage />} />
        <Route path="/room" element={<RoomPage />} />
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
