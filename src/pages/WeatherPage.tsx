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
  Snackbar,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

type ControlType = '' | 'Sensor' | 'Station';

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

export default function WeatherPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState<ControlType>('');
  const [controlProtocolIntegration, setControlProtocolIntegration] = useState('');
  const [controlPanelIntegrationPoints, setControlPanelIntegrationPoints] = useState('');
  const [sensorMeasurement, setSensorMeasurement] = useState('');

  const isTypeSensor = controlType === 'Sensor';
  const isTypeStation = controlType === 'Station';

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  useEffect(() => {
    if (isTypeSensor) {
      setControlProtocolIntegration('');
      setControlPanelIntegrationPoints('');
    }
  }, [isTypeSensor]);

  useEffect(() => {
    if (isTypeStation) {
      setSensorMeasurement('');
    }
  }, [isTypeStation]);

  const renderDropdown = (
    label: string,
    value: string,
    onChange: (e: SelectChangeEvent) => void,
    options: string[],
    disabled: boolean = false
  ) => {
    const base = label.replace(/\s+/g, '-').toLowerCase();
    const labelId = `${base}-label`;
    const selectId = `${base}-select`;

    return (
      <FormControl fullWidth disabled={disabled} variant="outlined">
        <InputLabel id={labelId} sx={labelStyles}>{label}</InputLabel>
        <Select
          id={selectId}
          labelId={labelId}
          value={value || ''}
          label={label}
          onChange={onChange}
          sx={selectStyles}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const handleSaveWeather = () => {
    const rows: any[] = [];

    // yardımcı
    const addRow = (point: string, io: { ai?: number; ao?: number; di?: number; do?: number } = {}) => {
      rows.push({
        projectCode,
        description,
        location,
        point,
        ai: io.ai ?? 0,
        ao: io.ao ?? 0,
        di: io.di ?? 0,
        do: io.do ?? 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    };

    // A) Control Type: Station → Weather Station Integration (+ protokol & point sayısı)
    if (controlType === 'Station') {
      if (controlProtocolIntegration !== '' && controlPanelIntegrationPoints !== '') {
        const parsedPoints = parseInt(controlPanelIntegrationPoints, 10) || 0;
        const protocol = { modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 };
        switch (controlProtocolIntegration) {
          case 'Modbus RTU':    protocol.modbusRtu  = parsedPoints; break;
          case 'Modbus TCP IP': protocol.modbusTcp  = parsedPoints; break;
          case 'Bacnet MSTP':   protocol.bacnetMstp = parsedPoints; break;
          case 'Bacnet IP':     protocol.bacnetIp   = parsedPoints; break;
          default: break;
        }
        rows.push({
          projectCode, description, location,
          point: 'Weather Station Integration',
          ai: 0, ao: 0, di: 0, do: 0,
          modbusRtu: protocol.modbusRtu,
          modbusTcp: protocol.modbusTcp,
          bacnetMstp: protocol.bacnetMstp,
          bacnetIp: protocol.bacnetIp,
          mbus: protocol.mbus,
        });
      }
    }

    // B) Control Type: Sensor → Sensor Measurement kuralları
    if (controlType === 'Sensor') {
      switch (sensorMeasurement) {
        case 'Temperature':
          addRow('Outside Temperature', { ai: 1 });
          break;
        case 'Humidity':
          addRow('Outside Humidity', { ai: 1 });
          break;
        case 'Temperature and Humidity':
          addRow('Outside Temperature', { ai: 1 });
          addRow('Outside Humidity', { ai: 1 });
          break;
        default:
          break; // none/boş: satır yok
      }
    }

    setTableRows(rows);
    setShowTable(true);
  };

  // Pool'a kaydet ve tabloyu temizle (Collector/WaterTank ile aynı)
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
      system: 'weather',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg('Data added to Pool');
    setSnackbarOpen(true);

    // kayıt sonrası tabloyu temizle
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Weather System Input</Typography>
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

              {/* Control Type */}
              {renderDropdown(
                'Control Type',
                controlType,
                (e) => setControlType(e.target.value as ControlType),
                ['Sensor', 'Station']
              )}

              {/* Control Protocol Integration (Sensor iken disable) */}
              {renderDropdown(
                'Control Protocol Integration',
                controlProtocolIntegration,
                (e) => setControlProtocolIntegration(e.target.value as string),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                isTypeSensor
              )}

              {/* Control Panel Integration Points (Sensor iken disable) */}
              <TextField
                label="Control Panel Integration Points"
                value={controlPanelIntegrationPoints}
                onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isTypeSensor}
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: isTypeSensor ? '#555' : '#B0BEC5' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: isTypeSensor ? '#555' : '#CFD8DC' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isTypeSensor ? '#555' : '#90A4AE' },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: isTypeSensor ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {/* Sensor Measurement (Station iken disable) */}
              {renderDropdown(
                'Sensor Measurement',
                sensorMeasurement,
                (e) => setSensorMeasurement(e.target.value as string),
                ['Temperature', 'Humidity', 'Temperature and Humidity'],
                isTypeStation
              )}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveWeather}>Send to Table</PrimaryButton>

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
            {projectCode ? `${projectCode} Output Table` : 'Weather Output Table'}
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
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8' }}>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.description}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.location}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.point}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.di}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.do}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.mbus}</td>
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
