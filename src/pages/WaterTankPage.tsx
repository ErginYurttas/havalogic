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

export default function WaterTankPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState('');
  const [fillingValveFunction, setFillingValveFunction] = useState('');

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

  const handleSaveWaterTank = () => {
  setTableRows([]);
  const rows: any[] = [];

  const addRow = (
    point: string,
    io: { ai?: number; ao?: number; di?: number; do?: number } = {}
  ) => {
    rows.push({
      point,
      projectCode,
      description,
      location,
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

  switch (controlType) {
    case 'Flator with Min. Level':
      addRow('Water Tank Flator Min. Level', { di: 1 });
      break;

    case 'Flator with Mid. Level':
      addRow('Water Tank Flator Mid. Level', { di: 1 });
      break;

    case 'Flator with Max. Level':
      addRow('Water Tank Flator Max. Level', { di: 1 });
      break;

    case 'Flator with Min. and Mid. Level':
      addRow('Water Tank Flator Min. Level', { di: 1 });
      addRow('Water Tank Flator Mid. Level', { di: 1 });
      break;

    case 'Flator with Mid. and Max. Level':
      addRow('Water Tank Flator Mid. Level', { di: 1 });
      addRow('Water Tank Flator Max. Level', { di: 1 });
      break;

    case 'Flator with Min. and Max Level':
      addRow('Water Tank Flator Min. Level', { di: 1 });
      addRow('Water Tank Flator Max. Level', { di: 1 });
      break;

    case 'Flator with Min., Mid and Max Level':
      addRow('Water Tank Flator Min. Level', { di: 1 });
      addRow('Water Tank Flator Mid. Level', { di: 1 });
      addRow('Water Tank Flator Max. Level', { di: 1 });
      break;

    case 'Ultrasonic':
      addRow('Water Tank Ultrasonic Level', { ai: 1 });
      break;

    case 'own Panel':
      addRow('Water Tank Panel Level', { ai: 1 });
      break;

    default:
      break; 
  }


  switch (fillingValveFunction) {
  case 'none':
  case '':
    // satır eklenmez
    break;

  case 'On/Off Valve Actuator':
    addRow('Water Tank On/Off Valve Command', { do: 1 });
    break;

  case 'On/Off Valve Actuator with Feedback':
    addRow('Water Tank On/Off Valve Command', { do: 1 });
    addRow('Water Tank On/Off Valve Status', { di: 1 });
    break;

  case 'Floating Valve Actuator':
    addRow('Water Tank Floating Valve Open Command', { do: 1 });
    addRow('Water Tank Floating Valve Close Command', { do: 1 });
    break;

  case 'Floating Valve Actuator with Feedback':
    addRow('Water Tank Floating Valve Open Command', { do: 1 });
    addRow('Water Tank Floating Valve Close Command', { do: 1 });
    addRow('Water Tank Floating Valve Open Status', { di: 1 });
    addRow('Water Tank Floating Valve Close Status', { di: 1 });
    break;

  case 'Proportional Valve Actuator':
    addRow('Water Tank Proportional Valve Control', { ao: 1 });
    break;

  case 'Proportional Valve Actuator with Feedback':
    addRow('Water Tank Proportional Valve Control', { ao: 1 });
    addRow('Water Tank Proportional Valve Feedback', { ai: 1 });
    break;

  default:
    break;
}

  setTableRows(rows);
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Water Tank System Input</Typography>
            <Stack spacing={2}>
              <TextField
  label="Project Code"
  value={projectCode}
  onChange={(e) => setProjectCode(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{
    sx: {
      color: '#90A4AE',
      '&.Mui-focused': { color: '#B0BEC5' },
      '&.Mui-disabled': { color: '#888' },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled': { backgroundColor: '#1e1e1e' },
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
  InputLabelProps={{
    sx: {
      color: '#90A4AE',
      '&.Mui-focused': { color: '#B0BEC5' },
      '&.Mui-disabled': { color: '#888' },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled': { backgroundColor: '#1e1e1e' },
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
  InputLabelProps={{
    sx: {
      color: '#90A4AE',
      '&.Mui-focused': { color: '#B0BEC5' },
      '&.Mui-disabled': { color: '#888' },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  }}
  InputProps={{
    sx: {
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled': { backgroundColor: '#1e1e1e' },
      '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
    },
  }}
/>

{renderDropdown(
  'Control Type',
  controlType,
  (e) => setControlType(e.target.value as string),
  [
    'Flator with Min. Level',
    'Flator with Mid. Level',
    'Flator with Max. Level',
    'Flator with Min. and Mid. Level',
    'Flator with Mid. and Max. Level',
    'Flator with Min. and Max Level',
    'Flator with Min., Mid and Max Level',
    'Ultrasonic',
    'own Panel'
  ]
)}

{renderDropdown(
  'Filling Valve Function',
  fillingValveFunction,
  (e) => setFillingValveFunction(e.target.value as string),
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


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveWaterTank}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Water Tank Output Table'}
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
