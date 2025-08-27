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
  Snackbar
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

export default function BoosterPage() {
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
  const [highPressureSafety, setHighPressureSafety] = useState('');

  const [vfdIntegration, setVfdIntegration] = useState('');
  const [vfdProtocolIntegration, setVfdProtocolIntegration] = useState('');
  const [vfdIntegrationPoints, setVfdIntegrationPoints] = useState('');

  const isOwnPanel = controlType === 'own Panel';
  const isMccWithVfd = controlType === 'MCC with VFD';
  const isVfdNone = vfdIntegration === 'none' || vfdIntegration === '';

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Pool snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  useEffect(() => {
    if (controlType === 'own Panel') {
      setPieces('');
      setPower('');
      setVoltage('');
      setMaintenanceSafety('');
      setEmergencySafety('');
      setHighPressureSafety('');
      setVfdIntegration('');
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
    if (controlType === 'MCC with VFD') {
      setControlProtocolIntegration('');
      setControlPanelIntegrationPoints('');
      setControlPanelHardPoints('');
    }
  }, [controlType]);

  useEffect(() => {
    if (isVfdNone) {
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
  }, [isVfdNone]);

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
          <MenuItem key={i} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSaveBooster = () => {
    const rows: any[] = [];
    const pcs = parseInt(pieces) || 1;

    // --- Control Type ---
    switch (controlType) {
      case 'MCC with VFD': {
        const multi = pcs > 1;
        for (let i = 1; i <= pcs; i++) {
          const sfx = multi ? ` ${i}` : '';
          rows.push(
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Status${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Fault${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Auto/Manual${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Proportional Control${sfx}`,
              ai: 0, ao: 1, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Booster Frequency Inverter Feedback${sfx}`,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
        }
        break;
      }
      case 'own Panel': {
        const val = Number(controlPanelIntegrationPoints) || 0;
        const row: any = {
          projectCode, description, location,
          point: 'Booster own Panel Integration',
          ai: 0, ao: 0, di: 0, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        };
        switch (controlProtocolIntegration) {
          case 'Modbus RTU':   row.modbusRtu  = val; break;
          case 'Modbus TCP IP':row.modbusTcp  = val; break;
          case 'Bacnet MSTP':  row.bacnetMstp = val; break;
          case 'Bacnet IP':    row.bacnetIp   = val; break;
          default: break;
        }
        rows.push(row);
        break;
      }
      default:
        break;
    }

    // --- Control Panel Hard Points ---
    const hardPointRows: any[] = [];
    if (controlPanelHardPoints === 'Statuses' || controlPanelHardPoints === 'Statuses and Command') {
      hardPointRows.push(
        {
          point: 'Booster General Status',
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        },
        {
          point: 'Booster General Fault',
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        }
      );
    }
    if (controlPanelHardPoints === 'Command' || controlPanelHardPoints === 'Statuses and Command') {
      hardPointRows.push({
        point: 'Booster General Command',
        ai: 0, ao: 0, di: 0, do: 1,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    // --- Maintenance Safety Contacts ---
    const maintenanceRows: any[] = [];
    if (maintenanceSafety === 'for Each Booster') {
      for (let i = 1; i <= pcs; i++) {
        maintenanceRows.push({
          point: `Booster Maintenance Status${pcs > 1 ? ` ${i}` : ''}`,
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    } else if (maintenanceSafety === 'for All Boosters' || maintenanceSafety === 'for All Bosters') {
      maintenanceRows.push({
        point: 'Booster General Maintenance Status',
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    // --- Emergency Safety Contacts ---
    const emergencyRows: any[] = [];
    if (emergencySafety === 'for Each Booster') {
      for (let i = 1; i <= pcs; i++) {
        emergencyRows.push({
          point: `Booster Emergency Status${pcs > 1 ? ` ${i}` : ''}`,
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    } else if (emergencySafety === 'for All Boosters' || emergencySafety === 'for All Bosters') {
      emergencyRows.push({
        point: 'Booster General Emergency Status',
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    // --- High Pressure Safety Contacts ---
    const highPressureRows: any[] = [];
    if (highPressureSafety === 'for Each Booster') {
      for (let i = 1; i <= pcs; i++) {
        highPressureRows.push({
          point: `Booster High Pressure Status${pcs > 1 ? ` ${i}` : ''}`,
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    } else if (highPressureSafety === 'for All Boosters' || highPressureSafety === 'for All Bosters') {
      highPressureRows.push({
        point: 'Booster General High Pressure Status',
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }

    // --- VFD Integration (only when MCC with VFD) ---
    const vfdIntegrationRows: any[] = [];
    if (
      vfdIntegration === 'VFD' &&
      isMccWithVfd &&
      ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(vfdProtocolIntegration) &&
      vfdIntegrationPoints.trim() !== '' &&
      !isNaN(Number(vfdIntegrationPoints))
    ) {
      const pts = Number(vfdIntegrationPoints);
      const row: any = {
        projectCode, description, location,
        point: 'Booster General VFD Integration Points',
        ai: 0, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      };
      switch (vfdProtocolIntegration) {
        case 'Modbus RTU':   row.modbusRtu  = pts; break;
        case 'Modbus TCP IP':row.modbusTcp  = pts; break;
        case 'Bacnet MSTP':  row.bacnetMstp = pts; break;
        case 'Bacnet IP':    row.bacnetIp   = pts; break;
      }
      vfdIntegrationRows.push(row);
    }

    // birleşik + order
    const ALL_ROWS = [
      ...rows,
      ...hardPointRows,
      ...maintenanceRows,
      ...emergencyRows,
      ...highPressureRows,
      ...vfdIntegrationRows
    ].map((r, i) => ({ ...r, order: i }));

    setTableRows(ALL_ROWS);
    setShowTable(true);
  };

  // ---- ADD POOL ----
  const handleAddPool = () => {
    const code = (projectCode || '').trim();

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
      system: 'booster',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg('Data added to Pool');
    setSnackbarOpen(true);

    // isteğe bağlı: tabloyu temizle
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
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={() => navigate('/')} sx={{ minWidth: '100px' }}>Logout</PrimaryButton>
        </Stack>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Form */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', p: 4, width: '400px', maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Booster System Input</Typography>
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

              {renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value), ['MCC with VFD', 'own Panel'])}

              {renderDropdown(
                'Control Protocol Integration',
                controlProtocolIntegration,
                (e) => setControlProtocolIntegration(e.target.value),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                isMccWithVfd
              )}

              <TextField
                label="Control Panel Integration Points"
                value={controlPanelIntegrationPoints}
                onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isMccWithVfd}
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: isMccWithVfd ? '#555' : '#B0BEC5' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: isMccWithVfd ? '#555' : '#CFD8DC' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isMccWithVfd ? '#555' : '#90A4AE' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: isMccWithVfd ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown(
                'Control Panel Hard Points',
                controlPanelHardPoints,
                (e) => setControlPanelHardPoints(e.target.value),
                ['none', 'Statuses', 'Command', 'Statuses and Command'],
                isMccWithVfd
              )}

              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value), ['1','2','3','4','5','6','7','8'], isOwnPanel)}
              {renderDropdown('Power',  power,  (e) => setPower(e.target.value),  ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'], isOwnPanel)}
              {renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value), ['230','380'], isOwnPanel)}

              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Booster', 'for All Boosters'], isOwnPanel)}
              {renderDropdown('Emergency Safety Contacts',   emergencySafety,   (e) => setEmergencySafety(e.target.value),   ['none', 'for Each Booster', 'for All Boosters'], isOwnPanel)}
              {renderDropdown('High Pressure Safety Contacts', highPressureSafety, (e) => setHighPressureSafety(e.target.value), ['none', 'for Each Booster', 'for All Boosters'], isOwnPanel)}

              {renderDropdown('VFD Integration', vfdIntegration, (e) => setVfdIntegration(e.target.value), ['none', 'VFD'], isOwnPanel)}
              {renderDropdown('VFD Protocol Integration', vfdProtocolIntegration, (e) => setVfdProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], isOwnPanel || isVfdNone)}

              <TextField
                label="VFD Integration Points"
                value={vfdIntegrationPoints}
                onChange={(e) => setVfdIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isOwnPanel || isVfdNone}
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: (isOwnPanel || isVfdNone) ? '#555' : '#B0BEC5' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: (isOwnPanel || isVfdNone) ? '#555' : '#CFD8DC' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: (isOwnPanel || isVfdNone) ? '#555' : '#90A4AE' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: (isOwnPanel || isVfdNone) ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveBooster}>Send to Table</PrimaryButton>

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
            {projectCode ? `${projectCode} Output Table` : 'Booster Output Table'}
          </Typography>

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
