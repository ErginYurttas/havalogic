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
  MenuItem,
  Snackbar, // eklendi
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

export default function FCUPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState('');
  const [thermostatIntegration, setThermostatIntegration] = useState('');
  const [controlProtocol, setControlProtocol] = useState('');
  const [controlPanelPoints, setControlPanelPoints] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const [motorType, setMotorType] = useState('');

  const [heatingFunction, setHeatingFunction] = useState('');
  const [coolingFunction, setCoolingFunction] = useState('');

  const isDDC = controlType === 'with DDC ( Room )';
  const isThermostat = controlType === 'Thermostat';
  const isThermostatNone = thermostatIntegration === 'none';

  const [doorSafetyContacts, setDoorSafetyContacts] = useState('');
  const [windowSafetyContacts, setWindowSafetyContacts] = useState('');

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Snackbar (Collector ile aynı yapı)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

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
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // Thermostat Integration = 'none' → Protocol & Points temizle
  useEffect(() => {
    if (isThermostatNone) {
      setControlProtocol('');
      setControlPanelPoints('');
    }
  }, [isThermostatNone]);

  // Control Type = "with DDC ( Room )" ise ilgili alanları TEMİZLE
  useEffect(() => {
    if (isDDC) {
      setThermostatIntegration('');
      setControlProtocol('');
      setControlPanelPoints('');
    }
  }, [isDDC]);

  // Control Type = "Thermostat" ise ilgili alanları TEMİZLE
  useEffect(() => {
    if (isThermostat) {
      setConnectionType('');
      setMotorType('');
      setDoorSafetyContacts('');
      setWindowSafetyContacts('');
      setHeatingFunction('');
      setCoolingFunction('');
    }
  }, [isThermostat]);

  const handleSaveFCU = () => {
    const rows: any[] = [];

    const base = {
      projectCode,
      description,
      location,
      ai: 0,
      ao: 0,
      di: 0,
      do: 0,
      modbusRtu: 0,
      modbusTcp: 0,
      bacnetMstp: 0,
      bacnetIp: 0,
      mbus: 0
    };

    // 1) Control Type = with DDC ( Room ) & Motor Type = 3 step
    if (controlType === 'with DDC ( Room )' && motorType === '3 step') {
      rows.push({ ...base, point: 'FCU 1.Step Command', do: 1 });
      rows.push({ ...base, point: 'FCU 2.Step Command', do: 1 });
      rows.push({ ...base, point: 'FCU 3.Step Command', do: 1 });
    }

    // 2) Control Type = with DDC ( Room ) & Motor Type = EC
    if (controlType === 'with DDC ( Room )' && motorType === 'EC') {
      rows.push({ ...base, point: 'FCU Proportional Control', ao: 1 });
    }

    // 3) Control Type = Thermostat & Thermostat Integration = Thermostat
    if (controlType === 'Thermostat' && thermostatIntegration === 'Thermostat') {
      const pointsNum = parseInt((controlPanelPoints || '').toString().trim(), 10);
      const val = isNaN(pointsNum) ? 0 : pointsNum;

      const protocolKeyMap: Record<string, 'modbusRtu' | 'modbusTcp' | 'bacnetMstp' | 'bacnetIp'> = {
        'Modbus RTU': 'modbusRtu',
        'Modbus TCP IP': 'modbusTcp',
        'Bacnet MSTP': 'bacnetMstp',
        'Bacnet IP': 'bacnetIp',
      };

      const colKey = protocolKeyMap[controlProtocol] || undefined;
      const row: any = { ...base, point: 'FCU Integration Points' };
      if (colKey) row[colKey] = val;
      rows.push(row);
    }

    // 4) Door Safety Contacts = "with Contact" → DI=1
    if (doorSafetyContacts === 'with Contact') {
      rows.push({ ...base, point: 'FCU Room Door Safety Contact', di: 1 });
    }

    // 5) Window Safety Contacts = "with Contact" → DI=1
    if (windowSafetyContacts === 'with Contact') {
      rows.push({ ...base, point: 'FCU Room Window Safety Contact', di: 1 });
    }

    // 6) HEATING FUNCTION
    switch (heatingFunction) {
      case 'On/Off Valve Actuator': {
        rows.push({ ...base, point: 'FCU Heating Valve Command', do: 1 });
        break;
      }
      case 'On/Off Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Heating Valve Command', do: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Status', di: 1 });
        break;
      }
      case 'Floating Valve Actuator': {
        rows.push({ ...base, point: 'FCU Heating Valve Open Command', do: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Close Command', do: 1 });
        break;
      }
      case 'Floating Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Heating Valve Open Command', do: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Close Command', do: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Open Status', di: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Close Status', di: 1 });
        break;
      }
      case 'Proportional Valve Actuator': {
        rows.push({ ...base, point: 'FCU Heating Valve Proportional Control', ao: 1 });
        break;
      }
      case 'Proportional Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Heating Valve Proportional Control', ao: 1 });
        rows.push({ ...base, point: 'FCU Heating Valve Feedback', ai: 1 });
        break;
      }
      default:
        break; // 'none' → satır eklenmez
    }

    // 7) COOLING FUNCTION
    switch (coolingFunction) {
      case 'On/Off Valve Actuator': {
        rows.push({ ...base, point: 'FCU Cooling Valve Command', do: 1 });
        break;
      }
      case 'On/Off Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Cooling Valve Command', do: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Status', di: 1 });
        break;
      }
      case 'Floating Valve Actuator': {
        rows.push({ ...base, point: 'FCU Cooling Valve Open Command', do: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Close Command', do: 1 });
        break;
      }
      case 'Floating Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Cooling Valve Open Command', do: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Close Command', do: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Open Status', di: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Close Status', di: 1 });
        break;
      }
      case 'Proportional Valve Actuator': {
        rows.push({ ...base, point: 'FCU Cooling Valve Proportional Control', ao: 1 });
        break;
      }
      case 'Proportional Valve Actuator with Feedback': {
        rows.push({ ...base, point: 'FCU Cooling Valve Proportional Control', ao: 1 });
        rows.push({ ...base, point: 'FCU Cooling Valve Feedback', ai: 1 });
        break;
      }
      default:
        break; // 'none' → satır eklenmez
    }

    setTableRows(rows);
    setShowTable(true);
  };

  // CollectorPage'deki Add Pool mantığının birebir FCU uyarlaması
  const handleAddPool = () => {
    if (!tableRows || tableRows.length === 0) {
      setSnackbarMsg('No rows to add. Please generate the table first.');
      setSnackbarOpen(true);
      return;
    }

    const codes = Array.from(
      new Set(
        tableRows
          .map((r: any) => (r.projectCode ?? '').trim())
          .filter((c: string) => c.length > 0)
      )
    );

    if (codes.length === 0) {
      setSnackbarMsg('Rows have no Project Code. Please fill and try again.');
      setSnackbarOpen(true);
      return;
    }
    if (codes.length > 1) {
      setSnackbarMsg(`Multiple Project Codes in table: ${codes.join(', ')}. Please keep a single Project Code.`);
      setSnackbarOpen(true);
      return;
    }

    const code = codes[0];
    const key = `pool:${code}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const payload = {
      id: Date.now(),
      system: 'fcu', // collector yerine fcu
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location }
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
    setSnackbarOpen(true);

    // Kaydettikten sonra tabloyu temizle ve gizle
    setTableRows([]);
    setShowTable(false);
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>FCU System Input</Typography>
            <Stack spacing={2}>
              <TextField
                label="Project Code"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{ sx: { '& .MuiInputBase-input': { color: '#ECEFF1' } } }}
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{ sx: { '& .MuiInputBase-input': { color: '#ECEFF1' } } }}
              />

              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{ sx: { '& .MuiInputBase-input': { color: '#ECEFF1' } } }}
              />

              {renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value), ['with DDC ( Room )', 'Thermostat'])}

              {renderDropdown(
                'Thermostat Integration',
                thermostatIntegration,
                (e) => setThermostatIntegration(e.target.value),
                ['none', 'Thermostat'],
                isDDC
              )}

              {renderDropdown(
                'Control Protocol Integration',
                controlProtocol,
                (e) => setControlProtocol(e.target.value),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                isDDC || isThermostatNone
              )}

              <TextField
                label="Control Panel Integration Points"
                value={controlPanelPoints}
                onChange={(e) => setControlPanelPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isDDC || isThermostatNone}
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled': { backgroundColor: '#1e1e1e' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
                  }
                }}
              />

              {renderDropdown(
                'Connection Type',
                connectionType,
                (e) => setConnectionType(e.target.value),
                ['one to one Connection', 'Multiplexing Board'],
                isThermostat
              )}

              {renderDropdown(
                'Motor Type',
                motorType,
                (e) => setMotorType(e.target.value),
                ['3 step', 'EC'],
                isThermostat
              )}

              {renderDropdown(
                'Door Safety Contacts',
                doorSafetyContacts,
                (e) => setDoorSafetyContacts(e.target.value),
                ['none', 'with Contact'],
                isThermostat
              )}

              {renderDropdown(
                'Window Safety Contacts',
                windowSafetyContacts,
                (e) => setWindowSafetyContacts(e.target.value),
                ['none', 'with Contact'],
                isThermostat
              )}

              {renderDropdown(
                'Heating Function',
                heatingFunction,
                (e) => setHeatingFunction(e.target.value),
                [
                  'none',
                  'On/Off Valve Actuator',
                  'On/Off Valve Actuator with Feedback',
                  'Floating Valve Actuator',
                  'Floating Valve Actuator with Feedback',
                  'Proportional Valve Actuator',
                  'Proportional Valve Actuator with Feedback'
                ],
                isThermostat
              )}

              {renderDropdown(
                'Cooling Function',
                coolingFunction,
                (e) => setCoolingFunction(e.target.value),
                [
                  'none',
                  'On/Off Valve Actuator',
                  'On/Off Valve Actuator with Feedback',
                  'Floating Valve Actuator',
                  'Floating Valve Actuator with Feedback',
                  'Proportional Valve Actuator',
                  'Proportional Valve Actuator with Feedback'
                ],
                isThermostat
              )}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveFCU}>Send to Table</PrimaryButton>

              {/* Collector ile aynı yerde Add Pool */}
              <PrimaryButton
                sx={{ width: '100%' }}
                onClick={handleAddPool}
                disabled={tableRows.length === 0}
              >
                Add Pool
              </PrimaryButton>

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
            {projectCode ? `${projectCode} Output Table` : 'FCU Output Table'}
          </Typography>

          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%' }} />

          {showTable && tableRows.length > 0 && (
            <table style={{
              minWidth: '1200px',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
              fontSize: '0.875rem',
              fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontWeight: 500,
            padding: '10px 24px',
            minWidth: 'auto',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }
        }}
      />
    </Box>
  );
}
