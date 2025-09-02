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
  MenuItem,
  Snackbar,
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
} as const;

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' }
} as const;

export default function HeatExchangerPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [temperatureMeasurement, setTemperatureMeasurement] = useState('');
  const [valveFunction, setValveFunction] = useState('');
  const [filter, setFilter] = useState('');

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  const renderDropdown = (
    label: string,
    value: string,
    onChange: (e: SelectChangeEvent) => void,
    options: string[],
    disabled: boolean = false
  ) => (
    <FormControl fullWidth disabled={disabled} variant="outlined">
      <InputLabel sx={labelStyles}>{label}</InputLabel>
      <Select value={value || ''} label={label} onChange={onChange} sx={selectStyles}>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSaveHeatExchanger = () => {
    // ayrı dizilerle kuruyoruz, en sonda sıralarını koruyarak birleştirip order veriyoruz
    const temperatureRows: any[] = [];
    const valveRows: any[] = [];
    const filterRows: any[] = [];

    // ---- TEMPERATURE MEASUREMENT ----
    if (temperatureMeasurement && temperatureMeasurement !== 'none') {
      if (
        temperatureMeasurement === 'Primer Inlet Temperature' ||
        temperatureMeasurement === 'Primer Side Temperature' ||
        temperatureMeasurement === 'Primer and Seconder Side Temperature' ||
        temperatureMeasurement === 'Inlet Side Temperature'
      ) {
        temperatureRows.push({
          projectCode, description, location,
          point: 'Heat Exchanger Primer Inlet Temperature',
          ai: 1, ao: 0, di: 0, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }

      if (
        temperatureMeasurement === 'Primer Outlet Temperature' ||
        temperatureMeasurement === 'Primer Side Temperature' ||
        temperatureMeasurement === 'Primer and Seconder Side Temperature' ||
        temperatureMeasurement === 'Outlet Side Temperature'
      ) {
        temperatureRows.push({
          projectCode, description, location,
          point: 'Heat Exchanger Primer Outlet Temperature',
          ai: 1, ao: 0, di: 0, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }

      if (
        temperatureMeasurement === 'Seconder Inlet Temperature' ||
        temperatureMeasurement === 'Seconder Side Temperature' ||
        temperatureMeasurement === 'Primer and Seconder Side Temperature' ||
        temperatureMeasurement === 'Inlet Side Temperature'
      ) {
        temperatureRows.push({
          projectCode, description, location,
          point: 'Heat Exchanger Seconder Inlet Temperature',
          ai: 1, ao: 0, di: 0, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }

      if (
        temperatureMeasurement === 'Seconder Outlet Temperature' ||
        temperatureMeasurement === 'Seconder Side Temperature' ||
        temperatureMeasurement === 'Primer and Seconder Side Temperature' ||
        temperatureMeasurement === 'Outlet Side Temperature'
      ) {
        temperatureRows.push({
          projectCode, description, location,
          point: 'Heat Exchanger Seconder Outlet Temperature',
          ai: 1, ao: 0, di: 0, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // ---- VALVE FUNCTION ----
    if (valveFunction && valveFunction !== 'none') {
      switch (valveFunction) {
        case 'On/Off Valve Actuator':
          valveRows.push({
            projectCode, description, location,
            point: 'Heat Exchanger On/Off Valve Actuator Command',
            ai: 0, ao: 0, di: 0, do: 1,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
          break;

        case 'On/Off Valve Actuator with Feedback':
          valveRows.push(
            {
              projectCode, description, location,
              point: 'Heat Exchanger On/Off Valve Actuator Command',
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger On/Off Valve Actuator Status',
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
          break;

        case 'Floating Valve Actuator':
          valveRows.push(
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Open Command',
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Close Command',
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
          break;

        case 'Floating Valve Actuator with Feedback':
          valveRows.push(
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Open Command',
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Close Command',
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Open Status',
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger Floating Valve Actuator Close Status',
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
          break;

        case 'Proportional Valve Actuator':
          valveRows.push({
            projectCode, description, location,
            point: 'Heat Exchanger Proportional Valve Actuator Control',
            ai: 0, ao: 1, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
          break;

        case 'Proportional Valve Actuator with Feedback':
          valveRows.push(
            {
              projectCode, description, location,
              point: 'Heat Exchanger Proportional Valve Actuator Control',
              ai: 0, ao: 1, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: 'Heat Exchanger Proportional Valve Actuator Feedback',
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
          break;
      }
    }

    // ---- FILTER ----
    if (filter === 'Differential Pressure') {
      filterRows.push({
        projectCode, description, location,
        point: 'Heat Exchanger Differential Pressure',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    // birleşik dizi + order
    const allRows = [...temperatureRows, ...valveRows, ...filterRows].map((r, i) => ({ ...r, order: i }));
    setTableRows(allRows);
    setShowTable(true);
  };

  // ---- ADD POOL (Weather/UPS/Water Tank ile aynı şema) ----
  const handleAddPool = () => {
    const code = projectCode.trim();

    if (!code) {
      setSnackbarMsg('Please enter Project Code');
      setSnackbarOpen(true);
      return;
    }
    if (tableRows.length === 0) {
      setSnackbarMsg('No rows to add. Please generate the table first.');
      setSnackbarOpen(true);
      return;
    }

    const key = `pool:${code}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const payload = {
      id: Date.now(),
      system: 'heat-exchanger',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg('Data added to Pool');
    setSnackbarOpen(true);

    // Kayıttan sonra tabloyu temizle
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Heat Exchanger System Input</Typography>
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

              {renderDropdown(
                'Temperature Measurement',
                temperatureMeasurement,
                (e) => setTemperatureMeasurement(e.target.value as string),
                [
                  'none',
                  'Primer Inlet Temperature',
                  'Primer Outlet Temperature',
                  'Seconder Inlet Temperature',
                  'Seconder Outlet Temperature',
                  'Primer Side Temperature',
                  'Seconder Side Temperature',
                  'Inlet Side Temperature',
                  'Outlet Side Temperature',
                  'Primer and Seconder Side Temperature'
                ]
              )}

              {renderDropdown(
                'Valve Function',
                valveFunction,
                (e) => setValveFunction(e.target.value as string),
                [
                  'none',
                  'On/Off Valve Actuator',
                  'On/Off Valve Actuator with Feedback',
                  'Floating Valve Actuator',
                  'Floating Valve Actuator with Feedback',
                  'Proportional Valve Actuator',
                  'Proportional Valve Actuator with Feedback'
                ]
              )}

              {renderDropdown(
                'Filter',
                filter,
                (e) => setFilter(e.target.value as string),
                ['none', 'Differential Pressure']
              )}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveHeatExchanger}>Send to Table</PrimaryButton>

              <PrimaryButton
                sx={{ width: '100%' }}
                onClick={handleAddPool}
                disabled={!projectCode || tableRows.length === 0}
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
            {projectCode ? `${projectCode} Output Table` : 'Heat Exchanger Output Table'}
          </Typography>

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
