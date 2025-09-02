import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Snackbar,
  Button,
} from '@mui/material';
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
    borderColor: 'transparent'
  }
});


const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' },
};

export default function DataCenterPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [cracIntegration, setCracIntegration] = useState('');
  const [cracProtocolIntegration, setCracProtocolIntegration] = useState('');
  const [cracIntegrationPoints, setCracIntegrationPoints] = useState('');
  const [cracPieces, setCracPieces] = useState('');

  const [crahIntegration, setCrahIntegration] = useState('');
  const [crahProtocolIntegration, setCrahProtocolIntegration] = useState('');
  const [crahIntegrationPoints, setCrahIntegrationPoints] = useState('');
  const [crahPieces, setCrahPieces] = useState('');

  const [crahValveFunciton, setCrahValveFunciton] = useState('');
  const [crachCoilTemperature, setCrachCoilTemperature] = useState('');

  const [hotAisle, setHotAisle] = useState('');
  const [hotAislePieces, setHotAislePieces] = useState('');
  const [hotAisleMeasurement, setHotAisleMeasurement] = useState('');

  const [coldAisle, setColdAisle] = useState('');
  const [coldAislePieces, setColdAislePieces] = useState('');
  const [coldAisleMeasurement, setColdAisleMeasurement] = useState('');

  const [leakageContacts, setLeakageContacts] = useState('');
  const [leakageContactsPieces, setLeakageContactsPieces] = useState('');

  const [seismicContacts, setSeismicContacts] = useState('');
  const [seismicContactsPieces, setSeismicContactsPieces] = useState('');

  const [fireSafetyContacts, setFireSafetyContacts] = useState('');

  const [pduIntegration, setPduIntegration] = useState('');
  const [pduProtocolIntegration, setPduProtocolIntegration] = useState('');
  const [pduIntegrationPoints, setPduIntegrationPoints] = useState('');

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  const renderDropdown = (
    label: string,
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    options: string[],
    disabled = false
  ) => (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      disabled={disabled}
      InputLabelProps={{ sx: labelStyles }}
      sx={{
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: disabled ? '#555' : '#B0BEC5',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#90A4AE',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CFD8DC',
        },
      }}
      InputProps={{
        sx: {
          backgroundColor: disabled ? '#1e1e1e' : 'transparent',
          '& .MuiInputBase-input': { color: disabled ? '#888' : '#ECEFF1' },
          ...(disabled ? { WebkitTextFillColor: '#888', color: '#888' } : {}),
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );

  // Disable/clear effects
  React.useEffect(() => {
    if (cracIntegration === 'none') {
      setCracProtocolIntegration('');
      setCracIntegrationPoints('');
      setCracPieces('');
    }
  }, [cracIntegration]);

  React.useEffect(() => {
    if (crahIntegration === 'none') {
      setCrahProtocolIntegration('');
      setCrahIntegrationPoints('');
      setCrahPieces('');
    }
  }, [crahIntegration]);

  React.useEffect(() => {
    if (hotAisle === 'none') {
      setHotAislePieces('');
      setHotAisleMeasurement('');
    }
  }, [hotAisle]);

  React.useEffect(() => {
    if (coldAisle === 'none') {
      setColdAislePieces('');
      setColdAisleMeasurement('');
    }
  }, [coldAisle]);

  React.useEffect(() => {
    if (leakageContacts === 'none') setLeakageContactsPieces('');
  }, [leakageContacts]);

  React.useEffect(() => {
    if (seismicContacts === 'none') setSeismicContactsPieces('');
  }, [seismicContacts]);

  React.useEffect(() => {
    if (pduIntegration === 'none') {
      setPduProtocolIntegration('');
      setPduIntegrationPoints('');
    }
  }, [pduIntegration]);

  // Build table
  const handleSaveDataCenter = () => {
    const rows: any[] = [];

    const emptyProto = () => ({
      modbusRtu: 0,
      modbusTcp: 0,
      bacnetMstp: 0,
      bacnetIp: 0,
      mbus: 0,
    });

    // CRAC Integration
    if (cracIntegration === 'Integration') {
      const pts = Number(cracIntegrationPoints) || 0;
      const pcs = Math.max(1, Number(cracPieces) || 1);
      const pointBase = 'Crac Integration Points';

      for (let i = 1; i <= pcs; i++) {
        const protoCols = emptyProto();
        if (cracProtocolIntegration === 'Modbus RTU') protoCols.modbusRtu = pts;
        else if (cracProtocolIntegration === 'Modbus TCP IP') protoCols.modbusTcp = pts;
        else if (cracProtocolIntegration === 'Bacnet MSTP') protoCols.bacnetMstp = pts;
        else if (cracProtocolIntegration === 'Bacnet IP') protoCols.bacnetIp = pts;

        rows.push({
          projectCode,
          description,
          location,
          point: pcs > 1 ? `Crac ${i} Integration Points` : pointBase,
          ai: 0,
          ao: 0,
          di: 0,
          do: 0,
          ...protoCols,
        });
      }
    }

    // CRAH Integration
    if (crahIntegration === 'Integration') {
      const pts = Number(crahIntegrationPoints) || 0;
      const pcs = Math.max(1, Number(crahPieces) || 1);
      const pointBase = 'Crah Integration Points';

      for (let i = 1; i <= pcs; i++) {
        const protoCols = emptyProto();
        if (crahProtocolIntegration === 'Modbus RTU') protoCols.modbusRtu = pts;
        else if (crahProtocolIntegration === 'Modbus TCP IP') protoCols.modbusTcp = pts;
        else if (crahProtocolIntegration === 'Bacnet MSTP') protoCols.bacnetMstp = pts;
        else if (crahProtocolIntegration === 'Bacnet IP') protoCols.bacnetIp = pts;

        rows.push({
          projectCode,
          description,
          location,
          point: pcs > 1 ? `Crah ${i} Integration Points` : pointBase,
          ai: 0,
          ao: 0,
          di: 0,
          do: 0,
          ...protoCols,
        });
      }
    }

    // CRAH Valve Function
    if (crahValveFunciton && crahValveFunciton !== 'none') {
      const pcs = Math.max(1, Number(crahPieces) || 1);

      for (let i = 1; i <= pcs; i++) {
        const namePrefix = pcs > 1 ? `Crah ${i}` : 'Crah';
        const push = (
          pointName: string,
          { ai = 0, ao = 0, di = 0, doo = 0 }: { ai?: number; ao?: number; di?: number; doo?: number }
        ) => {
          rows.push({
            projectCode,
            description,
            location,
            point: `${namePrefix} ${pointName}`,
            ai,
            ao,
            di,
            do: doo,
            ...emptyProto(),
          });
        };

        switch (crahValveFunciton) {
          case 'On/Off Valve Actuator':
            push('On/Off Valve Actuator', { doo: 1 });
            break;
          case 'On/Off Valve Actuator with Feedback':
            push('On/Off Valve Actuator Command', { doo: 1 });
            push('On/Off Valve Actuator Status', { di: 1 });
            break;
          case 'Floating Valve Actuator':
            push('Floating Valve Actuator Open Command', { doo: 1 });
            push('Floating Valve Actuator Close Command', { doo: 1 });
            break;
          case 'Floating Valve Actuator with Feedback':
            push('Floating Valve Actuator Open Command', { doo: 1 });
            push('Floating Valve Actuator Close Command', { doo: 1 });
            push('Floating Valve Actuator Open Status', { di: 1 });
            push('Floating Valve Actuator Close Status', { di: 1 });
            break;
          case 'Proportional Valve Actuator':
            push('Proportional Valve Actuator Control', { ao: 1 });
            break;
          case 'Proportional Valve Actuator with Feedback':
            push('Proportional Valve Actuator Control', { ao: 1 });
            push('Proportional Valve Actuator Feedback', { ai: 1 });
            break;
          default:
            break;
        }
      }
    }

    // CRAC Coil Temperature
    if (crachCoilTemperature && crachCoilTemperature !== 'none') {
      const pcs = Math.max(1, Number(cracPieces) || 1);
      const pushCracAI = (suffix: string, i?: number) => {
        const namePrefix = pcs > 1 ? `Crac ${i}` : 'Crac';
        rows.push({
          projectCode,
          description,
          location,
          point: `${namePrefix} Cooling Coil ${suffix}`,
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          ...emptyProto(),
        });
      };

      for (let i = 1; i <= pcs; i++) {
        if (crachCoilTemperature === 'Inlet Temperature') {
          pushCracAI('Inlet Temperature', i);
        } else if (crachCoilTemperature === 'Outlet Temperature') {
          pushCracAI('Outlet Temperature', i);
        } else if (crachCoilTemperature === 'Inlet and Outlet Temperature') {
          pushCracAI('Inlet Temperature', i);
          pushCracAI('Outlet Temperature', i);
        }
      }
    }

    // Hot Aisle
    if (hotAisle === 'Sensor' && hotAisleMeasurement) {
      const pcs = Math.max(1, Number(hotAislePieces) || 1);
      const pushHotAI = (suffix: string, i?: number) => {
        const namePrefix = pcs > 1 ? `Hot Aisle ${i}` : 'Hot Aisle';
        rows.push({
          projectCode,
          description,
          location,
          point: `${namePrefix} ${suffix}`,
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          ...emptyProto(),
        });
      };

      for (let i = 1; i <= pcs; i++) {
        if (hotAisleMeasurement === 'Temperature') {
          pushHotAI('Temperature', i);
        } else if (hotAisleMeasurement === 'Humidity') {
          pushHotAI('Humidity', i);
        } else if (hotAisleMeasurement === 'Temperature and Humidity') {
          pushHotAI('Temperature', i);
          pushHotAI('Humidity', i);
        }
      }
    }

    // Cold Aisle
    if (coldAisle === 'Sensor' && coldAisleMeasurement) {
      const pcs = Math.max(1, Number(coldAislePieces) || 1);
      const pushColdAI = (suffix: string, i?: number) => {
        const namePrefix = pcs > 1 ? `Cold Aisle ${i}` : 'Cold Aisle';
        rows.push({
          projectCode,
          description,
          location,
          point: `${namePrefix} ${suffix}`,
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          ...emptyProto(),
        });
      };

      for (let i = 1; i <= pcs; i++) {
        if (coldAisleMeasurement === 'Temperature') {
          pushColdAI('Temperature', i);
        } else if (coldAisleMeasurement === 'Humidity') {
          pushColdAI('Humidity', i);
        } else if (coldAisleMeasurement === 'Temperature and Humidity') {
          pushColdAI('Temperature', i);
          pushColdAI('Humidity', i);
        }
      }
    }

    // Leakage Contacts
    if (leakageContacts === 'Contact') {
      const pcs = Math.max(1, Number(leakageContactsPieces) || 1);
      const pushLeakageDI = (i?: number) => {
        const namePrefix = pcs > 1 ? `Leakage Contact ${i}` : 'Leakage Contact';
        rows.push({
          projectCode,
          description,
          location,
          point: `${namePrefix} Status`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          ...emptyProto(),
        });
      };
      for (let i = 1; i <= pcs; i++) pushLeakageDI(i);
    }

    // Seismic Contacts
    if (seismicContacts === 'Contact') {
      const pcs = Math.max(1, Number(seismicContactsPieces) || 1);
      const pushSeismicDI = (i?: number) => {
        const namePrefix = pcs > 1 ? `Seismic Contact ${i}` : 'Seismic Contact';
        rows.push({
          projectCode,
          description,
          location,
          point: `${namePrefix} Status`,
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          ...emptyProto(),
        });
      };
      for (let i = 1; i <= pcs; i++) pushSeismicDI(i);
    }

    // Fire Safety Contacts
    if (fireSafetyContacts === 'only Viewing' || fireSafetyContacts === 'Viewing and Control') {
      rows.push({
        projectCode,
        description,
        location,
        point: `Data Center Fire Alarm ( ${fireSafetyContacts} )`,
        ai: 0,
        ao: 0,
        di: 1,
        do: 0,
        ...emptyProto(),
      });
    }

    // PDU Integration
    if (pduIntegration === 'Integration') {
      const pts = Number(pduIntegrationPoints) || 0;
      const protoCols = emptyProto();
      if (pduProtocolIntegration === 'Modbus RTU') protoCols.modbusRtu = pts;
      else if (pduProtocolIntegration === 'Modbus TCP IP') protoCols.modbusTcp = pts;
      else if (pduProtocolIntegration === 'Bacnet MSTP') protoCols.bacnetMstp = pts;
      else if (pduProtocolIntegration === 'Bacnet IP') protoCols.bacnetIp = pts;

      rows.push({
        projectCode,
        description,
        location,
        point: 'PDU Integration Points',
        ai: 0,
        ao: 0,
        di: 0,
        do: 0,
        ...protoCols,
      });
    }

    setTableRows(rows);
    setShowTable(true);
  };

  // Add Pool
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
      system: 'datacenter',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
    setSnackbarOpen(true);

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
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={handleLogout} sx={{ minWidth: '100px' }}>
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Form */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', p: 4, width: '400px', maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Data Center System Input</Typography>
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

              {renderDropdown('Crac Integration', cracIntegration, setCracIntegration, ['none', 'Integration'])}

              {renderDropdown('Crac Protocol Integration', cracProtocolIntegration, setCracProtocolIntegration, ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], cracIntegration === 'none')}

              <TextField
                label="Crac Integration Points"
                value={cracIntegrationPoints}
                onChange={(e) => setCracIntegrationPoints(e.target.value)}
                fullWidth
                disabled={cracIntegration === 'none'}
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: cracIntegration === 'none' ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: cracIntegration === 'none' ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: cracIntegration === 'none' ? '#888' : '#ECEFF1' },
                    ...(cracIntegration === 'none' ? { WebkitTextFillColor: '#888', color: '#888' } : {}),
                  },
                }}
              />

              {renderDropdown('Crac Pieces', cracPieces, setCracPieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), cracIntegration === 'none')}

              {renderDropdown('Crah Integration', crahIntegration, setCrahIntegration, ['none', 'Integration'])}

              {renderDropdown('Crah Protocol Integration', crahProtocolIntegration, setCrahProtocolIntegration, ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], crahIntegration === 'none')}

              <TextField
                label="Crah Integration Points"
                value={crahIntegrationPoints}
                onChange={(e) => setCrahIntegrationPoints(e.target.value)}
                fullWidth
                disabled={crahIntegration === 'none'}
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: crahIntegration === 'none' ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: crahIntegration === 'none' ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: crahIntegration === 'none' ? '#888' : '#ECEFF1' },
                    ...(crahIntegration === 'none' ? { WebkitTextFillColor: '#888', color: '#888' } : {}),
                  },
                }}
              />

              {renderDropdown('Crah Pieces', crahPieces, setCrahPieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), crahIntegration === 'none')}
              {renderDropdown('Crah Valve Funciton', crahValveFunciton, setCrahValveFunciton, [
                'none',
                'On/Off Valve Actuator',
                'On/Off Valve Actuator with Feedback',
                'Floating Valve Actuator',
                'Floating Valve Actuator with Feedback',
                'Proportional Valve Actuator',
                'Proportional Valve Actuator with Feedback',
              ])}

              {renderDropdown('Crac Coil Temperature', crachCoilTemperature, setCrachCoilTemperature, ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'])}

              {renderDropdown('Hot Aisle', hotAisle, setHotAisle, ['none', 'Sensor'])}
              {renderDropdown('Hot Aisle Measurement', hotAisleMeasurement, setHotAisleMeasurement, ['Temperature', 'Humidity', 'Temperature and Humidity'], hotAisle === 'none')}
              {renderDropdown('Hot Aisle Pieces', hotAislePieces, setHotAislePieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), hotAisle === 'none')}

              {renderDropdown('Cold Aisle', coldAisle, setColdAisle, ['none', 'Sensor'])}
              {renderDropdown('Cold Aisle Measurement', coldAisleMeasurement, setColdAisleMeasurement, ['Temperature', 'Humidity', 'Temperature and Humidity'], coldAisle === 'none')}
              {renderDropdown('Cold Aisle Pieces', coldAislePieces, setColdAislePieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), coldAisle === 'none')}

              {renderDropdown('Leakage Contacts', leakageContacts, setLeakageContacts, ['none', 'Contact'])}
              {renderDropdown('Leakage Contacts Pieces', leakageContactsPieces, setLeakageContactsPieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), leakageContacts === 'none')}

              {renderDropdown('Seismic Contacts', seismicContacts, setSeismicContacts, ['none', 'Contact'])}
              {renderDropdown('Seismic Contacts Pieces', seismicContactsPieces, setSeismicContactsPieces, Array.from({ length: 16 }, (_, i) => String(i + 1)), seismicContacts === 'none')}

              {renderDropdown('Fire Safety Contacts', fireSafetyContacts, setFireSafetyContacts, ['none', 'only Viewing', 'Viewing and Control'])}

              {renderDropdown('PDU Integration', pduIntegration, setPduIntegration, ['none', 'Integration'])}
              {renderDropdown('PDU Protocol Integration', pduProtocolIntegration, setPduProtocolIntegration, ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], pduIntegration === 'none')}

              <TextField
                label="PDU Integration Points"
                value={pduIntegrationPoints}
                onChange={(e) => setPduIntegrationPoints(e.target.value)}
                fullWidth
                disabled={pduIntegration === 'none'}
                variant="outlined"
                InputLabelProps={{ sx: labelStyles }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: pduIntegration === 'none' ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: pduIntegration === 'none' ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: pduIntegration === 'none' ? '#888' : '#ECEFF1' },
                    ...(pduIntegration === 'none' ? { WebkitTextFillColor: '#888', color: '#888' } : {}),
                  },
                }}
              />

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveDataCenter}>
                Send to Table
              </PrimaryButton>

              <PrimaryButton
  sx={{ width: '100%' }}
  onClick={handleAddPool}
  disabled={tableRows.length === 0}
>
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
            {projectCode ? `${projectCode} Output Table` : 'Data Center Output Table'}
          </Typography>

          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%' }} />

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
                    <th
                      key={i}
                      style={{
                        border: '1px solid #e0e0e0',
                        padding: '10px',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        textAlign: 'left',
                      }}
                    >
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
                      cursor: 'default',
                    }}
                  >
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.projectCode}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.description}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.location}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.point}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.ai}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.ao}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.di}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.do}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.modbusRtu}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.modbusTcp}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.bacnetMstp}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.bacnetIp}
                    </td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px', fontSize: '0.82rem', color: '#424242' }}>
                      {row.mbus}
                    </td>
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
          },
        }}
      />
    </Box>
  );
}
