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

export default function HeatReclaimPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState('');
  const [controlProtocolIntegration, setControlProtocolIntegration] = useState('');
  const [controlPanelIntegrationPoints, setControlPanelIntegrationPoints] = useState('');
  const [controlPanelHardPoints, setControlPanelHardPoints] = useState('');

  const [pieces, setPieces] = useState('');
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('');

  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [fireSafety, setFireSafety] = useState('');
  const [heatingValveFunction, setHeatingValveFunction] = useState('');
  const [coolingValveFunction, setCoolingValveFunction] = useState('');

  const [temperatureMeasurement, setTemperatureMeasurement] = useState('');

  const [freshAirFilter, setFreshAirFilter] = useState('');
  const [supplyAirFilter, setSupplyAirFilter] = useState('');
  const [returnAirFilter, setReturnAirFilter] = useState('');

  const [vfdIntegration, setVfdIntegration] = useState('');
  const [vfdProtocolIntegration, setVfdProtocolIntegration] = useState('');
  const [vfdIntegrationPoints, setVfdIntegrationPoints] = useState('');


  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

const renderDropdown = (
  label: string,
  value: string,
  onChange: (e: SelectChangeEvent<string>) => void,
  options: string[],
  disabled: boolean = false
) => (
  <FormControl fullWidth disabled={disabled}>
    <InputLabel sx={labelStyles}>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

  const handleSaveHeatReclaim = () => {
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Heat Reclaim System Input</Typography>
            <Stack spacing={2}>
              <TextField
  label="Project Code"
  value={projectCode}
  onChange={(e) => setProjectCode(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
    }
  }}
/>

<TextField
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
    }
  }}
/>

<TextField
  label="Located"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
    }
  }}
/>

{renderDropdown('Control Type',  controlType,  (e) => setControlType(e.target.value as string),  ['none', 'Local', 'own Panel'])}

{renderDropdown('Control Protocol Integration',  controlProtocolIntegration,  (e) => setControlProtocolIntegration(e.target.value as string),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'])}

<TextField
  label="Control Panel Integration Points"
  value={controlPanelIntegrationPoints}
  onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
    },
  }}
/>

{renderDropdown('Control Panel Hard Points',  controlPanelHardPoints,  (e) => setControlPanelHardPoints(e.target.value as string),  ['none', 'Statuses', 'Command', 'Statuses and Command'])}

{renderDropdown('Pieces',  pieces,  (e) => setPieces(e.target.value as string),  ['1','2','3','4','5','6','7','8'])}

{renderDropdown('Power',  power,  (e) => setPower(e.target.value as string),  ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'])}

{renderDropdown('Voltage',  voltage,  (e) => setVoltage(e.target.value as string),  ['230','380'])}

{renderDropdown('Maintenance Safety Contacts',  maintenanceSafety,  (e) => setMaintenanceSafety(e.target.value as string),  ['none', 'for Each Heat Reclaim', 'for All Heat Reclaim'])}

{renderDropdown('Emergency Safety Contacts',  emergencySafety,  (e) => setEmergencySafety(e.target.value as string),  ['none', 'for Each Heat Reclaim', 'for All Heat Reclaim'])}

{renderDropdown('Fire Safety Contacts',  fireSafety,  (e) => setFireSafety(e.target.value as string),  ['none', 'only Viewing', 'Viewing and Control'])}

{renderDropdown('Heating Valve Function',  heatingValveFunction,  (e) => setHeatingValveFunction(e.target.value as string),  [    'none',    'On/Off Valve Actuator',    'On/Off Valve Actuator with Feedback',    'Floating Valve Actuator',    'Floating Valve Actuator with Feedback',    'Proportional Valve Actuator',    'Proportional Valve Actuator with Feedback'  ])}

{renderDropdown('Cooling Valve Function',  coolingValveFunction,  (e) => setCoolingValveFunction(e.target.value as string),  [    'none',    'On/Off Valve Actuator',    'On/Off Valve Actuator with Feedback',    'Floating Valve Actuator',    'Floating Valve Actuator with Feedback',    'Proportional Valve Actuator',    'Proportional Valve Actuator with Feedback'  ])}

{renderDropdown('Temperature Measurement',  temperatureMeasurement,  (e) => setTemperatureMeasurement(e.target.value as string),  [    'none',    'Supply Air Temperature',    'Return Air Temperature',    'Fresh Air Temperature',    'Exhaust Air Temperature',    'Inside Air Temperature',    'Outside Air Temperature',    'Inlet Air Temperature',    'Outlet Air Temperature',    'Inlet and Outlet Air Temperature'  ])}


{renderDropdown('Fresh Air Filter',  freshAirFilter,  (e) => setFreshAirFilter(e.target.value as string),  [    'none',    'Analog G4',  'Digital G4',    'Analog F5',  'Digital F5',    'Analog F6',  'Digital F6',    'Analog F7',  'Digital F7',    'Analog F8',  'Digital F8',    'Analog F9',  'Digital F9',    'Analog H13', 'Digital H13',    'Analog H14', 'Digital H14'  ])}
{renderDropdown('Supply Air Filter',  supplyAirFilter,  (e) => setSupplyAirFilter(e.target.value as string),  [    'none',    'Analog G4',  'Digital G4',    'Analog F5',  'Digital F5',    'Analog F6',  'Digital F6',    'Analog F7',  'Digital F7',    'Analog F8',  'Digital F8',    'Analog F9',  'Digital F9',    'Analog H13', 'Digital H13',    'Analog H14', 'Digital H14'  ])}

{renderDropdown('Return Air Filter',  returnAirFilter,  (e) => setReturnAirFilter(e.target.value as string),  [    'none',    'Analog G4',  'Digital G4',    'Analog F5',  'Digital F5',    'Analog F6',  'Digital F6',    'Analog F7',  'Digital F7',    'Analog F8',  'Digital F8',    'Analog F9',  'Digital F9',    'Analog H13', 'Digital H13',    'Analog H14', 'Digital H14'  ])}            

{renderDropdown('VFD Integration',  vfdIntegration,  (e) => setVfdIntegration(e.target.value as string),  ['none', 'VFD'])}

{renderDropdown('VFD Protocol Integration',  vfdProtocolIntegration,  (e) => setVfdProtocolIntegration(e.target.value as string),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'])}

<TextField
  label="VFD Integration Points"
  value={vfdIntegrationPoints}
  onChange={(e) => setVfdIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
    },
  }}
/>

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveHeatReclaim}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Heat Reclaim Output Table'}
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
