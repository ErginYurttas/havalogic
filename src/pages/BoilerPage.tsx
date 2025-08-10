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

export default function BoilerPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [boilerControlType, setBoilerControlType] = useState('');
  const [boilerPieces, setBoilerPieces] = useState('');
  const [boilerPower, setBoilerPower] = useState('');
  const [boilerVoltage, setBoilerVoltage] = useState('');

  const [boilerMaintenanceContacts, setBoilerMaintenanceContacts] = useState('');
  const [boilerEmergencyContacts, setBoilerEmergencyContacts] = useState('');
  const [boilerHighTemperatureContacts, setBoilerHighTemperatureContacts] = useState('');
  const [boilerGasLeakageContacts, setBoilerGasLeakageContacts] = useState('');

  const [boilerTemperature, setBoilerTemperature] = useState('');
  const [boilerBalanceTank, setBoilerBalanceTank] = useState('');
  const [boilerBalanceTankTemperature, setBoilerBalanceTankTemperature] = useState('');

  const [boilerIntegration, setBoilerIntegration] = useState('');
  const [boilerProtocolIntegration, setBoilerProtocolIntegration] = useState('');
  const [boilerIntegrationPoints, setBoilerIntegrationPoints] = useState('');

  const [protocolDisabled, setProtocolDisabled] = useState(false);
  const [pointsDisabled, setPointsDisabled] = useState(false);

  useEffect(() => {
  if (boilerBalanceTank === 'none') {
    setBoilerBalanceTankTemperature('');
  }
}, [boilerBalanceTank]);

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
  <FormControl fullWidth sx={{ mt: 2 }} disabled={disabled}>
    <InputLabel sx={labelStyles}>{label}</InputLabel>
    <Select
      value={value}
      label={label}
      onChange={onChange}
      sx={selectStyles}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);


const handleBoilerIntegrationChange = (e: SelectChangeEvent) => {
  const value = e.target.value;
  setBoilerIntegration(value);

  if (value === 'none') {
    setBoilerProtocolIntegration('');
    setBoilerIntegrationPoints('');
    setProtocolDisabled(true);
    setPointsDisabled(true);
  } else {
    setProtocolDisabled(false);
    setPointsDisabled(false);
  }
};



const handleSaveBoiler = () => {
  const rows: any[] = [];

  const code = projectCode;
  const desc = description;
  const loc = location;

  // Pieces sayısı
  const count = parseInt(boilerPieces) || 1;
  const isMultiple = count > 1;

  // Hangi control type seçiliyse ona göre baz satır isimleri
  let pointNames: string[] = [];
  if (boilerControlType === 'Local') {
    pointNames = ['Boiler Status', 'Boiler Fault', 'Boiler Command'];
  } else if (boilerControlType === 'Cascad') {
    pointNames = ['Cascad Panel Status', 'Cascad Panel Fault', 'Cascad Panel Command'];
  }

  // Parçala ve satırları oluştur
  if (pointNames.length > 0) {
    for (let i = 1; i <= count; i++) {
      const suffix = isMultiple ? ` ${i}` : '';
      pointNames.forEach((name) => {
        // DI/DO kuralları
        const isStatus = name.toLowerCase().includes('status');
        const isFault  = name.toLowerCase().includes('fault');
        const isCmd    = name.toLowerCase().includes('command');

        rows.push({
          projectCode: code,
          description: desc,
          location: loc,
          point: `${name}${suffix}`,
          ai: 0,
          ao: 0,
          di: (isStatus || isFault) ? 1 : 0,
          do: isCmd ? 1 : 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0
        });
      });
    }
  }


  const maintenanceRows: any[] = [];
  const pcs = parseInt(boilerPieces) || 1;
  const multi = pcs > 1;

  if (boilerMaintenanceContacts === 'Each Boiler') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      maintenanceRows.push({
        projectCode,
        description,
        location,
        point: `Boiler Maintenance Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (boilerMaintenanceContacts === 'All Boilers') {
    maintenanceRows.push({
      projectCode,
      description,
      location,
      point: 'Boiler General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // --- Emergency Contacts ---
  const emergencyRows: any[] = [];
  if (boilerEmergencyContacts === 'Each Boiler') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      emergencyRows.push({
        projectCode,
        description,
        location,
        point: `Boiler Emergency Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (boilerEmergencyContacts === 'All Boilers') {
    emergencyRows.push({
      projectCode,
      description,
      location,
      point: 'Boiler General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  const highTempRows: any[] = [];
if (boilerHighTemperatureContacts === 'Each Boiler') {
  for (let i = 1; i <= pcs; i++) {
    const sfx = multi ? ` ${i}` : '';
    highTempRows.push({
      projectCode,
      description,
      location,
      point: `Boiler High Temperature Status${sfx}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (boilerHighTemperatureContacts === 'All Boilers') {
  highTempRows.push({
    projectCode,
    description,
    location,
    point: 'Boiler General High Temperature Status',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}


const gasLeakRows: any[] = [];
if (boilerGasLeakageContacts === 'Each Boiler') {
  for (let i = 1; i <= pcs; i++) {
    const sfx = multi ? ` ${i}` : '';
    gasLeakRows.push({
      projectCode,
      description,
      location,
      point: `Boiler Gas Leakage Status${sfx}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (boilerGasLeakageContacts === 'All Boilers') {
  gasLeakRows.push({
    projectCode,
    description,
    location,
    point: 'Boiler General Gas Leakage Status',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

const temperatureRows: any[] = [];

if (boilerTemperature === 'Inlet Temperature') {
  temperatureRows.push({
    projectCode,
    description,
    location,
    point: 'Boiler Inlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (boilerTemperature === 'Outlet Temperature') {
  temperatureRows.push({
    projectCode,
    description,
    location,
    point: 'Boiler Outlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (boilerTemperature === 'Inlet and Outlet Temperature') {
  temperatureRows.push(
    {
      projectCode,
      description,
      location,
      point: 'Boiler Inlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      projectCode,
      description,
      location,
      point: 'Boiler Outlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

const balanceRows: any[] = []; 

if (boilerBalanceTankTemperature && boilerBalanceTankTemperature !== 'none') {
  if (boilerBalanceTankTemperature === 'Primer Side Temperature') {
    balanceRows.push(
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Primer Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Primer Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  }
  else if (boilerBalanceTankTemperature === 'Seconder Side Temperature') {
    balanceRows.push(
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Seconder Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Seconder Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  }
  else if (boilerBalanceTankTemperature === 'Primer and Seconder Side Temperature') {
    balanceRows.push(
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Primer Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Primer Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Seconder Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode,
        description,
        location,
        point: 'Balance Tank Seconder Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  }
}

const integrationRows: any[] = [];

if (boilerIntegration === 'own Panel') {
  const integrationRow = {
    projectCode,
    description,
    location,
    point: 'Boiler Panel Integration Points',
    ai: 0, ao: 0, di: 0, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  };

  const pointsValue = Number(boilerIntegrationPoints) || 0;

  switch (boilerProtocolIntegration) {
    case 'Modbus RTU':
      integrationRow.modbusRtu = pointsValue;
      break;
    case 'Modbus TCP IP':
      integrationRow.modbusTcp = pointsValue;
      break;
    case 'Bacnet MSTP':
      integrationRow.bacnetMstp = pointsValue;
      break;
    case 'Bacnet IP':
      integrationRow.bacnetIp = pointsValue;
      break;
    default:
      break;
  }

  integrationRows.push(integrationRow);
}


  setTableRows([
    ...rows,
    ...maintenanceRows,
    ...emergencyRows,
    ...highTempRows,
    ...gasLeakRows,  
    ...temperatureRows,
    ...balanceRows,
    ...integrationRows

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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Boiler System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Boiler Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Boiler Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Boiler Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />

{renderDropdown('Boiler Control Type', boilerControlType, (e) => setBoilerControlType(e.target.value), ['Local', 'Cascad'])}
{renderDropdown('Boiler Pieces', boilerPieces, (e) => setBoilerPieces(e.target.value), ['1','2','3','4','5','6','7','8'])}
{renderDropdown('Boiler Power', boilerPower, (e) => setBoilerPower(e.target.value),  ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5','11', '15', '18,5', '22', '30', '37', '45', '55','75', '90', '110', '132', '160'])}
{renderDropdown('Boiler Voltage',  boilerVoltage,  (e) => setBoilerVoltage(e.target.value), ['230', '380'])}

{renderDropdown('Boiler Maintenance Contacts',  boilerMaintenanceContacts,  (e) => setBoilerMaintenanceContacts(e.target.value),  ['none', 'Each Boiler', 'All Boilers'])}
{renderDropdown('Boiler Emergency Contacts',  boilerEmergencyContacts,  (e) => setBoilerEmergencyContacts(e.target.value),  ['none', 'Each Boiler', 'All Boilers'])}
{renderDropdown('Boiler High Temperature Contacts',  boilerHighTemperatureContacts,  (e) => setBoilerHighTemperatureContacts(e.target.value),  ['none', 'Each Boiler', 'All Boilers'])}
{renderDropdown('Boiler Gas Leakage Contacts',  boilerGasLeakageContacts,  (e) => setBoilerGasLeakageContacts(e.target.value),  ['none', 'Each Boiler', 'All Boilers'])}

{renderDropdown('Boiler Temperature',  boilerTemperature,  (e) => setBoilerTemperature(e.target.value),  ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'])}
{renderDropdown('Boiler Balance Tank',  boilerBalanceTank,  (e) => setBoilerBalanceTank(e.target.value),  ['none', 'Balance Tank'])}
{renderDropdown('Boiler Balance Tank Temperature',  boilerBalanceTankTemperature,  (e) => setBoilerBalanceTankTemperature(e.target.value),  ['Primer Side Temperature', 'Seconder Side Temperature', 'Primer and Seconder Side Temperature'],  boilerBalanceTank === 'none')}

{renderDropdown('Boiler Integration',  boilerIntegration,  handleBoilerIntegrationChange,  ['none', 'own Panel'])}
{renderDropdown('Boiler Protocol Integration',  boilerProtocolIntegration,  (e) => setBoilerProtocolIntegration(e.target.value),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  protocolDisabled)}

<TextField
  label="Boiler Integration Points"
  value={boilerIntegrationPoints}
  onChange={(e) => setBoilerIntegrationPoints(e.target.value)}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: boilerIntegration === 'none' ? '#555' : '#B0BEC5'
    }
  }}
  disabled={boilerIntegration === 'none'}
  InputProps={{
    style: {
      color: boilerIntegration === 'none' ? '#888' : 'white',
      backgroundColor: boilerIntegration === 'none' ? '#1e1e1e' : 'transparent'
    }
  }}
/>



              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveBoiler}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Boiler Output Table'}
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
