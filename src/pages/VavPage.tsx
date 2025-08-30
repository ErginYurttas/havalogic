import React, { useState, useMemo, useEffect } from 'react';
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
  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': { backgroundColor: '#1565c0', borderColor: 'transparent' }
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

export default function VavPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState('');                 
  const [thermoIntegration, setThermoIntegration] = useState('');     
  const [thermoProtocol, setThermoProtocol] = useState('');           
  const [thermoPoints, setThermoPoints] = useState('');               

  const [pieces, setPieces] = useState('');                           

  const [heatingFunction, setHeatingFunction] = useState('');         
  const [heatingPower, setHeatingPower] = useState('');               
  const [heatingVoltage, setHeatingVoltage] = useState('');           
  const [heatingCoilTemperature, setHeatingCoilTemperature] = useState('');

  const [highTempSafety, setHighTempSafety] = useState('');   
  const [flowSafety, setFlowSafety] = useState('');           
  const [roomSensor, setRoomSensor] = useState(''); 

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');


  const isThermostatMode = useMemo(() => controlType.startsWith('Thermostat'), [controlType]);
  const isDDCMode = useMemo(() => controlType.startsWith('with DDC'), [controlType]);
  const isVAV = useMemo(() => controlType.endsWith('for VAV'), [controlType]);
  const deviceLabel = isVAV ? 'VAV' : controlType ? 'CAV' : 'VAV'; // default VAV if empty

  const valveTypes = new Set([
    'On/Off Valve Actuator',
    'On/Off Valve Actuator with Feedback',
    'Floating Valve Actuator',
    'Floating Valve Actuator with Feedback',
    'Proportional Valve Actuator',
    'Proportional Valve Actuator with Feedback',
  ]);
  const stagedElectric = new Set([
    '1-Staged Electrical Heater',
    '2-Staged Electrical Heater',
    '3-Staged Electrical Heater',
  ]);

  const safetyEach = isVAV ? 'for Each VAV' : 'for Each CAV';
  const safetyAll  = isVAV ? "for All VAV's" : "for All CAV's";

  // --------- Disable booleans (UI) ----------
  const disThermoIntegration = !isThermostatMode || isDDCMode;
  const disThermoProtocol    = !isThermostatMode || isDDCMode || thermoIntegration !== 'Thermostat';
  const disThermoPoints      = !isThermostatMode || isDDCMode || thermoIntegration !== 'Thermostat';

  const disPieces            = isThermostatMode;
  const disHeatingFunction   = isThermostatMode;
  const disHighTempSafety    = isThermostatMode;
  const disFlowSafety        = isThermostatMode;
  const disRoomSensor        = isThermostatMode;

  const disHeatingPower =
    isThermostatMode || heatingFunction === 'none' || valveTypes.has(heatingFunction);
  const disHeatingVoltage =
    isThermostatMode || heatingFunction === 'none' || valveTypes.has(heatingFunction);
  const disHeatingCoilTemp =
    isThermostatMode || stagedElectric.has(heatingFunction);

  // --------- Auto-clear effects (state hygiene) ----------
  // 1) Control Type değişince mod kuralları
  useEffect(() => {
    if (isDDCMode) {
      // DDC => thermostat alanlarını temizle
      if (thermoIntegration) setThermoIntegration('');
      if (thermoProtocol) setThermoProtocol('');
      if (thermoPoints) setThermoPoints('');
    }
    if (isThermostatMode) {
      // Thermostat => pieces + heating + safety + roomsensor temizle
      if (pieces) setPieces('');
      if (heatingFunction) setHeatingFunction('');
      if (heatingPower) setHeatingPower('');
      if (heatingVoltage) setHeatingVoltage('');
      if (heatingCoilTemperature) setHeatingCoilTemperature('');
      if (highTempSafety) setHighTempSafety('');
      if (flowSafety) setFlowSafety('');
      if (roomSensor) setRoomSensor('');
    }
  }, [
    isDDCMode,
    isThermostatMode,
    thermoIntegration,
    thermoProtocol,
    thermoPoints,
    pieces,
    heatingFunction,
    heatingPower,
    heatingVoltage,
    heatingCoilTemperature,
    highTempSafety,
    flowSafety,
    roomSensor
  ]);

  // 2) Heating function değişince bağlı temizlemeler
  useEffect(() => {
    if (!heatingFunction || heatingFunction === 'none') {
      if (heatingPower) setHeatingPower('');
      if (heatingVoltage) setHeatingVoltage('');
      return;
    }
    if (valveTypes.has(heatingFunction)) {
      if (heatingPower) setHeatingPower('');
      if (heatingVoltage) setHeatingVoltage('');
    }
    if (stagedElectric.has(heatingFunction)) {
      if (heatingCoilTemperature) setHeatingCoilTemperature('');
    }
  }, [heatingFunction, heatingPower, heatingVoltage, heatingCoilTemperature]);

  // --------- UI helpers ----------
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

// VAV mı CAV mı? Control Type'a göre prefix
const deviceLabelFromControlType = (ct: string) => (ct?.includes('CAV') ? 'CAV' : 'VAV');

// Tek bir satır nesnesi oluşturur
const makeRow = (point: string) => ({
  point,
  ai: 0, ao: 0, di: 0, do: 0,
  projectCode, description, location,
  modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
});

// Senin verdiğin 1:1 şablona göre satır üretir + VAV/CAV prefix + Pieces çoğaltma
const buildHeatingRows = () => {
  const heatingRows: any[] = [];
  const label = deviceLabelFromControlType(controlType);
  const count = Math.max(1, parseInt(pieces || '1', 10) || 1);
  const sfx = (i: number) => (count > 1 ? ` ${i}` : '');

  // Yardımcı push: hem sütunları hem isimlendirmeyi ayarlar
  const push = (basePoint: string, flags: Partial<{ai:number;ao:number;di:number;do:number}>) => {
    for (let i = 1; i <= count; i++) {
      const row = makeRow(`${label} ${basePoint}${sfx(i)}`);
      if (typeof flags.ai === 'number') row.ai = flags.ai;
      if (typeof flags.ao === 'number') row.ao = flags.ao;
      if (typeof flags.di === 'number') row.di = flags.di;
      if (typeof flags.do === 'number') row.do = flags.do;
      heatingRows.push(row);
    }
  };

  // === Senin gönderdiğin birebir kurallar ===
  if (heatingFunction === 'On/Off Valve Actuator') {
    push('Heating Valve Command', { do: 1 });
  }

  if (heatingFunction === 'On/Off Valve Actuator with Feedback') {
    push('Heating Valve Command', { do: 1 });
    push('Heating Valve Status', { di: 1 });
  }

  if (heatingFunction === 'Floating Valve Actuator') {
    push('Heating Valve Open Command', { do: 1 });
    push('Heating Valve Close Command', { do: 1 });
  }

  if (heatingFunction === 'Floating Valve Actuator with Feedback') {
    push('Heating Valve Open Command', { do: 1 });
    push('Heating Valve Close Command', { do: 1 });
    push('Heating Valve Open Status', { di: 1 });
    push('Heating Valve Close Status', { di: 1 });
  }

  if (heatingFunction === 'Proportional Valve Actuator') {
    push('Heating Valve Proportional Command', { ao: 1 });
  }

  if (heatingFunction === 'Proportional Valve Actuator with Feedback') {
    push('Heating Valve Proportional Command', { ao: 1 });
    push('Heating Valve Proportional Feedback', { ai: 1 });
  }

  if (heatingFunction === '1-Staged Electrical Heater') {
    push('Heating Electrical Heater Status', { di: 1 });
    push('Heating Electrical Heater Fault', { di: 1 });
    push('Heating Electrical Heater Command', { do: 1 });
    push('Heating Electrical Heater Air Flow', { di: 1 });
  }

  if (heatingFunction === '2-Staged Electrical Heater') {
    push('Heating Electrical Heater-1 Status', { di: 1 });
    push('Heating Electrical Heater-1 Fault', { di: 1 });
    push('Heating Electrical Heater-1 Command', { do: 1 });
    push('Heating Electrical Heater-2 Status', { di: 1 });
    push('Heating Electrical Heater-2 Fault', { di: 1 });
    push('Heating Electrical Heater-2 Command', { do: 1 });
    push('Heating Electrical Heater Air Flow', { di: 1 });
  }

  if (heatingFunction === '3-Staged Electrical Heater') {
    push('Heating Electrical Heater-1 Status', { di: 1 });
    push('Heating Electrical Heater-1 Fault', { di: 1 });
    push('Heating Electrical Heater-1 Command', { do: 1 });
    push('Heating Electrical Heater-2 Status', { di: 1 });
    push('Heating Electrical Heater-2 Fault', { di: 1 });
    push('Heating Electrical Heater-2 Command', { do: 1 });
    push('Heating Electrical Heater-3 Status', { di: 1 });
    push('Heating Electrical Heater-3 Fault', { di: 1 });
    push('Heating Electrical Heater-3 Command', { do: 1 });
    push('Heating Electrical Heater Air Flow', { di: 1 });
  }

  if (heatingFunction === 'Proportional Electrical Heater') {
    push('Heating Proportional Electrical Heater Status', { di: 1 });
    push('Heating Proportional Electrical Heater Fault', { di: 1 });
    push('Heating Proportional Electrical Heater Command', { do: 1 });
    push('Heating Proportional Electrical Heater Proportional Control', { ao: 1 });
    push('Heating Proportional Electrical Heater Feedback', { ai: 1 });
  }

  return heatingRows;
};

// === Heating Coil Temperature -> tablo satırları ===
const buildHeatingCoilTempRows = () => {
  const rows: any[] = [];
  const label = deviceLabelFromControlType(controlType);
  const count = Math.max(1, parseInt(pieces || '1', 10) || 1);
  const sfx = (i: number) => (count > 1 ? ` ${i}` : '');

  const push = (basePoint: string) => {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} ${basePoint}${sfx(i)}`,
        ai: 1, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  };

  if (heatingCoilTemperature === 'Inlet Temperature') {
    push('Heating Coil Inlet Temperature');
  } else if (heatingCoilTemperature === 'Outlet Temperature') {
    push('Heating Coil Outlet Temperature');
  } else if (heatingCoilTemperature === 'Inlet and Outlet Temperature') {
    push('Heating Coil Inlet Temperature');
    push('Heating Coil Outlet Temperature');
  }
  // 'none' veya boş ise satır eklenmez

  return rows;
};

// === High Temperature Safety Contacts -> tablo satırları ===
const buildHighTempSafetyRows = () => {
  const rows: any[] = [];

  // none veya boş ise satır eklenmez
  if (!highTempSafety || highTempSafety === 'none') return rows;

  const label = deviceLabelFromControlType(controlType); // VAV/CAV dinamik
  const count = Math.max(1, parseInt(pieces || '1', 10) || 1);
  const sfx = (i: number) => (count > 1 ? ` ${i}` : '');

  // Seçime göre nokta adı
  const pointName =
    highTempSafety === safetyEach
      ? `${label} High Temperature Status`
      : `${label} General High Temperature Status`;

  for (let i = 1; i <= count; i++) {
    rows.push({
      point: `${pointName}${sfx(i)}`,
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  return rows;
};

// === Flow Safety Contacts -> tablo satırları ===
const buildFlowSafetyRows = () => {
  const rows: any[] = [];

  // none veya boş ise satır eklenmez
  if (!flowSafety || flowSafety === 'none') return rows;

  const label = deviceLabelFromControlType(controlType); // VAV/CAV dinamik
  const count = Math.max(1, parseInt(pieces || '1', 10) || 1);
  const sfx = (i: number) => (count > 1 ? ` ${i}` : '');

  // Seçime göre nokta adı
  const pointName =
    flowSafety === safetyEach
      ? `${label} Flow Air Status`
      : `${label} General Flow Air Status`;

  for (let i = 1; i <= count; i++) {
    rows.push({
      point: `${pointName}${sfx(i)}`,
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  return rows;
};


// === Room Sensor -> tablo satırları ===
const buildRoomSensorRows = () => {
  const rows: any[] = [];

  if (!roomSensor || roomSensor === 'none') return rows;

  const label = deviceLabelFromControlType(controlType); // VAV/CAV dinamik
  const count = Math.max(1, parseInt(pieces || '1', 10) || 1);
  const sfx = (i: number) => (count > 1 ? ` ${i}` : '');

  if (roomSensor === 'Temperature') {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} Room Temperature${sfx(i)}`,
        ai: 1, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (roomSensor === 'Humidity') {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} Room Humidity${sfx(i)}`,
        ai: 1, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (roomSensor === 'Co2') {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} Room Co2${sfx(i)}`,
        ai: 1, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (roomSensor === 'Temperature and Humidity') {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} Room Temperature and Humidity${sfx(i)}`,
        ai: 2, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (roomSensor === 'Temperature, Humidity and Co2') {
    for (let i = 1; i <= count; i++) {
      rows.push({
        point: `${label} Room Temperature, Humidity and Co2${sfx(i)}`,
        ai: 3, ao: 0, di: 0, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

  return rows;
};


  // --------- Table builder (ONLY what we agreed) ----------
  const handleSaveVav = () => {
    const rows: any[] = [];
    const base = {
      projectCode,
      description,
      location,
      ai: 0, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    };

    // DDC MODE -> Control Signal (AO=1), Volume Feedback (AI=1); Pieces kadar kopyala + suffix
    if (isDDCMode) {
      const n = Math.max(1, parseInt(pieces || '1', 10) || 1);
      for (let i = 1; i <= n; i++) {
        const suffix = n > 1 ? ` ${i}` : '';
        rows.push({ ...base, point: `${deviceLabel} Control Signal${suffix}`, ao: 1 });
        rows.push({ ...base, point: `${deviceLabel} Volume Feedback${suffix}`, ai: 1 });
      }
    }

    // THERMOSTAT MODE + Thermostat integration aktif -> protocol sütununa points yaz
    if (isThermostatMode && thermoIntegration === 'Thermostat') {
      const pts = parseInt(thermoPoints || '0', 10) || 0;
      const proto = {
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0
      } as any;

      switch (thermoProtocol) {
        case 'Modbus RTU':   proto.modbusRtu = pts; break;
        case 'Modbus TCP IP':proto.modbusTcp = pts; break;
        case 'Bacnet MSTP':  proto.bacnetMstp = pts; break;
        case 'Bacnet IP':    proto.bacnetIp = pts; break;
      }

      rows.push({
        ...base,
        point: `${deviceLabel} Thermostat Integration`,
        ...proto
      });
    }

    rows.push(...buildHeatingRows());
    rows.push(...buildHeatingCoilTempRows());
    rows.push(...buildHighTempSafetyRows());
    rows.push(...buildFlowSafetyRows());
    rows.push(...buildRoomSensorRows());




    setTableRows(rows);
    setShowTable(true);
  };

  // --- Add Pool (VAV/CAV) ---
const handleAddPool = () => {
  if (!tableRows || tableRows.length === 0) {
    setSnackbarMsg('No rows to add. Please generate the table first.');
    setSnackbarOpen(true);
    return;
  }

  // Pool anahtarı: sistem (VAV/CAV) bazlı
  const sys = controlType.includes('CAV') ? 'cav' : 'vav';
  const key = `pool:${sys}`;

  // Var olanı oku
  let packs: any[] = [];
  try {
    const raw = localStorage.getItem(key);
    packs = raw ? JSON.parse(raw) : [];
  } catch {
    packs = [];
  }

  // Yeni pack
  const payload = {
    id: Date.now(),
    system: sys, // 'vav' | 'cav'
    rows: tableRows,
    createdAt: new Date().toISOString(),
    meta: { projectCode, description, location, controlType, pieces }
  };

  // Kaydet
  packs.push(payload);
  localStorage.setItem(key, JSON.stringify(packs));

  // Snackbar
  setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
  setSnackbarOpen(true);

  // Tabloyu temizle
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Vav System Input</Typography>
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
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown(
                'Control Type',
                controlType,
                (e) => setControlType(e.target.value),
                ['with DDC for VAV', 'with DDC for CAV', 'Thermostat for VAV', 'Thermostat for CAV']
              )}

              {renderDropdown(
                'Thermostat Integration',
                thermoIntegration,
                (e) => setThermoIntegration(e.target.value),
                ['none', 'Thermostat'],
                disThermoIntegration
              )}

              {renderDropdown(
                'Thermostat Protocol',
                thermoProtocol,
                (e) => setThermoProtocol(e.target.value),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                disThermoProtocol
              )}

              <TextField
                label="Thermostat Integration Points"
                value={thermoPoints}
                onChange={(e) => setThermoPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={disThermoPoints}
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermoPoints ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermoPoints ? '#555' : '#90A4AE',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermoPoints ? '#555' : '#CFD8DC',
                  },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: disThermoPoints ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown(
                'Pieces',
                pieces,
                (e) => setPieces(e.target.value),
                ['1','2','3','4','5','6','7','8'],
                disPieces
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
                  'Proportional Valve Actuator with Feedback',
                  '1-Staged Electrical Heater',
                  '2-Staged Electrical Heater',
                  '3-Staged Electrical Heater',
                  'Proportional Electrical Heater'
                ],
                disHeatingFunction
              )}

              {renderDropdown(
                'Heating Power',
                heatingPower,
                (e) => setHeatingPower(e.target.value),
                ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'],
                disHeatingPower
              )}

              {renderDropdown(
                'Heating Voltage',
                heatingVoltage,
                (e) => setHeatingVoltage(e.target.value),
                ['230','380'],
                disHeatingVoltage
              )}

              {renderDropdown(
                'Heating Coil Temperature',
                heatingCoilTemperature,
                (e) => setHeatingCoilTemperature(e.target.value),
                ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'],
                disHeatingCoilTemp
              )}

              {renderDropdown(
                'High Temperature Safety Contacts',
                highTempSafety,
                (e) => setHighTempSafety(e.target.value),
                ['none', safetyEach, safetyAll],
                disHighTempSafety
              )}

              {renderDropdown(
                'Flow Safety Contacts',
                flowSafety,
                (e) => setFlowSafety(e.target.value),
                ['none', safetyEach, safetyAll],
                disFlowSafety
              )}

              {renderDropdown(
                'Room Sensor',
                roomSensor,
                (e) => setRoomSensor(e.target.value),
                ['none', 'Temperature', 'Humidity', 'Temperature and Humidity', 'Co2', 'Temperature, Humidity and Co2'],
                disRoomSensor
              )}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveVav}>Send to Table</PrimaryButton>
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
        <Box
          sx={{
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
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {projectCode ? `${projectCode} Output Table` : 'Vav Output Table'}
          </Typography>

          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%' }} />

          {showTable && tableRows.length > 0 && (
            <table
              style={{
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
              }}
            >
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
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8',
                      transition: 'background 0.3s',
                      cursor: 'default'
                    }}
                  >
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
