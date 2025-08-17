import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const ModernButton = styled(Button)({
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textTransform: 'none',
  letterSpacing: '0.02em',
  transition: 'all 0.2s ease',
  border: '1px solid',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  }
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '#1565c0',
    borderColor: 'transparent'
  }
});

const selectStyles = {
  color: '#ECEFF1',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#1e1e1e' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  svg: { color: '#90A4AE' }
};

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' }
};

export default function CoolingTowerPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [coolingTowerControl, setCoolingTowerControl] = useState('');

  const [ctIntegration, setCtIntegration] = useState('');
  const [ctProtocolIntegration, setCtProtocolIntegration] = useState('');
  const [ctIntegrationPoints, setCtIntegrationPoints] = useState('');

  const [coolingTowerPieces, setCoolingTowerPieces] = useState('');
  const [coolingTowerPower, setCoolingTowerPower] = useState('');
  const [coolingTowerVoltage, setCoolingTowerVoltage] = useState('');

  const [coolingTowerMaintenance, setCoolingTowerMaintenance] = useState('');
  const [coolingTowerEmergency, setCoolingTowerEmergency] = useState('');
  const [coolingTowerSeismic, setCoolingTowerSeismic] = useState('');

  const [coolingTowerTemperatureMeasurement, setCoolingTowerTemperatureMeasurement] = useState('');

  const [coolingTowerPoolHeating, setCoolingTowerPoolHeating] = useState('');
  const [coolingTowerPoolFilling, setCoolingTowerPoolFilling] = useState('');

const renderDropdown = (
  label: string,
  value: string,
  onChange: (e: SelectChangeEvent) => void,
  options: string[],
  disabled: boolean = false
) => (
  <FormControl fullWidth sx={{ mt: 2 }} disabled={disabled}>
    <InputLabel sx={labelStyles}>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
);


  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

  const handleSaveCoolingTower = () => {
    // Şimdilik boş. Daha sonra tabloya veri eklenecek.
    setTableRows([]);
    setShowTable(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1A237E, #000000)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Box sx={{ py: 2, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
        <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          <Box component="span" sx={{ color: '#1976d2' }}>hava</Box>
          <Box component="span" sx={{ color: '#B0BEC5' }}>logic</Box>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500, color: '#1976d2' }}>{loggedInUser || 'User'}</Typography>
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={handleLogout} sx={{ minWidth: '100px' }}>Logout</PrimaryButton>
        </Stack>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Form */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', p: 4, width: '400px', maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Cooling Tower System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />

              {renderDropdown('Control',  coolingTowerControl,  (e) => setCoolingTowerControl(e.target.value),  ['own Panel', 'VFD'])}
              
              {renderDropdown('Integration',  ctIntegration,  (e) => {    const v = e.target.value;    setCtIntegration(v);    if (v === 'none') {      setCtProtocolIntegration('');      setCtIntegrationPoints('');    }  },  ['none', 'own Panel'])}

              {renderDropdown('Protocol Integration',  ctProtocolIntegration,  (e) => setCtProtocolIntegration(e.target.value),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  ctIntegration === 'none' )}

<TextField
  fullWidth
  variant="outlined"
  placeholder="Cooling Tower Integration Points"
  value={ctIntegrationPoints}
  onChange={(e) => setCtIntegrationPoints(e.target.value)}
  disabled={ctIntegration === 'none'}
  InputProps={{
    style: {
      color: (ctIntegration === 'none') ? '#888' : 'white',
      backgroundColor: (ctIntegration === 'none') ? '#1e1e1e' : 'transparent'
    }
  }}
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: (ctIntegration === 'none') ? '#555' : '#B0BEC5'
    }
  }}
/>
              
              
              {renderDropdown('Pieces',  coolingTowerPieces,  (e) => setCoolingTowerPieces(e.target.value),  ['1','2','3','4','5','6','7','8'])}
              {renderDropdown('Power',  coolingTowerPower,  (e) => setCoolingTowerPower(e.target.value),  [  '0.55','0.75','1.1','1.5','2.2','3','4','5.5','7.5','11','15',    '18.5','22','30','37','45','55','75','90','110','132','160'  ])}
              {renderDropdown('Voltage',  coolingTowerVoltage,  (e) => setCoolingTowerVoltage(e.target.value),  ['230','380'])}

              {renderDropdown('Maintenance Safety Contacts',  coolingTowerMaintenance,  (e) => setCoolingTowerMaintenance(e.target.value),  ['none', 'Each Tower', 'All Tower'])}
              {renderDropdown('Emergency Safety Contacts',  coolingTowerEmergency,  (e) => setCoolingTowerEmergency(e.target.value),  ['none', 'Each Tower', 'All Tower'])}
              {renderDropdown('Seismic Safety Contacts',  coolingTowerSeismic,  (e) => setCoolingTowerSeismic(e.target.value),  ['none', 'Each Tower', 'All Tower'])}

              {renderDropdown('Temperature Measurement',  coolingTowerTemperatureMeasurement,  (e) => setCoolingTowerTemperatureMeasurement(e.target.value),  ['none', 'Inlet Temperature', 'Outlet Temperature'])}

              {renderDropdown('Pool Heating',  coolingTowerPoolHeating,  (e) => setCoolingTowerPoolHeating(e.target.value),  [    'none',    'On/Off Command',    'On/Off Command with Feedback',    'Floating Command',    'Floating Command with Feedback',    'Proportional Command',    'Proportional Command with Feedback'  ])}
              {renderDropdown('Pool Filling',  coolingTowerPoolFilling,  (e) => setCoolingTowerPoolFilling(e.target.value),  ['none', 'Fill'])}


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveCoolingTower}>Send to Table</PrimaryButton>
              <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>Back to Project Overview</PrimaryButton>
            </Stack>
          </Box>
        </Container>

        {/* Table */}
        <Box sx={{
          flex: 1,
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          mr: 1,
          ml: 0,
          mt: 6,
          maxHeight: '85vh',
          overflowY: 'auto',
          color: 'white'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {projectCode ? `${projectCode} Output Table` : 'Cooling Tower Output Table'}
          </Typography>

          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%' }} />

          {showTable && tableRows.length > 0 && (
            <table style={{
              minWidth: '1200px',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
              fontSize: '0.875rem',
              fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif'`,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e0e0e0',
              color: '#333'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                  {['Project Code', 'Description', 'Located', 'Point Name', 'AI', 'AO', 'DI', 'DO', 'Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP', 'Mbus'].map((header, i) => (
                    <th key={i} style={{ border: '1px solid #e0e0e0', padding: '10px', fontWeight: 500, fontSize: '0.85rem', textAlign: 'left' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8', transition: 'background 0.3s', cursor: 'default' }}>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.description}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.location}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.point}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.di}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.do}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>{row.mbus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>
      </Box>
    </Box>
  );
}
