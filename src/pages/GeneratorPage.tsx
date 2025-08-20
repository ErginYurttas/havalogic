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

export default function GeneratorPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');


  const [controlType, setControlType] = useState<string>('');
  const [controlProtocolIntegration, setControlProtocolIntegration] = useState<string>('');
  const [controlPanelIntegrationPoints, setControlPanelIntegrationPoints] = useState<string>('');
  const [controlPanelHardPoints, setControlPanelHardPoints] = useState<string>('');

  const [pieces, setPieces] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('');

  const [maintenanceSafety, setMaintenanceSafety] = useState<string>('');
  const [emergencySafety, setEmergencySafety] = useState<string>('');

  const [tankLevelMeasurement, setTankLevelMeasurement] = useState<string>('');
  const [roomTemperatureMeasurement, setRoomTemperatureMeasurement] = useState<string>('');

  const isLocal = controlType === 'Local';
  const isOwnPanel = controlType === 'own Panel';
  const isNone = controlType === 'none';

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
  if (isLocal) {
    setControlProtocolIntegration('');
    setControlPanelIntegrationPoints('');
    setControlPanelHardPoints('');
  }
}, [isLocal]);


useEffect(() => {
  if (isOwnPanel) {
    setPieces('');
    setPower('');
    setVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setTankLevelMeasurement('');
  }
}, [isOwnPanel]);

  useEffect(() => {
  if (isNone) {
    setControlProtocolIntegration('');
    setControlPanelIntegrationPoints('');
    setControlPanelHardPoints('');
  }
}, [isNone]);


  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

  



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
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
);



  const handleSaveGenerator = () => {
  const rows: any[] = [];
  const pcs = parseInt(pieces) || 1;
  const multi = pcs > 1;

  // --- Control Type ---
  if (controlType === 'Local') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      rows.push(
        {
          projectCode, description, location,
          point: `Generator Status${sfx}`,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
        },
        {
          projectCode, description, location,
          point: `Generator Fault${sfx}`,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
        }
      );
    }
  } else if (controlType === 'own Panel') {
    const val = Number(controlPanelIntegrationPoints) || 0;
    const integrationRow: any = {
      projectCode, description, location,
      point: 'Generator Control Panel Integration',
      ai: 0, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    };

    switch (controlProtocolIntegration) {
      case 'Modbus RTU':   integrationRow.modbusRtu  = val; break;
      case 'Modbus TCP IP':integrationRow.modbusTcp  = val; break;
      case 'Bacnet MSTP':  integrationRow.bacnetMstp = val; break;
      case 'Bacnet IP':    integrationRow.bacnetIp   = val; break;
      default: break; 
    }

    rows.push(integrationRow);
  }



  const hardPointsRows: any[] = [];
  if (controlPanelHardPoints === 'Statuses') {
    hardPointsRows.push(
      {
        projectCode, description, location,
        point: 'Generator Control Panel General Status',
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      },
      {
        projectCode, description, location,
        point: 'Generator Control Panel General Fault',
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      }
    );
  } else if (controlPanelHardPoints === 'Command') {
    hardPointsRows.push({
      projectCode, description, location,
      point: 'Generator Control Panel General Command',
      ai: 0, ao: 0, di: 0, do: 1,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    });
  } else if (controlPanelHardPoints === 'Statuses and Command') {
    hardPointsRows.push(
      {
        projectCode, description, location,
        point: 'Generator Control Panel General Status',
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      },
      {
        projectCode, description, location,
        point: 'Generator Control Panel General Fault',
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      },
      {
        projectCode, description, location,
        point: 'Generator Control Panel General Command',
        ai: 0, ao: 0, di: 0, do: 1,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      }
    );
  }



  const maintenanceRows: any[] = [];
  if (maintenanceSafety === 'for Each Generator' || maintenanceSafety === 'Each Generator') {
    for (let i = 1; i <= pcs; i++) {
      maintenanceRows.push({
        projectCode, description, location,
        point: `Generator Maintenance Status${multi ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      });
    }
  } else if (maintenanceSafety === 'for All Generators' || maintenanceSafety === 'for All Generator') {
    maintenanceRows.push({
      projectCode, description, location,
      point: 'Generator General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    });
  }


  const emergencyRows: any[] = [];
  if (emergencySafety === 'for Each Generator' || emergencySafety === 'for Each Generator') {
    for (let i = 1; i <= pcs; i++) {
      emergencyRows.push({
        projectCode, description, location,
        point: `Generator Emergency Status${multi ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
      });
    }
  } else if (emergencySafety === 'for All Generators' || emergencySafety === 'for All Generators') {
    emergencyRows.push({
      projectCode, description, location,
      point: 'Generator General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    });
  }


const tankLevelRows: any[] = [];

if (tankLevelMeasurement === 'Analog') {
  tankLevelRows.push({
    projectCode, description, location,
    point: 'Generator Fuel Tank Level Status',
    ai: 1, ao: 0, di: 0, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
  });
} else if (tankLevelMeasurement === 'Digital Min. Level') {
  tankLevelRows.push({
    projectCode, description, location,
    point: 'Generator Fuel Tank Min. Level Status',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
  });
} else if (tankLevelMeasurement === 'Digital Max. Level') {
  tankLevelRows.push({
    projectCode, description, location,
    point: 'Generator Fuel Tank Max. Level Status',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
  });
} else if (tankLevelMeasurement === 'Digital Min. and Max. Level') {
  tankLevelRows.push(
    {
      projectCode, description, location,
      point: 'Generator Fuel Tank Min. Level Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    },
    {
      projectCode, description, location,
      point: 'Generator Fuel Tank Max. Level Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
    }
  );
}

  const roomTempRows: any[] = [];

if (roomTemperatureMeasurement === 'Temperature') {
  roomTempRows.push({
    projectCode, description, location,
    point: 'Generator Ambiente Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
  });
}

  setTableRows([
    ...rows,
    ...hardPointsRows,
    ...maintenanceRows,
    ...emergencyRows,
    ...tankLevelRows,
    ...roomTempRows
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Generator System Input</Typography>
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
              {renderDropdown('Control Protocol Integration', controlProtocolIntegration, (e) => setControlProtocolIntegration(e.target.value), ['Modbus RTU','Modbus TCP IP','Bacnet MSTP','Bacnet IP'],  isLocal || isNone)}
<TextField
  label="Control Panel Integration Points"
  value={controlPanelIntegrationPoints}
  onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={isLocal || isNone}
  InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: (isLocal || isNone) ? '#555' : '#B0BEC5',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (isLocal || isNone) ? '#555' : '#CFD8DC',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (isLocal || isNone) ? '#555' : '#90A4AE',
    },
  }}
  InputProps={{
    sx: {
      backgroundColor: (isLocal || isNone) ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
    },
  }}
/>


              {renderDropdown('Control Panel Hard Points',  controlPanelHardPoints,  (e) => setControlPanelHardPoints(e.target.value),  ['none', 'Statuses', 'Command', 'Statuses and Command'],  isLocal || isNone)}
              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value), ['1','2','3','4','5','6','7','8'], isOwnPanel)}
              {renderDropdown('Power', power, (e) => setPower(e.target.value), ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'], isOwnPanel)}
              {renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value), ['230','380'], isOwnPanel)}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none','for Each Generator','for All Generators'], isOwnPanel)}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none','Each Generator','for All Generator'], isOwnPanel)}
              
              {renderDropdown('Tank Level Measurement', tankLevelMeasurement, (e) => setTankLevelMeasurement(e.target.value), ['none','Analog','Digital Min. Level','Digital Max. Level','Digital Min. and Max. Level'], isOwnPanel)}
              {renderDropdown('Room Temperature Measurement',  roomTemperatureMeasurement,  (e) => setRoomTemperatureMeasurement(e.target.value as string),  ['none', 'Temperature'])}


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveGenerator}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Generator Output Table'}
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
