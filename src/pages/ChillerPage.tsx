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

export default function ChillerPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);


  const [chillerControlType, setChillerControlType] = useState('');
  const [chillerPieces, setChillerPieces] = useState('');
  const [chillerPower, setChillerPower] = useState('');
  const [chillerVoltage, setChillerVoltage] = useState('');

  const [chillerMaintenanceContacts, setChillerMaintenanceContacts] = useState('');
  const [chillerEmergencyContacts, setChillerEmergencyContacts] = useState('');
  const [chillerFlowContacts, setChillerFlowContacts] = useState('');

  const [chillerTemperatureMeasurement, setChillerTemperatureMeasurement] = useState('');

  const [chillerIntegration, setChillerIntegration] = useState('');
  const [chillerProtocolIntegration, setChillerProtocolIntegration] = useState('');
  const [chillerIntegrationPoints, setChillerIntegrationPoints] = useState('');



  const renderDropdown = (
  label: string,
  value: string,
  onChange: (e: SelectChangeEvent) => void,
  options: string[],
  disabled: boolean = false
) => (
  <FormControl fullWidth sx={{ mt: 2 }} disabled={disabled}>
    <InputLabel sx={labelStyles}>{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
);


  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

useEffect(() => {
  if (chillerIntegration === 'none') {
    setChillerProtocolIntegration('');
    setChillerIntegrationPoints('');
  }
}, [chillerIntegration]);

  const handleSaveChiller = () => {
  const code = projectCode;
  const desc = description;
  const loc  = location;

  // ---------- CONTROL ROWS ----------
  const controlRows: any[] = [];
  if (chillerControlType) {
    const pcs = parseInt(chillerPieces || '1', 10);
    const multi = pcs > 1;

    let basePoints: Array<{ point: string; ai: number; ao: number; di: number; do: number }> = [];

    if (chillerControlType === 'Local') {
      basePoints = [
        { point: 'Chiller Status',  ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Chiller Fault',   ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Chiller Command', ai: 0, ao: 0, di: 0, do: 1 },
      ];
    } else if (chillerControlType === 'own Panel' || chillerControlType === 'own panel') {
      basePoints = [
        { point: 'Chiller Panel Status',  ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Chiller Panel Fault',   ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Chiller Panel Command', ai: 0, ao: 0, di: 0, do: 1 },
      ];
    }

    if (basePoints.length > 0) {
      if (!multi) {
        basePoints.forEach(bp => controlRows.push({
          projectCode: code, description: desc, location: loc,
          point: bp.point, ai: bp.ai, ao: bp.ao, di: bp.di, do: bp.do,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
        }));
      } else {
        for (let i = 1; i <= pcs; i++) {
          basePoints.forEach(bp => controlRows.push({
            projectCode: code, description: desc, location: loc,
            point: `${bp.point} ${i}`, ai: bp.ai, ao: bp.ao, di: bp.di, do: bp.do,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
          }));
        }
      }
    }
  }

  const pcs = parseInt(chillerPieces || '1', 10);
  const multi = pcs > 1;

  // ---------- MAINTENANCE ----------
  const maintenanceRows: any[] = [];
  if (chillerMaintenanceContacts === 'Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      maintenanceRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Chiller Maintenance Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (chillerMaintenanceContacts === 'All Chiller') {
    maintenanceRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Chiller General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // ---------- EMERGENCY ----------
  const emergencyRows: any[] = [];
  if (chillerEmergencyContacts === 'Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      emergencyRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Chiller Emergency Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (chillerEmergencyContacts === 'All Chiller') {
    emergencyRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Chiller General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // ---------- FLOW CONTACTS ----------
  const flowRows: any[] = [];
  if (chillerFlowContacts === 'Each Chiller') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      flowRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Chiller Flow Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (chillerFlowContacts === 'All Chiller') {
    flowRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Chiller General Flow Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // ---------- TEMPERATURE MEASUREMENT ----------
  const temperatureRows: any[] = [];
  if (chillerTemperatureMeasurement === 'Primer Side Temperature') {
    temperatureRows.push(
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Primer Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Primer Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  } else if (chillerTemperatureMeasurement === 'Seconder Side Temperature') {
    temperatureRows.push(
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Seconder Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Seconder Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  } else if (chillerTemperatureMeasurement === 'Primer and Seconder Side Temperature') {
    temperatureRows.push(
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Primer Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Primer Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Seconder Side Inlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      },
      {
        projectCode: code, description: desc, location: loc,
        point: 'Chiller Seconder Side Outlet Temperature',
        ai: 1, ao: 0, di: 0, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      }
    );
  }

  // ---------- PANEL INTEGRATION (own Panel) ----------
  const integrationRows: any[] = [];
  if (chillerIntegration === 'own Panel') {
    const pointsValue = Number(chillerIntegrationPoints) || 0;

    const integrationRow: any = {
      projectCode: code, description: desc, location: loc,
      point: 'Chiller Panel Integration Points',
      ai: 0, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    };

    switch (chillerProtocolIntegration) {
      case 'Modbus RTU':    integrationRow.modbusRtu  = pointsValue; break;
      case 'Modbus TCP IP': integrationRow.modbusTcp  = pointsValue; break;
      case 'Bacnet MSTP':   integrationRow.bacnetMstp = pointsValue; break;
      case 'Bacnet IP':     integrationRow.bacnetIp   = pointsValue; break;
    }

    integrationRows.push(integrationRow);
  }

  // ---------- SET TABLE ----------
  setTableRows([
    ...controlRows,
    ...maintenanceRows,
    ...emergencyRows,
    ...flowRows,
    ...temperatureRows,
    ...integrationRows,
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Chiller System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />

              {renderDropdown("Control Type",  chillerControlType,  (e) => setChillerControlType(e.target.value),  ["own Panel", "Local"])}
              {renderDropdown("Pieces",  chillerPieces,  (e) => setChillerPieces(e.target.value),  ["1", "2", "3", "4", "5", "6", "7", "8"])}
              {renderDropdown("Power",  chillerPower,  (e) => setChillerPower(e.target.value),  [    "0.55", "0.75", "1.1", "1.5", "2.2", "3", "4", "5.5", "7.5",    "9.2", "11", "15", "18.5", "22", "30", "37", "45", "55",    "75", "90", "110", "132", "160"  ])}
              {renderDropdown("Voltage",  chillerVoltage,  (e) => setChillerVoltage(e.target.value),  ["230", "380"])}

              {renderDropdown('Maintenance Safety Contacts',  chillerMaintenanceContacts,  (e) => setChillerMaintenanceContacts(e.target.value),  ['none', 'Each Chiller', 'All Chiller'])}
              {renderDropdown('Emergency Safety Contacts',  chillerEmergencyContacts,  (e) => setChillerEmergencyContacts(e.target.value),  ['none', 'Each Chiller', 'All Chiller'])}
              {renderDropdown('Flow Safety Contacts',  chillerFlowContacts,  (e) => setChillerFlowContacts(e.target.value),  ['none', 'Each Chiller', 'All Chiller'])}

              {renderDropdown('Temperature Measurement',  chillerTemperatureMeasurement,  (e) => setChillerTemperatureMeasurement(e.target.value),  ['none', 'Primer Side Temperature', 'Seconder Side Temperature', 'Primer and Seconder Side Temperature'])}

{renderDropdown('Chiller Integration',  chillerIntegration,  (e) => setChillerIntegration(e.target.value),  ['none', 'own Panel'])}
{renderDropdown('Chiller Protocol Integration',  chillerProtocolIntegration,  (e) => setChillerProtocolIntegration(e.target.value),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  chillerIntegration === 'none')}

<TextField
  label="Chiller Integration Points"
  value={chillerIntegrationPoints}
  onChange={(e) => setChillerIntegrationPoints(e.target.value)}
  fullWidth
  disabled={chillerIntegration === 'none'}
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: chillerIntegration === 'none' ? '#555' : '#B0BEC5'
    }
  }}
  InputProps={{
    style: {
      color: chillerIntegration === 'none' ? '#888' : 'white',
      backgroundColor: chillerIntegration === 'none' ? '#1e1e1e' : 'transparent'
    }
  }}
/>


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveChiller}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Chiller Output Table'}
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
