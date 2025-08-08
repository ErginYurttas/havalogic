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
  '.MuiOutlinedInput-notchedOutline': {   borderColor: '#B0BEC5'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {   borderColor: '#90A4AE'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {   borderColor: '#CFD8DC'
  },
  '&.Mui-disabled': { color: '#888',  backgroundColor: '#1e1e1e'
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {  borderColor: '#555'  },
  svg: {
    color: '#90A4AE'  }
};

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': {
    color: '#B0BEC5'
  }
};


export default function PumpPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [pumpControlType, setPumpControlType] = useState('');
  const [pumpControl, setPumpControl] = useState('');


  const [PumpcontrolpackagedprotocolIntegration, setPumpControlPackagedProtocolIntegration] = useState('');
  const [PumpControlPackagedPoints, setPumpControlPackagedPoints] = useState('');
  const [Pumpcontrolpackagedhardpoints, setPumpControlPackagedHardPoints] = useState('');

  const [PumpPieces, setPumpPieces] = useState('');
  const [PumpPower, setPumpPower] = useState('');
  const [PumpVoltage, setPumpVoltage] = useState('');
  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');

  const [temperaturemeasurements, setTemperatureMeasurements] = useState('');

  const [PumpIntegration, setPumpIntegration] = useState('');
  const [PumpprotocolIntegration, setPumpProtocolIntegration] = useState('');
  const [PumpIntegrationPoints, setPumpIntegrationPoints] = useState('');


  const [showTable, setShowTable] = useState(false);
  const [tableRows, setTableRows] = useState<any[]>([]);

  const [isOwnPanel, setIsOwnPanel] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };


  const handleBack = () => {
    navigate('/projects');
  };

React.useEffect(() => {
  if (pumpControlType === 'own Panel') {
    setPumpControl('');
    setPumpPieces('');
    setPumpPower('');
    setPumpVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setTemperatureMeasurements('');
    setPumpIntegration('');
    setPumpProtocolIntegration('');
    setPumpIntegrationPoints('');
    setIsOwnPanel(true);
  } else {
    setIsOwnPanel(false);
  }
}, [pumpControlType]);


React.useEffect(() => {
  if (PumpIntegration === 'none') {
    setPumpProtocolIntegration('');
    setPumpIntegrationPoints('');
  }
}, [PumpIntegration]);

React.useEffect(() => {
  if (pumpControlType === 'MCC') {
    setPumpControlPackagedProtocolIntegration('');
    setPumpControlPackagedPoints('');
    setPumpControlPackagedHardPoints('');
  }
}, [pumpControlType]);

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
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );



const handlePumpControlTypeChange = (event: SelectChangeEvent<string>) => {
  const selectedValue = event.target.value;
  setPumpControlType(selectedValue);

  if (selectedValue === 'own Panel') {
    setPumpControl('');


    setPumpPieces('');
    setPumpPower('');
    setPumpVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setPumpIntegration('');
    setPumpProtocolIntegration('');
    setPumpIntegrationPoints('');
  } else {

  }
};

const handlePumpControlChange = (event: SelectChangeEvent<string>) => {
  setPumpControl(event.target.value);
};


  const handleSavePump = () => {

       setTableRows([]);
    

const PumpControlPackagedRows: any[] = [];

if (
  Pumpcontrolpackagedhardpoints === 'Statuses' ||
  Pumpcontrolpackagedhardpoints === 'Statuses and Command'
) {
  PumpControlPackagedRows.push(
    {
      point: 'Pump own Panel System General Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
      mbus: 0
    },
    {
      point: 'Pump own Panel System General Fault',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
      mbus: 0
    }
  );
}

if (
  Pumpcontrolpackagedhardpoints === 'Command' ||
  Pumpcontrolpackagedhardpoints === 'Statuses and Command'
) {
  PumpControlPackagedRows.push({
    point: 'Pump own Panel System General Command',
    ai: 0, ao: 0, di: 0, do: 1,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
    mbus: 0
  });
}

if (
  PumpcontrolpackagedprotocolIntegration !== '' &&
  PumpControlPackagedPoints !== ''
) {
  const parsedPoints = parseInt(PumpControlPackagedPoints) || 0;

  const protocol = {
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0
  };

  switch (PumpcontrolpackagedprotocolIntegration) {
    case 'Modbus RTU':
      protocol.modbusRtu = parsedPoints;
      break;
    case 'Modbus TCP IP':
      protocol.modbusTcp = parsedPoints;
      break;
    case 'Bacnet MSTP':
      protocol.bacnetMstp = parsedPoints;
      break;
    case 'Bacnet IP':
      protocol.bacnetIp = parsedPoints;
      break;
  }

  PumpControlPackagedRows.push({
    point: 'Pump own Panel System Integration Points',
    ai: 0, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: protocol.modbusRtu,
    modbusTcp: protocol.modbusTcp,
    bacnetMstp: protocol.bacnetMstp,
    bacnetIp: protocol.bacnetIp,
    mbus: 0
  });
}


let Pumprows: any[] = [];
const Pumppieces = Number(PumpPieces);

if (!(pumpControl === 'MCC' && pumpControl && Pumppieces)) {
  Pumprows = [];
} else {}

if (pumpControl === 'DOL' || pumpControl === 'Star-Delta') {
  const dolRows = [
    { point: 'Pump Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    const suffix = Pumppieces > 1 ? ` ${i}` : '';
    dolRows.forEach((row) => {
      Pumprows.push({
  projectCode,
  description,
  location,
  point: `${row.point}${suffix}`,
  ai: row.ai,
  ao: row.ao,
  di: row.di,
  do: row.do,
  modbusRtu: 0,
  modbusTcp: 0,
  bacnetMstp: 0,
  bacnetIp: 0,
  mbus: 0
});
    });
  }
}

if (pumpControl === 'VFD') {
  const vfdRows = [
    { point: 'Pump Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Pump Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Pump Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    const suffix = Pumppieces > 1 ? ` ${i}` : '';
    vfdRows.forEach((row) => {
      Pumprows.push({
        projectCode,
        description,
        location,
        point: `${row.point}${suffix}`,
        ai: row.ai,
        ao: row.ao,
        di: row.di,
        do: row.do,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0
      });
    });
  }
}

if (pumpControl === 'VFD with By Pass Circuit' || pumpControl === 'VFD with By Pass Circuit + Star-Delta') {
  const byPassRows = [
    { point: 'Pump Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump By/Pass Switch', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Pump Frequency Inverter Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Pump Frequency Inverter Feedback', ai: 1, ao: 0, di: 0, do: 0 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    byPassRows.forEach(item => {
      Pumprows.push({
        projectCode,
        description,
        location,
        point: Pumppieces > 1 ? `${item.point} ${i}` : item.point,
        ai: item.ai,
        ao: item.ao,
        di: item.di,
        do: item.do,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0
      });
    });
  }
}

if (pumpControl === 'Power Supply Only') {
  const softStarterRows = [
    { point: 'Pump own Panel Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump own Panel Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump own Panel Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    const suffix = Pumppieces > 1 ? ` ${i}` : '';
    softStarterRows.forEach((row) => {
      Pumprows.push({
  projectCode,
  description,
  location,
  point: `${row.point}${suffix}`,
  ai: row.ai,
  ao: row.ao,
  di: row.di,
  do: row.do,
  modbusRtu: 0,
  modbusTcp: 0,
  bacnetMstp: 0,
  bacnetIp: 0,
  mbus: 0
});
    });
  }
}


if (pumpControl === 'Soft Starter') {
  const softStarterRows = [
    { point: 'Pump Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    const suffix = Pumppieces > 1 ? ` ${i}` : '';
    softStarterRows.forEach((row) => {
      Pumprows.push({
  projectCode,
  description,
  location,
  point: `${row.point}${suffix}`,
  ai: row.ai,
  ao: row.ao,
  di: row.di,
  do: row.do,
  modbusRtu: 0,
  modbusTcp: 0,
  bacnetMstp: 0,
  bacnetIp: 0,
  mbus: 0
});
    });
  }
}

if (pumpControl === 'Soft Starter with By Pass Circuit' || pumpControl === 'Soft Starter with By Pass Circuit + Star-Delta') {
  const softBypassRows = [
    { point: 'Pump Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump By Pass Switch Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Pump Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= Pumppieces; i++) {
    const suffix = Pumppieces > 1 ? ` ${i}` : '';
    softBypassRows.forEach((row) => {
      Pumprows.push({
        projectCode,
        description,
        location,
        point: `${row.point}${suffix}`,
        ai: row.ai,
        ao: row.ao,
        di: row.di,
        do: row.do,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0
      });
    });
  }
}




const maintenanceRows: any[] = [];

if (maintenanceSafety === 'for Each Pump') {
  

  if (pumpControl !== 'none') {
    for (let i = 1; i <= Pumppieces; i++) {
      maintenanceRows.push({
        point: `Pump Maintenance Status${Pumppieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

if (maintenanceSafety === 'for All Pumps') {
  

  if (pumpControl !== 'none') {
    maintenanceRows.push({
      point: 'Pump General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}

const emergencyRows: any[] = [];

if (emergencySafety === 'for Each Pump') {
  

  if (pumpControl !== 'none') {
    for (let i = 1; i <= Pumppieces; i++) {
      emergencyRows.push({
        point: `Pump Emergency Status${Pumppieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

if (emergencySafety === 'for All Pumps') {
  

  if (pumpControl !== 'none') {
    emergencyRows.push({
      point: 'Pump General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}


const TemperatureMeasurementsRows: any[] = [];

if (temperaturemeasurements === 'Supply Temperature') {
  TemperatureMeasurementsRows.push({
    point: 'Supply Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (temperaturemeasurements === 'Return Temperature') {
  TemperatureMeasurementsRows.push({
    point: 'Return Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (temperaturemeasurements === 'Supply and Return Temperature') {
  TemperatureMeasurementsRows.push(
    {
      point: 'Supply Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}





const PumpIntegrationRows: any[] = [];

if (
  PumpIntegration !== 'none' &&
  PumpprotocolIntegration &&
  PumpIntegrationPoints &&
  !isOwnPanel
) {
  const pointName = `Pump General ${PumpIntegration} Integration Points`;

  const protocolValues = {
    'Modbus RTU': { modbusRtu: PumpIntegrationPoints, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0 },
    'Modbus TCP IP': { modbusRtu: 0, modbusTcp: PumpIntegrationPoints, bacnetMstp: 0, bacnetIp: 0 },
    'Bacnet MSTP': { modbusRtu: 0, modbusTcp: 0, bacnetMstp: PumpIntegrationPoints, bacnetIp: 0 },
    'Bacnet IP': { modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: PumpIntegrationPoints },
  };

  const protocol = protocolValues[PumpprotocolIntegration as keyof typeof protocolValues] || {
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0
  };

  PumpIntegrationRows.push({
    point: pointName,
    description,
    location,
    ai: 0,
    ao: 0,
    di: 0,
    do: 0,
    modbusRtu: protocol.modbusRtu,
    modbusTcp: protocol.modbusTcp,
    bacnetMstp: protocol.bacnetMstp,
    bacnetIp: protocol.bacnetIp,
    mbus: 0,
    projectCode
  });
}



setTableRows([]);

setTableRows([

  ...Pumprows,
  ...maintenanceRows,
  ...emergencyRows,
  ...PumpIntegrationRows,
  ...PumpControlPackagedRows,
  ...TemperatureMeasurementsRows
]);


setShowTable(true);
  };


  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1A237E, #000000)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Box sx={{ py: 2, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
  
  {/* Sol taraftaki havalogic logosu */}
  <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
  <Box component="span" sx={{ color: '#1976d2' }}>hava</Box>
  <Box component="span" sx={{ color: '#B0BEC5' }}>logic</Box>
</Typography>

  {/* Sağ taraftaki kullanıcı ve logout */}
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Pump System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Pump Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Pump Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Pump Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              {renderDropdown( 'Pump Control Type', pumpControlType, handlePumpControlTypeChange, ['MCC', 'own Panel'])}
              {renderDropdown( 'Pump Control Protocol Integration', PumpcontrolpackagedprotocolIntegration, (e) => setPumpControlPackagedProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], pumpControlType === 'MCC' )}   

              <TextField
              fullWidth
              variant="outlined"
              placeholder="Pump Control Integration Points"
              value={PumpControlPackagedPoints}
              onChange={(e) => setPumpControlPackagedPoints(e.target.value)}
              disabled={pumpControlType === 'MCC'} 
              InputProps={{
              style: {
              color: pumpControlType === 'MCC' ? '#888' : 'white'
                  }
                }}
              />
              
              {renderDropdown('Pump Control Hard Points',  Pumpcontrolpackagedhardpoints, (e) => setPumpControlPackagedHardPoints(e.target.value), ['none', 'Statuses', 'Command', 'Statuses and Command'], pumpControlType === 'MCC')}

              {renderDropdown('Pump Control', pumpControl, handlePumpControlChange, ['DOL', 'Power Supply Only', 'Soft Starter','Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta' ], isOwnPanel )}
              {renderDropdown('Pump Pieces', PumpPieces, (e) => setPumpPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], pumpControl === 'none'|| isOwnPanel)}
              {renderDropdown('Pump Power', PumpPower, (e) => setPumpPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], pumpControl === 'none'|| isOwnPanel)}
              {renderDropdown('Pump Voltage', PumpVoltage, (e) => setPumpVoltage(e.target.value), ['230', '380'], pumpControl === 'none'|| isOwnPanel)}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Pump', 'for All Pumps'], isOwnPanel)}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Pump', 'for All Pumps'], isOwnPanel)}
             
              {renderDropdown('Temperature Measuremets', temperaturemeasurements, (e) => setTemperatureMeasurements(e.target.value), ['none', 'Supply Temperature', 'Return Temperature', 'Supply and Return Temperature'], isOwnPanel)}


              {renderDropdown('Pump Integration', PumpIntegration, (e) => setPumpIntegration(e.target.value), ['none', 'VFD'], isOwnPanel)}
              {renderDropdown('Pump Protocol Integration', PumpprotocolIntegration, (e) => setPumpProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], PumpIntegration === 'none'|| isOwnPanel)}

            
              <TextField  fullWidth
                          variant="outlined"
                          placeholder="Pump Integration Points"
                          value={PumpIntegrationPoints}
                          onChange={(e) => setPumpIntegrationPoints(e.target.value)}
                          disabled={isOwnPanel}
                          InputProps={{
                          style: {
                          color: isOwnPanel ? '#888' : 'white',
                          backgroundColor: isOwnPanel ? '#1e1e1e' : 'transparent'
                                  }
                            }}
                          sx={{'& .MuiOutlinedInput-notchedOutline': { 
                            borderColor: isOwnPanel ? '#555' : '#B0BEC5'
                                  }
                                }}
                              />

              

              


<PrimaryButton sx={{ width: '100%' }} onClick={handleSavePump}>Send to Table</PrimaryButton>
<PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>Back to Project Overview</PrimaryButton>
</Stack>
</Box>
</Container>

{/* Tablo */}
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
    {projectCode ? `${projectCode} Output Table` : 'Pump Output Table'}
  </Typography>




  <Box
    sx={{
      overflowX: 'auto',
      overflowY: 'auto',
      maxWidth: '100%',
    }}
  ></Box>


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
          color: '#333',
        }}
      >
      <thead>
        <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
          {['Project Code', 'Description', 'Located', 'Point Name', 'AI', 'AO', 'DI', 'DO', 'Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP', 'Mbus'].map((header, i) => (
            <th
              key={i}
              style={{
                border: '1px solid #e0e0e0',
                padding: '10px',
                fontWeight: 500,
                fontSize: '0.85rem',
                textAlign: 'left'
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
              cursor: 'default'
            }}
          >
            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.projectCode}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.description}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.location}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.point}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.ai}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.ao}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.di}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.do}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.modbusRtu}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.modbusTcp}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.bacnetMstp}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.bacnetIp}
            </td>

            <td
              style={{
                border: '1px solid #e0e0e0',
                padding: '8px',
                fontSize: '0.82rem',
                color: '#424242'
              }}
            >
              {row.mbus}
            </td>
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
