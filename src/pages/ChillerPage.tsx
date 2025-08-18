import React, { useState, useEffect } from 'react';
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

export default function ChillerPage() {
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
  const [flowSafety, setFlowSafety] = useState('');

  const [temperatureMeasurements, setTemperatureMeasurements] = useState('');

  const [chillerIntegration, setChillerIntegration] = useState('');
  const [chillerProtocolIntegration, setChillerProtocolIntegration] = useState('');
  const [chillerIntegrationPoints, setChillerIntegrationPoints] = useState('');

  const isLocal = controlType === 'Local';
  const isPlant = controlType === 'Plant';
  const isChillerIntegrationNone = chillerIntegration === 'none';
  const chillerIntegrDisabled = isPlant || isChillerIntegrationNone;

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

useEffect(() => {
  if (isLocal) {
    setControlProtocolIntegration('');
    setControlPanelIntegrationPoints('');
    setControlPanelHardPoints('');
  }
}, [isLocal]);

useEffect(() => {
  if (isPlant) {
    setPieces('');
    setPower('');
    setVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setFlowSafety('');
    setTemperatureMeasurements('');
    setChillerIntegration('');
    setChillerProtocolIntegration('');
    setChillerIntegrationPoints('');
  }
}, [isPlant]);

useEffect(() => {
  if (isChillerIntegrationNone) {
    setChillerProtocolIntegration('');
    setChillerIntegrationPoints('');
  }
}, [isChillerIntegrationNone]);

  const renderDropdown = (
  label: string,
  value: string,
  onChange: (e: SelectChangeEvent) => void,
  options: string[],
  disabled: boolean = false
) => (
  <FormControl fullWidth disabled={disabled}>
    <InputLabel sx={labelStyles}>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

  const handleSaveChiller = () => {
  const rows: any[] = [];
  const pcs = parseInt(pieces) || 1;
  const multi = pcs > 1;

  // --- CONTROL TYPE ---
  if (controlType === 'Local') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      rows.push(
        {
          projectCode, description, location,
          point: `Chiller Status${sfx}`,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        },
        {
          projectCode, description, location,
          point: `Chiller Fault${sfx}`,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        },
        {
          projectCode, description, location,
          point: `Chiller Command${sfx}`,
          ai: 0, ao: 0, di: 0, do: 1,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        }
      );
    }
  } else if (controlType === 'Plant') {
    const val = Number(controlPanelIntegrationPoints) || 0;

    if (
      ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(controlProtocolIntegration) &&
      !isNaN(val) && String(controlPanelIntegrationPoints).trim() !== ''
    ) {
      const panelRow: any = {
        projectCode, description, location,
        point: 'Chiller Panel Integration',
        ai: 0, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      };
      switch (controlProtocolIntegration) {
        case 'Modbus RTU':   panelRow.modbusRtu  = val; break;
        case 'Modbus TCP IP':panelRow.modbusTcp  = val; break;
        case 'Bacnet MSTP':  panelRow.bacnetMstp = val; break;
        case 'Bacnet IP':    panelRow.bacnetIp   = val; break;
      }
      rows.push(panelRow);
    }
  }

  // --- HARD POINTS (Plant için uygulanır) ---
  const hardPointsRows: any[] = [];
  if (controlType === 'Plant') {
    if (controlPanelHardPoints === 'Statuses' || controlPanelHardPoints === 'Statuses and Command') {
      hardPointsRows.push(
        {
          projectCode, description, location,
          point: 'Chiller General Status',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        },
        {
          projectCode, description, location,
          point: 'Chiller General Fault',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        }
      );
    }
    if (controlPanelHardPoints === 'Command' || controlPanelHardPoints === 'Statuses and Command') {
      hardPointsRows.push({
        projectCode, description, location,
        point: 'Chiller General Command',
        ai: 0, ao: 0, di: 0, do: 1,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

  // --- MAINTENANCE ---
  const maintenanceRows: any[] = [];
  if (maintenanceSafety === 'for Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      maintenanceRows.push({
        projectCode, description, location,
        point: `Chiller Maintenance Status${multi ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (maintenanceSafety === 'for All Chillers') {
    maintenanceRows.push({
      projectCode, description, location,
      point: 'Chiller General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // --- EMERGENCY ---
  const emergencyRows: any[] = [];
  if (emergencySafety === 'for Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      emergencyRows.push({
        projectCode, description, location,
        point: `Chiller Emergency Status${multi ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (emergencySafety === 'for All Chillers') {
    emergencyRows.push({
      projectCode, description, location,
      point: 'Chiller General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // --- FLOW SAFETY ---
  const flowRows: any[] = [];
  if (flowSafety === 'for Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      flowRows.push({
        projectCode, description, location,
        point: `Chiller Flow Status${multi ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (flowSafety === 'for All Chillers') {
    flowRows.push({
      projectCode, description, location,
      point: 'Chiller General Flow Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  const temperatureRows: any[] = [];
if (temperatureMeasurements !== 'none') {
  for (let i = 1; i <= pcs; i++) {
    const sfx = multi ? ` ${i}` : '';

    if (
      temperatureMeasurements === 'Inlet Temperature' ||
      temperatureMeasurements === 'Inlet and Outlet Temperature'
    ) {
      temperatureRows.push({
        projectCode, description, location,
        point: `Chiller Inlet Temperature${sfx}`,
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    if (
      temperatureMeasurements === 'Outlet Temperature' ||
      temperatureMeasurements === 'Inlet and Outlet Temperature'
    ) {
      temperatureRows.push({
        projectCode, description, location,
        point: `Chiller Outlet Temperature${sfx}`,
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

  // --- CHILLER INTEGRATION (own Panel) ---
  const chillerIntegrationRows: any[] = [];
  if (
    chillerIntegration === 'own Panel' &&
    ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(chillerProtocolIntegration) &&
    chillerIntegrationPoints.trim() !== '' &&
    !isNaN(Number(chillerIntegrationPoints))
  ) {
    const pts = Number(chillerIntegrationPoints);
    const row: any = {
      projectCode, description, location,
      point: 'Chiller own Panel Integration Points',
      ai: 0, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    };
    switch (chillerProtocolIntegration) {
      case 'Modbus RTU':   row.modbusRtu  = pts; break;
      case 'Modbus TCP IP':row.modbusTcp  = pts; break;
      case 'Bacnet MSTP':  row.bacnetMstp = pts; break;
      case 'Bacnet IP':    row.bacnetIp   = pts; break;
    }
    chillerIntegrationRows.push(row);
  }

  setTableRows([
    ...rows,
    ...hardPointsRows,
    ...maintenanceRows,
    ...emergencyRows,
    ...flowRows,
    ...temperatureRows,
    ...chillerIntegrationRows
  ]);
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Chiller System Input</Typography>
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


{renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value as string), ['Local', 'Plant'])}

{renderDropdown(
  'Control Protocol Integration',
  controlProtocolIntegration,
  (e) => setControlProtocolIntegration(e.target.value),
  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
  isLocal
)}

<TextField
  label="Control Panel Integration Points"
  value={controlPanelIntegrationPoints}
  onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={isLocal}
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#B0BEC5' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#CFD8DC' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#90A4AE' }
  }}
  InputProps={{
    sx: {
      backgroundColor: isLocal ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
    }
  }}
/>

{renderDropdown('Control Panel Hard Points',  controlPanelHardPoints,  (e) => setControlPanelHardPoints(e.target.value),  ['none', 'Statuses', 'Command', 'Statuses and Command'],  isLocal)}
{renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value), ['1','2','3','4','5','6','7','8'], isPlant)}
{renderDropdown('Power',  power,  (e) => setPower(e.target.value),  ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'], isPlant)}
{renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value), ['230','380'], isPlant)}

{renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Chiller', 'for All Chillers'], isPlant)}
{renderDropdown('Emergency Safety Contacts',   emergencySafety,   (e) => setEmergencySafety(e.target.value),   ['none', 'for Each Chiller', 'for All Chillers'], isPlant)}
{renderDropdown('Flow Safety Contacts',        flowSafety,        (e) => setFlowSafety(e.target.value),        ['none', 'for Each Chiller', 'for All Chillers'], isPlant)}

{renderDropdown('Temperature Measurement',  temperatureMeasurements,  (e) => setTemperatureMeasurements(e.target.value),  ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'],  isPlant)}

{renderDropdown('Chiller Integration', chillerIntegration, (e) => setChillerIntegration(e.target.value), ['none','own Panel'], isPlant)}

{renderDropdown(
  'Chiller Protocol Integration',
  chillerProtocolIntegration,
  (e) => setChillerProtocolIntegration(e.target.value),
  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
  chillerIntegrDisabled
)}

<TextField
  label="Chiller Integration Points"
  value={chillerIntegrationPoints}
  onChange={(e) => setChillerIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={chillerIntegrDisabled}
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: chillerIntegrDisabled ? '#555' : '#B0BEC5' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: chillerIntegrDisabled ? '#555' : '#CFD8DC' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: chillerIntegrDisabled ? '#555' : '#90A4AE' }
  }}
  InputProps={{
    sx: {
      backgroundColor: chillerIntegrDisabled ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
    }
  }}
/>


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveChiller}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Chiller Output Table'}
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
