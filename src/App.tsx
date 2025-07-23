import { ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { darkTheme } from './theme';
import Home from './pages/Home';
import Project from './pages/Project';
import AhuPage from './pages/AhuPage';
import AirCurtainPage from './pages/AirCurtainPage';
import BoilerPage from './pages/BoilerPage';
import BoosterPage from './pages/BoosterPage';
import ChillerPage from './pages/ChillerPage';
import CleanRoomPage from './pages/CleanRoomPage';
import CollectorPage from './pages/CollectorPage';
import CoolingTowerPage from './pages/CoolingTowerPage';
import DatacenterPage from './pages/DatacenterPage';
import EnergyPage from './pages/EnergyPage';
import FanPage from './pages/FanPage';
import FcuPage from './pages/FcuPage';
import GeneratorPage from './pages/GeneratorPage';
import HeatExchangerPage from './pages/HeatExchangerPage';
import HeatReclaimPage from './pages/HeatReclaimPage';
import OfficePage from './pages/OfficePage';
import PumpPage from './pages/PumpPage';
import RoomPage from './pages/RoomPage';
import SurgeryRoomPage from './pages/SurgeryRoomPage';
import UnitHeaterPage from './pages/UnitHeaterPage';
import UpsPage from './pages/UpsPage';
import VavPage from './pages/VavPage';
import WaterTankPage from './pages/WaterTankPage';
import WeatherPage from './pages/WeatherPage';



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/ahu" element={<AhuPage />} /> 
        <Route path="/aircurtain" element={<AirCurtainPage />} /> 
        <Route path="/boiler" element={<BoilerPage />} />
        <Route path="/booster" element={<BoosterPage />} />
        <Route path="/chiller" element={<ChillerPage />} />
        <Route path="/cleanroom" element={<CleanRoomPage />} />
        <Route path="/collector" element={<CollectorPage />} />
        <Route path="/coolingtower" element={<CoolingTowerPage />} />
        <Route path="/datacenter" element={<DatacenterPage />} />
        <Route path="/energy" element={<EnergyPage />} />
        <Route path="/fan" element={<FanPage />} />
        <Route path="/fcu" element={<FcuPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/heatexchanger" element={<HeatExchangerPage />} />
        <Route path="/heatreclaim" element={<HeatReclaimPage />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="/pump" element={<PumpPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/surgeryroom" element={<SurgeryRoomPage />} />
        <Route path="/unitheater" element={<UnitHeaterPage />} />
        <Route path="/ups" element={<UpsPage />} />
        <Route path="/vav" element={<VavPage />} /> 
        <Route path="/watertank" element={<WaterTankPage />} />
        <Route path="/weather" element={<WeatherPage />} /> 
        
 
      </Routes>
    </ThemeProvider>
  );
}

export default App;
