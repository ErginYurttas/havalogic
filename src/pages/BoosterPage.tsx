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

export default function BoosterPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [boosterControlType, setBoosterControlType] = useState('');

  const [boosterVfdIntegration, setBoosterVfdIntegration] = useState('');
  const [boosterVfdProtocolIntegration, setBoosterVfdProtocolIntegration] = useState('');
  const [boosterVfdIntegrationPoints, setBoosterVfdIntegrationPoints] = useState('');

  const [boosterPieces, setBoosterPieces] = useState('');
  const [boosterPower, setBoosterPower] = useState('');
  const [boosterVoltage, setBoosterVoltage] = useState('');

  const [boosterMaintenanceContacts, setBoosterMaintenanceContacts] = useState('');
  const [boosterEmergencyContacts, setBoosterEmergencyContacts] = useState('');
  const [boosterHighPressureContacts, setBoosterHighPressureContacts] = useState('');

  const [boosterPressureMeasurement, setBoosterPressureMeasurement] = useState('');

  const [boosterIntegration, setBoosterIntegration] = useState('');
  const [boosterProtocolIntegration, setBoosterProtocolIntegration] = useState('');
  const [boosterIntegrationPoints, setBoosterIntegrationPoints] = useState('');




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

  const handleSaveBooster = () => {
  const code = projectCode;
  const desc = description;
  const loc  = location;


  const controlRows: any[] = [];

  if (boosterControlType) {
    const pcs = parseInt(boosterPieces || '1', 10);
    const multi = pcs > 1;


    let basePoints: Array<{ point: string; ai: number; ao: number; di: number; do: number }> = [];

    if (boosterControlType === 'MCC with VFD') {
      basePoints = [
        { point: 'Booster Frequency Inverter Status',              ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Booster Frequency Inverter Fault',               ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Booster Frequency Inverter Auto/Manual',         ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Booster Frequency Inverter Command',             ai: 0, ao: 0, di: 0, do: 1 },
        { point: 'Booster Frequency Inverter Proportional Control',ai: 1, ao: 0, di: 0, do: 0 },
        { point: 'Booster Frequency Inverter Feedback',            ai: 0, ao: 1, di: 0, do: 0 },
      ];
    } else if (boosterControlType === 'own Panel') {
      basePoints = [
        { point: 'Booster own Panel Status',  ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Booster own Panel Fault',   ai: 0, ao: 0, di: 1, do: 0 },
        { point: 'Booster own Panel Command', ai: 0, ao: 0, di: 0, do: 1 },
      ];
    }


    if (basePoints.length > 0) {
      if (!multi) {
        basePoints.forEach(bp => {
          controlRows.push({
            projectCode: code,
            description: desc,
            location: loc,
            point: bp.point,
            ai: bp.ai, ao: bp.ao, di: bp.di, do: bp.do,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
          });
        });
      } else {
        for (let i = 1; i <= pcs; i++) {
          basePoints.forEach(bp => {
            controlRows.push({
              projectCode: code,
              description: desc,
              location: loc,
              point: `${bp.point} ${i}`,
              ai: bp.ai, ao: bp.ao, di: bp.di, do: bp.do,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            });
          });
        }
      }
    }
  }


  const pcs = parseInt(boosterPieces || '1', 10);
  const multi = pcs > 1;

  // Maintenance
  const maintenanceRows: any[] = [];
  if (boosterMaintenanceContacts === 'Each Booster') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      maintenanceRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Booster Maintenance Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (boosterMaintenanceContacts === 'All Boosters') {
    maintenanceRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Booster General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // Emergency
  const emergencyRows: any[] = [];
  if (boosterEmergencyContacts === 'Each Booster') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      emergencyRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Booster Emergency Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (boosterEmergencyContacts === 'All Boosters') {
    emergencyRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Booster General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

  // High Pressure
  const highPressureRows: any[] = [];
  if (boosterHighPressureContacts === 'Each Booster') {
    for (let i = 1; i <= pcs; i++) {
      const sfx = multi ? ` ${i}` : '';
      highPressureRows.push({
        projectCode: code, description: desc, location: loc,
        point: `Booster High Pressure Status${sfx}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  } else if (boosterHighPressureContacts === 'All Boosters') {
    highPressureRows.push({
      projectCode: code, description: desc, location: loc,
      point: 'Booster General High Pressure Status',
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

const pressureMeasurementRows: any[] = [];

if (boosterPressureMeasurement === 'Supply Line Pressure') {
  pressureMeasurementRows.push({
    point: 'Supply Line Pressure',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });

} else if (boosterPressureMeasurement === 'Return Line Pressure') {
  pressureMeasurementRows.push({
    point: 'Return Line Pressure',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });

} else if (boosterPressureMeasurement === 'Supply and Return Line Pressure') {
  pressureMeasurementRows.push(
    {
      point: 'Supply Line Pressure',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Line Pressure',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );

} else if (boosterPressureMeasurement === 'Differential Pressure') {
  pressureMeasurementRows.push({
    point: 'Differential Pressure',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });

}



  setTableRows([
    ...controlRows,
    ...maintenanceRows,
    ...emergencyRows,
    ...highPressureRows,
    ...pressureMeasurementRows
    // ...integrationRows,
    // ...vfdIntegrationRows,
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Booster System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Booster Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Booster Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Booster Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />

              {renderDropdown('Booster Control Type', boosterControlType, (e) => setBoosterControlType(e.target.value), ['MCC with VFD', 'own Panel'])}
              
              {renderDropdown('Booster VFD Integration',  boosterVfdIntegration,  (e) => setBoosterVfdIntegration(e.target.value),  ['none', 'VFD'])}
              {renderDropdown('Booster VFD Protocol Integration',  boosterVfdProtocolIntegration,  (e) => setBoosterVfdProtocolIntegration(e.target.value),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  boosterVfdIntegration === 'none')}

<TextField
  label="Booster VFD Integration Points"
  value={boosterVfdIntegrationPoints}
  onChange={(e) => setBoosterVfdIntegrationPoints(e.target.value)}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: boosterVfdIntegration === 'none' ? '#555' : '#B0BEC5'
    }
  }}
  disabled={boosterVfdIntegration === 'none'}
  InputProps={{
    style: {
      color: boosterVfdIntegration === 'none' ? '#888' : 'white',
      backgroundColor: boosterVfdIntegration === 'none' ? '#1e1e1e' : 'transparent'
    }
  }}
/>

              
              
              
              {renderDropdown('Booster Pieces', boosterPieces, (e) => setBoosterPieces(e.target.value), ['1','2','3','4','5','6','7','8'])}
              {renderDropdown('Booster Power', boosterPower, (e) => setBoosterPower(e.target.value), ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'])}
              {renderDropdown('Booster Voltage', boosterVoltage, (e) => setBoosterVoltage(e.target.value), ['230','380'])}

              {renderDropdown('Booster Maintenance Contacts',  boosterMaintenanceContacts,  (e) => setBoosterMaintenanceContacts(e.target.value),  ['none', 'Each Booster', 'All Boosters'])}
              {renderDropdown('Booster Emergency Contacts',  boosterEmergencyContacts,  (e) => setBoosterEmergencyContacts(e.target.value),  ['none', 'Each Booster', 'All Boosters'])}
              {renderDropdown('Booster High Pressure Contacts',  boosterHighPressureContacts,  (e) => setBoosterHighPressureContacts(e.target.value),  ['none', 'Each Booster', 'All Boosters'])}

              {renderDropdown('Pressure Measurement',  boosterPressureMeasurement,  (e) => setBoosterPressureMeasurement(e.target.value),  ['none', 'Supply Line Pressure', 'Return Line Pressure', 'Supply and Return Line Pressure', 'Differential Pressure'])}

              {renderDropdown('Booster Integration',  boosterIntegration,  (e) => setBoosterIntegration(e.target.value),  ['none', 'own Panel'])}
              {renderDropdown('Booster Protocol Integration',  boosterProtocolIntegration,  (e) => setBoosterProtocolIntegration(e.target.value),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  boosterIntegration === 'none')}

              <TextField
              label="Booster Integration Points"
              value={boosterIntegrationPoints}
              onChange={(e) => setBoosterIntegrationPoints(e.target.value)}
              fullWidth
              sx={{
              '& .MuiOutlinedInput-notchedOutline': {
              borderColor: boosterIntegration === 'none' ? '#555' : '#B0BEC5'
              }
              }}
              disabled={boosterIntegration === 'none'}
              InputProps={{
              style: {
              color: boosterIntegration === 'none' ? '#888' : 'white',
              backgroundColor: boosterIntegration === 'none' ? '#1e1e1e' : 'transparent'
                }
              }}
              />


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveBooster}>Send to Table</PrimaryButton>
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
