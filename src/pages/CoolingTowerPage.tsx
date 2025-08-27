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

export default function CoolingTowerPage() {
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
  const [seismicContacts, setSeismicContacts] = useState('');

  const [temperatureMeasurement, setTemperatureMeasurement] = useState('');
  const [poolHeating, setPoolHeating] = useState('');
  const [lowWaterLevel, setLowWaterLevel] = useState('');

  const [vfdIntegration, setVfdIntegration] = useState('');
  const [vfdProtocolIntegration, setVfdProtocolIntegration] = useState('');
  const [vfdIntegrationPoints, setVfdIntegrationPoints] = useState('');

  const isOwnPanel = controlType === 'own Panel';
  const isMCCWithVFD = controlType === 'MCC with VFD';
  const isVfdNone = vfdIntegration === 'none' || vfdIntegration === '';

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  useEffect(() => {
    if (isOwnPanel) {
      // own Panel → motor/saha seçeneklerini temizle
      setPieces('');
      setPower('');
      setVoltage('');
      setMaintenanceSafety('');
      setEmergencySafety('');
      setFlowSafety('');
      setSeismicContacts('');
      setTemperatureMeasurement('');
      setPoolHeating('');
      setLowWaterLevel('');

      setVfdIntegration('');
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
  }, [isOwnPanel]);

  useEffect(() => {
    if (isMCCWithVFD) {
      // MCC with VFD → panel entegrasyon seçeneklerini temizle
      setControlProtocolIntegration('');
      setControlPanelIntegrationPoints('');
      setControlPanelHardPoints('');
    }
  }, [isMCCWithVFD]);

  useEffect(() => {
    if (isVfdNone || isOwnPanel) {
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
  }, [isVfdNone, isOwnPanel]);

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
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSaveCoolingTower = () => {
    const rows: any[] = [];

    // --- MCC with VFD: sürücü noktaları ---
    const frequencyInverterRows: any[] = [];
    if (isMCCWithVFD) {
      const pcs = parseInt(pieces) || 1;
      const multi = pcs > 1;
      for (let i = 1; i <= pcs; i++) {
        const sfx = multi ? ` ${i}` : '';
        frequencyInverterRows.push(
          {
            point: `Cooling Tower Frequency Inverter Status${sfx}`,
            ai: 0, ao: 0, di: 1, do: 0,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            point: `Cooling Tower Frequency Inverter Fault${sfx}`,
            ai: 0, ao: 0, di: 1, do: 0,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            point: `Cooling Tower Frequency Inverter Auto/Manual${sfx}`,
            ai: 0, ao: 0, di: 1, do: 0,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            point: `Cooling Tower Frequency Inverter Command${sfx}`,
            ai: 0, ao: 0, di: 0, do: 1,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            point: `Cooling Tower Frequency Inverter Proportional Control${sfx}`,
            ai: 0, ao: 1, di: 0, do: 0,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            point: `Cooling Tower Frequency Inverter Feedback${sfx}`,
            ai: 1, ao: 0, di: 0, do: 0,
            projectCode, description, location,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          }
        );
      }
    }

    // --- own Panel: entegrasyon puanları ---
    const integrationRows: any[] = [];
    if (isOwnPanel) {
      const val = Number(controlPanelIntegrationPoints) || 0;
      const row: any = {
        projectCode,
        description,
        location,
        point: 'Cooling Tower Control Panel Integration',
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
      integrationRows.push(row);
    }

    // --- Hard Points (own Panel için) ---
    const hardPointsRows: any[] = [];
    if (isOwnPanel) {
      if (controlPanelHardPoints === 'Statuses' || controlPanelHardPoints === 'Statuses and Command') {
        hardPointsRows.push(
          {
            projectCode, description, location,
            point: 'Cooling Tower Control Panel General Status',
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          },
          {
            projectCode, description, location,
            point: 'Cooling Tower Control Panel General Fault',
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          }
        );
      }
      if (controlPanelHardPoints === 'Command' || controlPanelHardPoints === 'Statuses and Command') {
        hardPointsRows.push({
          projectCode, description, location,
          point: 'Cooling Tower Control Panel General Command',
          ai: 0, ao: 0, di: 0, do: 1,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- Maintenance ---
    const maintenanceRows: any[] = [];
    {
      const c = Number(pieces) || 1;
      const multi = c > 1;
      if (maintenanceSafety === 'for Each Tower') {
        for (let i = 1; i <= c; i++) {
          maintenanceRows.push({
            projectCode, description, location,
            point: `Cooling Tower Maintenance Status${multi ? ` ${i}` : ''}`,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (maintenanceSafety === 'for All Towers') {
        maintenanceRows.push({
          projectCode, description, location,
          point: 'Cooling Tower General Maintenance Status',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- Emergency ---
    const emergencyRows: any[] = [];
    {
      const c = Number(pieces) || 1;
      const multi = c > 1;
      if (emergencySafety === 'for Each Tower') {
        for (let i = 1; i <= c; i++) {
          emergencyRows.push({
            projectCode, description, location,
            point: `Cooling Tower Emergency Status${multi ? ` ${i}` : ''}`,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (emergencySafety === 'for All Towers') {
        emergencyRows.push({
          projectCode, description, location,
          point: 'Cooling Tower General Emergency Status',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- Flow ---
    const flowRows: any[] = [];
    {
      const c = Number(pieces) || 1;
      const multi = c > 1;
      if (flowSafety === 'for Each Tower') {
        for (let i = 1; i <= c; i++) {
          flowRows.push({
            projectCode, description, location,
            point: `Cooling Tower Flow Status${multi ? ` ${i}` : ''}`,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (flowSafety === 'for All Towers') {
        flowRows.push({
          projectCode, description, location,
          point: 'Cooling Tower General Flow Status',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- Seismic ---
    const seismicRows: any[] = [];
    {
      const c = Number(pieces) || 1;
      const multi = c > 1;
      if (seismicContacts === 'for Each Tower') {
        for (let i = 1; i <= c; i++) {
          seismicRows.push({
            projectCode, description, location,
            point: `Cooling Tower Seismic Status${multi ? ` ${i}` : ''}`,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (seismicContacts === 'for All Towers') {
        seismicRows.push({
          projectCode, description, location,
          point: 'Cooling Tower General Seismic Status',
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- Temperature ---
    const temperatureRows: any[] = [];
    {
      if (temperatureMeasurement !== 'none') {
        const c = Number(pieces) || 1;
        const multi = c > 1;
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          if (
            temperatureMeasurement === 'Inlet Temperature' ||
            temperatureMeasurement === 'Inlet and Outlet Temperature'
          ) {
            temperatureRows.push({
              projectCode, description, location,
              point: `Cooling Tower Inlet Temperature${sfx}`,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            });
          }
          if (
            temperatureMeasurement === 'Outlet Temperature' ||
            temperatureMeasurement === 'Inlet and Outlet Temperature'
          ) {
            temperatureRows.push({
              projectCode, description, location,
              point: `Cooling Tower Outlet Temperature${sfx}`,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            });
          }
        }
      }
    }

    // --- Pool Heating ---
    const poolHeatingRows: any[] = [];
    {
      const c = parseInt(pieces) || 1;
      const multi = c > 1;
      if (poolHeating === 'On/Off Command') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push({
            projectCode, description, location,
            point: `Cooling Tower Pool Heating On/Off Command${sfx}`,
            ai: 0, ao: 0, di: 0, do: 1,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (poolHeating === 'On/Off Command with Feedback') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push(
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating On/Off Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Status${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
        }
      } else if (poolHeating === 'Floating Command') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push(
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Floating Open Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Floating Close Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
        }
      } else if (poolHeating === 'Floating Command with Feedback') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push(
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Floating Open Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Floating Close Command${sfx}`,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Open Status${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Close Status${sfx}`,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
        }
      } else if (poolHeating === 'Proportional Command') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push({
            projectCode, description, location,
            point: `Cooling Tower Pool Heating Proportional Command${sfx}`,
            ai: 0, ao: 1, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
          });
        }
      } else if (poolHeating === 'Proportional Command with Feedback') {
        for (let i = 1; i <= c; i++) {
          const sfx = multi ? ` ${i}` : '';
          poolHeatingRows.push(
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Proportional Command${sfx}`,
              ai: 0, ao: 1, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            },
            {
              projectCode, description, location,
              point: `Cooling Tower Pool Heating Feedback${sfx}`,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
            }
          );
        }
      }
    }

    // --- Low Water Level (status: DI) ---
    const lowWaterLevelRows: any[] = [];
    if (lowWaterLevel === 'Low Water Level') {
      const c = parseInt(pieces) || 1;
      const multi = c > 1;
      for (let i = 1; i <= c; i++) {
        const sfx = multi ? ` ${i}` : '';
        lowWaterLevelRows.push({
          projectCode, description, location,
          point: `Cooling Tower Low Water Level${sfx}`,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    }

    // --- VFD Integration (genel) ---
    const vfdIntegrationRows: any[] = [];
    if (
      vfdIntegration === 'VFD' &&
      ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(vfdProtocolIntegration) &&
      vfdIntegrationPoints.trim() !== '' &&
      !isNaN(Number(vfdIntegrationPoints))
    ) {
      const pts = Number(vfdIntegrationPoints);
      const row: any = {
        projectCode, description, location,
        point: 'Cooling Tower General VFD Integration Points',
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

    setTableRows([
      ...rows,
      ...frequencyInverterRows,
      ...integrationRows,
      ...hardPointsRows,
      ...maintenanceRows,
      ...emergencyRows,
      ...flowRows,
      ...seismicRows,
      ...temperatureRows,
      ...poolHeatingRows,
      ...lowWaterLevelRows,
      ...vfdIntegrationRows
    ]);
    setShowTable(true);
  };

  // --- Add to Pool ---
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
      system: 'cooling-tower',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location }
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));
    setSnackbarMsg('Data added to Pool');
    setSnackbarOpen(true);

    // tabloyu temizle
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Cooling Tower System Input</Typography>
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

              {renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value as string), ['MCC with VFD', 'own Panel'])}

              {renderDropdown('Control Protocol Integration', controlProtocolIntegration, (e) => setControlProtocolIntegration(e.target.value as string), ['Modbus RTU','Modbus TCP IP','Bacnet MSTP','Bacnet IP'], isMCCWithVFD)}

              <TextField
                label="Control Panel Integration Points"
                value={controlPanelIntegrationPoints}
                onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isMCCWithVFD}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: isMCCWithVFD ? '#555' : '#B0BEC5' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: isMCCWithVFD ? '#555' : '#CFD8DC' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isMCCWithVFD ? '#555' : '#90A4AE' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: isMCCWithVFD ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } }}}
              />

              {renderDropdown('Control Panel Hard Points', controlPanelHardPoints, (e) => setControlPanelHardPoints(e.target.value as string), ['none','Statuses','Command','Statuses and Command'], isMCCWithVFD)}

              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value as string), ['1','2','3','4','5','6','7','8'], isOwnPanel)}
              {renderDropdown('Power', power, (e) => setPower(e.target.value as string), ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'], isOwnPanel)}
              {renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value as string), ['230','380'], isOwnPanel)}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value as string), ['none','for Each Tower','for All Towers'], isOwnPanel)}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value as string), ['none','for Each Tower','for All Towers'], isOwnPanel)}
              {renderDropdown('Flow Safety Contacts', flowSafety, (e) => setFlowSafety(e.target.value as string), ['none','for Each Tower','for All Towers'], isOwnPanel)}
              {renderDropdown('Seismic Contacts', seismicContacts, (e) => setSeismicContacts(e.target.value as string), ['none','for Each Tower','for All Towers'], isOwnPanel)}
              {renderDropdown('Temperature Measurement', temperatureMeasurement, (e) => setTemperatureMeasurement(e.target.value as string), ['none','Inlet Temperature','Outlet Temperature','Inlet and Outlet Temperature'], isOwnPanel)}
              {renderDropdown('Pool Heating', poolHeating, (e) => setPoolHeating(e.target.value as string), ['none','On/Off Command','On/Off Command with Feedback','Floating Command','Floating Command with Feedback','Proportional Command','Proportional Command with Feedback'], isOwnPanel)}
              {renderDropdown('Low Water Level', lowWaterLevel, (e) => setLowWaterLevel(e.target.value as string), ['none','Low Water Level'], isOwnPanel)}
              {renderDropdown('VFD Integration', vfdIntegration, (e) => setVfdIntegration(e.target.value as string), ['none','VFD'], isOwnPanel)}

              {renderDropdown('VFD Protocol Integration', vfdProtocolIntegration, (e) => setVfdProtocolIntegration(e.target.value as string), ['Modbus RTU','Modbus TCP IP','Bacnet MSTP','Bacnet IP'], isOwnPanel || isVfdNone)}

              <TextField
                label="VFD Integration Points"
                value={vfdIntegrationPoints}
                onChange={(e) => setVfdIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isOwnPanel || isVfdNone}
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
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } }}}
              />

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveCoolingTower}>Send to Table</PrimaryButton>

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
