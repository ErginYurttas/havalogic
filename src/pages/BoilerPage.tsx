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
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '#1565c0',
    borderColor: 'transparent',
  },
});

const selectStyles = {
  color: '#ECEFF1',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#1e1e1e' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  svg: { color: '#90A4AE' },
} as const;

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' },
};

export default function BoilerPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState(''); // 'local' | 'own Panel'
  const [pieces, setPieces] = useState('');
  const [power, setBoilerPower] = useState('');
  const [voltage, setBoilerVoltage] = useState('');
  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [hightemperatureSafety, setHighTemperatureSafety] = useState('');
  const [gasleakageSafety, setGasLeakageSafety] = useState('');
  const [temperaturemeasurements, setTemperatureMeasurements] = useState('');
  const [protocolIntegration, setProtocolIntegration] = useState('');
  const [protocolIntegrationPoints, setProtocolIntegrationPoints] = useState('');
  const [hardPoints, setHardPoints] = useState('');

  const [balanceTank, setBalanceTank] = useState('');
  const [balanceTankTemperature, setBalanceTankTemperature] = useState('');

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const isLocal = controlType === 'local';

  useEffect(() => {
    if (isLocal) {
      setProtocolIntegration('');
      setProtocolIntegrationPoints('');
      setHardPoints('');
    }
  }, [isLocal]);

  useEffect(() => {
    if (balanceTank === 'none') {
      setBalanceTankTemperature('');
    }
  }, [balanceTank]);

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
      <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSave = () => {
    const rows: any[] = [];
    const hardPointsRows: any[] = [];
    const n = parseInt(pieces) || 1;
    const multi = n > 1;

    // Control Type: local
    if (controlType === 'local') {
      for (let i = 1; i <= n; i++) {
        const sfx = multi ? ` ${i}` : '';
        rows.push(
          {
            projectCode,
            description,
            location,
            point: `Boiler Status${sfx}`,
            ai: 0,
            ao: 0,
            di: 1,
            do: 0,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            projectCode,
            description,
            location,
            point: `Boiler Fault${sfx}`,
            ai: 0,
            ao: 0,
            di: 1,
            do: 0,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            projectCode,
            description,
            location,
            point: `Boiler Command${sfx}`,
            ai: 0,
            ao: 0,
            di: 0,
            do: 1,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          }
        );
      }
    }

    // own Panel integration
    if (
      controlType === 'own Panel' &&
      ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(protocolIntegration) &&
      protocolIntegrationPoints.trim() !== '' &&
      !isNaN(Number(protocolIntegrationPoints))
    ) {
      const val = Number(protocolIntegrationPoints);
      const base: any = {
        projectCode,
        description,
        location,
        point: 'Boiler Panel Integration',
        ai: 0,
        ao: 0,
        di: 0,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      };
      switch (protocolIntegration) {
        case 'Modbus RTU':
          base.modbusRtu = val;
          break;
        case 'Modbus TCP IP':
          base.modbusTcp = val;
          break;
        case 'Bacnet MSTP':
          base.bacnetMstp = val;
          break;
        case 'Bacnet IP':
          base.bacnetIp = val;
          break;
      }
      rows.push(base);
    }

    // Hard Points
    if (hardPoints === 'Statuses' || hardPoints === 'Statuses and Command') {
      hardPointsRows.push(
        {
          point: 'Boiler General Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          projectCode,
          description,
          location,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          point: 'Boiler General Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          projectCode,
          description,
          location,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }
    if (hardPoints === 'Command' || hardPoints === 'Statuses and Command') {
      hardPointsRows.push({
        point: 'Boiler General Command',
        ai: 0,
        ao: 0,
        di: 0,
        do: 1,
        projectCode,
        description,
        location,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    // Maintenance Safety
    const maintenanceRows: any[] = [];
    if (maintenanceSafety === 'for Each Boiler' && controlType) {
      const n2 = parseInt(pieces) || 1;
      const multi2 = n2 > 1;
      for (let i = 1; i <= n2; i++) {
        maintenanceRows.push({
          projectCode,
          description,
          location,
          point: `Boiler Maintenance Status${multi2 ? ` ${i}` : ''}`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        });
      }
    } else if (maintenanceSafety === 'for All Boilers' && controlType) {
      maintenanceRows.push({
        projectCode,
        description,
        location,
        point: 'Boiler General Maintenance Status',
        ai: 0,
        ao: 0,
        di: 1,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    // Emergency Safety
    const emergencyRows: any[] = [];
    if (emergencySafety === 'for Each Boiler' && controlType) {
      const n3 = parseInt(pieces) || 1;
      const multi3 = n3 > 1;
      for (let i = 1; i <= n3; i++) {
        emergencyRows.push({
          projectCode,
          description,
          location,
          point: `Boiler Emergency Status${multi3 ? ` ${i}` : ''}`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        });
      }
    } else if (emergencySafety === 'for All Boilers' && controlType) {
      emergencyRows.push({
        projectCode,
        description,
        location,
        point: 'Boiler General Emergency Status',
        ai: 0,
        ao: 0,
        di: 1,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    // High Temperature
    const highTempRows: any[] = [];
    if (hightemperatureSafety === 'for Each Boiler' && controlType !== 'none') {
      const n4 = parseInt(pieces) || 1;
      const multi4 = n4 > 1;
      for (let i = 1; i <= n4; i++) {
        highTempRows.push({
          projectCode,
          description,
          location,
          point: `Boiler High Temperature Status${multi4 ? ` ${i}` : ''}`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        });
      }
    } else if (hightemperatureSafety === 'for All Boilers' && controlType !== 'none') {
      highTempRows.push({
        projectCode,
        description,
        location,
        point: 'Boiler General High Temperature Status',
        ai: 0,
        ao: 0,
        di: 1,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    // Gas Leakage
    const gasLeakRows: any[] = [];
    if (gasleakageSafety === 'for Each Boiler' && controlType !== 'none') {
      const n5 = parseInt(pieces) || 1;
      const multi5 = n5 > 1;
      for (let i = 1; i <= n5; i++) {
        gasLeakRows.push({
          projectCode,
          description,
          location,
          point: `Boiler Gas Leakage Status${multi5 ? ` ${i}` : ''}`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        });
      }
    } else if (gasleakageSafety === 'for All Boilers' && controlType !== 'none') {
      gasLeakRows.push({
        projectCode,
        description,
        location,
        point: 'Boiler General Gas Leakage Status',
        ai: 0,
        ao: 0,
        di: 1,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    // Temperature Measurements (per boiler)
    const TemperatureMeasurementsRows: any[] = [];
    const tempPointsMap: Record<string, string[]> = {
      'Inlet Temperature': ['Boiler Inlet Temperature'],
      'Outlet Temperature': ['Boiler Outlet Temperature'],
      'Inlet and Outlet Temperature': ['Boiler Inlet Temperature', 'Boiler Outlet Temperature'],
    };
    const selectedPoints = tempPointsMap[temperaturemeasurements] || [];
    if (selectedPoints.length) {
      if (multi) {
        for (let i = 1; i <= n; i++) {
          selectedPoints.forEach((name) => {
            TemperatureMeasurementsRows.push({
              point: `${name} ${i}`,
              ai: 1,
              ao: 0,
              di: 0,
              do: 0,
              projectCode,
              description,
              location,
              modbusRtu: 0,
              modbusTcp: 0,
              bacnetMstp: 0,
              bacnetIp: 0,
              mbus: 0,
            });
          });
        }
      } else {
        selectedPoints.forEach((name) => {
          TemperatureMeasurementsRows.push({
            point: name,
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          });
        });
      }
    }

    // Balance Tank Temperatures
    const BalanceTankTempRows: any[] = [];
    if (balanceTank !== 'none' && balanceTank && balanceTankTemperature) {
      if (balanceTankTemperature === 'Primer Side Temperature') {
        BalanceTankTempRows.push(
          {
            point: 'Boiler Balance Tank Primer Side Inlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            point: 'Boiler Balance Tank Primer Side Outlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          }
        );
      } else if (balanceTankTemperature === 'Seconder Side Temperature') {
        BalanceTankTempRows.push(
          {
            point: 'Boiler Balance Tank Seconder Side Inlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            point: 'Boiler Balance Tank Seconder Side Outlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          }
        );
      } else if (balanceTankTemperature === 'Primer and Seconder Side Temperature') {
        BalanceTankTempRows.push(
          {
            point: 'Boiler Balance Tank Primer Side Inlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            point: 'Boiler Balance Tank Primer Side Outlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            point: 'Boiler Balance Tank Seconder Side Inlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          },
          {
            point: 'Boiler Balance Tank Seconder Side Outlet Temperature',
            ai: 1,
            ao: 0,
            di: 0,
            do: 0,
            projectCode,
            description,
            location,
            modbusRtu: 0,
            modbusTcp: 0,
            bacnetMstp: 0,
            bacnetIp: 0,
            mbus: 0,
          }
        );
      }
    }

    const ALL_ROWS = [
      ...hardPointsRows,
      ...maintenanceRows,
      ...emergencyRows,
      ...highTempRows,
      ...gasLeakRows,
      ...TemperatureMeasurementsRows,
      ...BalanceTankTempRows,
      ...rows,
    ].map((r, i) => ({ ...r, order: i }));

    setTableRows(ALL_ROWS);
    setShowTable(true);
  };

  // ADD POOL
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
      system: 'boiler',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };
    localStorage.setItem(key, JSON.stringify([...existing, payload]));
    setSnackbarMsg('Data added to Pool');
    setSnackbarOpen(true);

    // <<< EKLENDİ: Pool'a ekledikten sonra tabloyu temizle & gizle
    setTableRows([]);
    setShowTable(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #1A237E, #000000)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          <Box component="span" sx={{ color: '#1976d2' }}>
            hava
          </Box>
          <Box component="span" sx={{ color: '#B0BEC5' }}>
            logic
          </Box>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500, color: '#1976d2' }}>
            {loggedInUser || 'User'}
          </Typography>
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={handleLogout} sx={{ minWidth: '100px' }}>
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Main */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Form */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              p: 4,
              width: '400px',
              maxWidth: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Boiler System Input
            </Typography>
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

              {renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value as string), ['local', 'own Panel'])}

              {renderDropdown(
                'Control Protocol Integration',
                protocolIntegration,
                (e) => setProtocolIntegration(e.target.value as string),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                isLocal
              )}

              <TextField
                label="Control Protocol Integration Points"
                value={protocolIntegrationPoints}
                onChange={(e) => setProtocolIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isLocal}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#B0BEC5' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#CFD8DC' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isLocal ? '#555' : '#90A4AE' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: isLocal ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' }, '&.Mui-disabled': { color: '#888' } } }}
              />

              {renderDropdown(
                'Control Protocol Hard Points',
                hardPoints,
                (e) => setHardPoints(e.target.value as string),
                ['none', 'Statuses', 'Command', 'Statuses and Command'],
                isLocal
              )}

              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value as string), ['1', '2', '3', '4', '5', '6', '7', '8'])}

              {renderDropdown(
                'Power',
                power,
                (e) => setBoilerPower(e.target.value),
                ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160']
              )}
              {renderDropdown('Voltage', voltage, (e) => setBoilerVoltage(e.target.value), ['230', '380'])}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Boiler', 'for All Boilers'])}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Boiler', 'for All Boilers'])}
              {renderDropdown('High Temperature Safety Contacts', hightemperatureSafety, (e) => setHighTemperatureSafety(e.target.value), ['none', 'for Each Boiler', 'for All Boilers'])}
              {renderDropdown('Gas Leakage Safety Contacts', gasleakageSafety, (e) => setGasLeakageSafety(e.target.value), ['none', 'for Each Boiler', 'for All Boilers'])}

              {renderDropdown(
                'Temperature Measuremets',
                temperaturemeasurements,
                (e) => setTemperatureMeasurements(e.target.value),
                ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature']
              )}

              {renderDropdown('Balance Tank', balanceTank, (e) => setBalanceTank(e.target.value), ['none', 'Balance Tank'])}

              {renderDropdown(
                'Balance Tank Temperature Measurement',
                balanceTankTemperature,
                (e) => setBalanceTankTemperature(e.target.value),
                ['Primer Side Temperature', 'Seconder Side Temperature', 'Primer and Seconder Side Temperature'],
                balanceTank === 'none'
              )}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSave}>
                Send to Table
              </PrimaryButton>

              <PrimaryButton sx={{ width: '100%' }} onClick={handleAddPool} disabled={!projectCode || tableRows.length === 0}>
                Add Pool
              </PrimaryButton>

              <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>
                Back to Project Overview
              </PrimaryButton>
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
            color: 'white',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            {projectCode ? `${projectCode} Output Table` : 'Boiler Output Table'}
          </Typography>

          {showTable && tableRows.length > 0 && (
            <table
              style={{
                minWidth: '1200px',
                borderCollapse: 'collapse',
                backgroundColor: '#ffffff',
                fontSize: '0.875rem',
                fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e0e0e0',
                color: '#333',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                  {[
                    'Project Code',
                    'Description',
                    'Located',
                    'Point Name',
                    'AI',
                    'AO',
                    'DI',
                    'DO',
                    'Modbus RTU',
                    'Modbus TCP IP',
                    'Bacnet MSTP',
                    'Bacnet IP',
                    'Mbus',
                  ].map((header, i) => (
                    <th key={i} style={{ border: '1px solid #e0e0e0', padding: '10px', fontWeight: 500, fontSize: '0.85rem', textAlign: 'left' }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8', transition: 'background 0.3s', cursor: 'default' }}>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.description}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.location}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.point}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.di}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.do}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: 8, fontSize: '0.82rem', color: '#424242' }}>{row.mbus}</td>
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
        autoHideDuration={2200}
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
          },
        }}
      />
    </Box>
  );
}
