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




export default function AirCurtainPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [airCurtainControlType, setAirCurtainControlType] = useState('');
  const [airCurtainControlHardPoints, setAirCurtainControlHardPoints] = useState('');

  const [airCurtainPieces, setAirCurtainPieces] = useState('');
  const [airCurtainPower, setAirCurtainPower] = useState('');
  const [airCurtainVoltage, setAirCurtainVoltage] = useState('');

  const [heatingFunction, setHeatingFunction] = useState('');
  const [heatingPower, setHeatingPower] = useState('');
  const [heatingVoltage, setHeatingVoltage] = useState('');


  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [doorSafety, setDoorSafety] = useState('');
  const [roomSensor, setRoomSensor] = useState('');

  const [airCurtainIntegration, setAirCurtainIntegration] = useState('');
  const [airCurtainProtocolIntegration, setAirCurtainProtocolIntegration] = useState('');
  const [airCurtainIntegrationPoints, setAirCurtainIntegrationPoints] = useState('');

  const [airCurtainThermostatIntegration, setAirCurtainThermostatIntegration] = useState('');
  const [airCurtainThermostatProtocol, setAirCurtainThermostatProtocol] = useState('');
  const [airCurtainThermostatIntegrationPoints, setAirCurtainThermostatIntegrationPoints] = useState('');


useEffect(() => {
  if (airCurtainControlType === 'with DDC') {
    setAirCurtainThermostatIntegration('');
    setAirCurtainThermostatProtocol('');
    setAirCurtainThermostatIntegrationPoints('');
  }
}, [airCurtainControlType]);

useEffect(() => {
  if (airCurtainControlType === 'Thermostat') {
    setAirCurtainControlHardPoints('');
    setAirCurtainPieces('');
    setAirCurtainPower('');
    setAirCurtainVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setDoorSafety('');
    setHeatingFunction('');
    setHeatingPower('');
    setHeatingVoltage('');
    setRoomSensor('');
    setAirCurtainIntegration('');
    setAirCurtainProtocolIntegration('');
    setAirCurtainIntegrationPoints('');
  }
}, [airCurtainControlType]);

React.useEffect(() => {
  if (airCurtainIntegration === 'none') {
    setAirCurtainProtocolIntegration('');
    setAirCurtainIntegrationPoints('');
  }
}, [airCurtainIntegration]);

useEffect(() => {
  const valveFunctions = [
    'On/Off Valve Actuator',
    'On/Off Valve Actuator with Feedback',
    'Floating Valve Actuator',
    'Floating Valve Actuator with Feedback',
    'Proportional Valve Actuator',
    'Proportional Valve Actuator with Feedback'
  ];


  // Valf türlerinden biri SEÇİLİRSE veya 'none' seçilirse ➜ ikisini de temizle
  const shouldClear = valveFunctions.includes(heatingFunction) || heatingFunction === 'none';

  if (shouldClear) {
    setHeatingPower('');
    setHeatingVoltage('');
  }
}, [heatingFunction]);

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



  
  
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/projects');
  };

 const handleSaveAirCurtain = () => {
  const pieces = parseInt(airCurtainPieces) || 1;
  const isMultiple = pieces > 1;
  const airCurtainControlRows: any[] = [];
  const maintenanceRows: any[] = [];
  const emergencyRows: any[] = [];
  const doorRows: any[] = [];
  const roomSensorRows: any[] = [];
  const integrationRows: any[] = [];
  const controlHardPointRows: any[] = [];
  const thermostatIntegrationRows: any[] = [];


  if (airCurtainControlType === 'with DDC') {
  const count = parseInt(airCurtainPieces) || 1;

  if (airCurtainControlHardPoints === 'Statuses' || airCurtainControlHardPoints === 'Statuses and Command') {
    for (let i = 1; i <= count; i++) {
      const suffix = count > 1 ? ` ${i}` : '';
      controlHardPointRows.push({
        projectCode, description, location,
        point: `Air Curtain Running${suffix}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
      controlHardPointRows.push({
        projectCode, description, location,
        point: `Air Curtain Fault${suffix}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

  if (airCurtainControlHardPoints === 'Command' || airCurtainControlHardPoints === 'Statuses and Command') {
    for (let i = 1; i <= count; i++) {
      const suffix = count > 1 ? ` ${i}` : '';
      controlHardPointRows.push({
        projectCode, description, location,
        point: `Air Curtain Command${suffix}`,
        ai: 0, ao: 0, di: 0, do: 1,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}


if (maintenanceSafety === 'for Each Curtain') {
  const isMultiple = pieces > 1;
  for (let i = 1; i <= pieces; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    maintenanceRows.push({
      projectCode, description, location,
      point: `Air Curtain Maintenance Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (maintenanceSafety === 'for All Curtains') {
  maintenanceRows.push({
    projectCode, description, location,
    point: 'Air Curtains Group Maintenance Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}


  if (emergencySafety === 'for Each Curtain') {
  const isMultiple = pieces > 1;
  for (let i = 1; i <= pieces; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    emergencyRows.push({
      projectCode, description, location,
      point: `Air Curtain Emergency Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (emergencySafety === 'for All Curtains') {
  emergencyRows.push({
    projectCode, description, location,
    point: 'Air Curtains Group Emergency Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (doorSafety === 'for Each Curtain') {
  const isMultiple = pieces > 1;
  for (let i = 1; i <= pieces; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    doorRows.push({
      projectCode, description, location,
      point: `Air Curtain Door Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (doorSafety === 'for All Curtains') {
  doorRows.push({
    projectCode, description, location,
    point: 'Air Curtains Group Door Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

  
const heatingRows: any[] = [];

if (heatingFunction === 'On/Off Valve Actuator') {
  heatingRows.push(
    {
      point: 'Heating Valve Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
     
  );
}

if (heatingFunction === 'On/Off Valve Actuator with Feedback') {
  heatingRows.push(
    {
      point: 'Heating Valve Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    
    {
      point: 'Heating Valve Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    
  );
}

if (heatingFunction === 'Floating Valve Actuator') {
  heatingRows.push(
   {
      point: 'Heating Valve Open Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Valve Close Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    
  );
}

if (heatingFunction === 'Floating Valve Actuator with Feedback') {
  heatingRows.push(
    {
      point: 'Heating Valve Open Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Valve Close Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Valve Open Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Valve Close Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (heatingFunction === 'Proportional Valve Actuator') {
  heatingRows.push({
    point: 'Heating Valve Proportional Command',
    ai: 0, ao: 1, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (heatingFunction === 'Proportional Valve Actuator with Feedback') {
  heatingRows.push(
    {
      point: 'Heating Valve Proportional Command',
      ai: 0, ao: 1, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Valve Proportional Feedback',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (heatingFunction === '1-Staged Electrical Heater') {
  heatingRows.push(
    { point: 'Heating Electrical Heater Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }

  );
}

if (heatingFunction === '2-Staged Electrical Heater') {
  heatingRows.push(
    { point: 'Heating Electrical Heater-1 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-1 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-1 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (heatingFunction === '3-Staged Electrical Heater') {
  heatingRows.push(
    { point: 'Heating Electrical Heater-1 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-1 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-1 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-2 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-3 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-3 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater-3 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (heatingFunction === 'Proportional Electrical Heater') {
  heatingRows.push(
    { point: 'Heating Proportional Electrical Heater Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Proportional Electrical Heater Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Proportional Electrical Heater Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Proportional Electrical Heater Proportional Control', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Heating Proportional Electrical Heater Feedback', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}



  if (roomSensor === 'Temperature') {
    roomSensorRows.push({
      projectCode, description, location,
      point: 'Room Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  } else if (roomSensor === 'Temperature and Humidity') {
    roomSensorRows.push({
      projectCode, description, location,
      point: 'Room Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
    roomSensorRows.push({
      projectCode, description, location,
      point: 'Room Humidity',
      ai: 1, ao: 0, di: 0, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

if (
  airCurtainIntegration === 'own Panel' &&
  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(airCurtainProtocolIntegration) &&
  airCurtainIntegrationPoints.trim() !== '' &&
  !isNaN(Number(airCurtainIntegrationPoints))
) {
  const pointValue = Number(airCurtainIntegrationPoints);

  const row: any = {
    projectCode,
    description,
    location,
    point: 'Air Curtain own Panel Integration Points',
    ai: 0,
    ao: 0,
    di: 0,
    do: 0,
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0,
    mbus: 0
  };

  switch (airCurtainProtocolIntegration) {
    case 'Modbus RTU':
      row.modbusRtu = pointValue;
      break;
    case 'Modbus TCP IP':
      row.modbusTcp = pointValue;
      break;
    case 'Bacnet MSTP':
      row.bacnetMstp = pointValue;
      break;
    case 'Bacnet IP':
      row.bacnetIp = pointValue;
      break;
    default:
      break;
  }

  integrationRows.push(row);
}

if (
  airCurtainThermostatIntegration === 'Thermostat' &&
  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(airCurtainThermostatProtocol) &&
  airCurtainThermostatIntegrationPoints.trim() !== ''
) {
  const protocolColumnMap: any = {
    'Modbus RTU': 'modbusRtu',
    'Modbus TCP IP': 'modbusTcp',
    'Bacnet MSTP': 'bacnetMstp',
    'Bacnet IP': 'bacnetIp'
  };

  const row: any = {
    projectCode,
    description,
    location,
    point: 'Air Curtain Thermostat Integration Points',
    ai: 0,
    ao: 0,
    di: 0,
    do: 0,
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0,
    mbus: 0
  };

  const selectedColumn = protocolColumnMap[airCurtainThermostatProtocol];
  row[selectedColumn] = parseInt(airCurtainThermostatIntegrationPoints) || 0;

  thermostatIntegrationRows.push(row);
}


  setTableRows([
    ...airCurtainControlRows,
    ...controlHardPointRows,
    ...maintenanceRows,
    ...emergencyRows,
    ...doorRows,
    ...heatingRows,
    ...roomSensorRows,
    ...integrationRows,
    ...thermostatIntegrationRows
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Air Curtain System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="Air Curtain Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Air Curtain Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="Air Curtain Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />

{renderDropdown('Air Curtain Control Type', airCurtainControlType, (e) => setAirCurtainControlType(e.target.value), ['with DDC', 'Thermostat'], false)}

{renderDropdown('Air Curtain Thermostat Integration', airCurtainThermostatIntegration, (e: SelectChangeEvent) => setAirCurtainThermostatIntegration(e.target.value), ['none', 'Thermostat'], airCurtainControlType === 'with DDC')}

{renderDropdown('Air Curtain Thermostat Protocol',  airCurtainThermostatProtocol,  (e: SelectChangeEvent) => setAirCurtainThermostatProtocol(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], airCurtainControlType === 'with DDC')}
<TextField
  label="Air Curtain Thermostat Integration Points"
  value={airCurtainThermostatIntegrationPoints}
  onChange={(e) => setAirCurtainThermostatIntegrationPoints(e.target.value)}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: airCurtainThermostatIntegration === 'none' ? '#555' : '#B0BEC5'
    }
  }}
  disabled={airCurtainThermostatIntegration === 'none' || airCurtainControlType === 'with DDC'}
  InputProps={{
    style: {
      color: (airCurtainThermostatIntegration === 'none' || airCurtainControlType === 'with DDC') ? '#888' : 'white',
      backgroundColor: (airCurtainThermostatIntegration === 'none' || airCurtainControlType === 'with DDC') ? '#1e1e1e' : 'transparent'
    }
  }}
/>



{renderDropdown('Air Curtain Control Hard Points', airCurtainControlHardPoints, (e) => setAirCurtainControlHardPoints(e.target.value), ['Statuses', 'Command', 'Statuses and Command'], airCurtainControlType === 'Thermostat')}

{renderDropdown('Air Curtain Pieces', airCurtainPieces, (e) => setAirCurtainPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Air Curtain Power', airCurtainPower, (e) => setAirCurtainPower(e.target.value), [ '0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5','11', '15', '18,5', '22', '30', '37', '45', '55','75', '90', '110', '132', '160'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Air Curtain Voltage', airCurtainVoltage, (e) => setAirCurtainVoltage(e.target.value),['230', '380'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value),['none', 'for Each Curtain', 'for All Curtains'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Curtain', 'for All Curtains'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Door Safety Contacts', doorSafety, (e) => setDoorSafety(e.target.value), ['none', 'for Each Curtain', 'for All Curtains'], airCurtainControlType === 'Thermostat')}

{renderDropdown('Heating Function',heatingFunction,(e) => setHeatingFunction(e.target.value),['none', 'On/Off Valve Actuator', 'On/Off Valve Actuator with Feedback','Floating Valve Actuator', 'Floating Valve Actuator with Feedback','Proportional Valve Actuator','Proportional Valve Actuator with Feedback','1-Staged Electrical Heater','2-Staged Electrical Heater','3-Staged Electrical Heater','Proportional Electrical Heater'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Heating Power', heatingPower, (e) => setHeatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5','11', '15', '18,5', '22', '30', '37', '45', '55','75', '90', '110', '132', '160' ], airCurtainControlType === 'Thermostat' || heatingFunction === 'none' || ['On/Off Valve Actuator','On/Off Valve Actuator with Feedback','Floating Valve Actuator','Floating Valve Actuator with Feedback','Proportional Valve Actuator','Proportional Valve Actuator with Feedback'].includes(heatingFunction))}
{renderDropdown('Heating Voltage', heatingVoltage, (e) => setHeatingVoltage(e.target.value), ['230', '380'],  airCurtainControlType === 'Thermostat' || heatingFunction === 'none' || ['On/Off Valve Actuator','On/Off Valve Actuator with Feedback','Floating Valve Actuator','Floating Valve Actuator with Feedback','Proportional Valve Actuator','Proportional Valve Actuator with Feedback'].includes(heatingFunction))}

{renderDropdown('Room Sensor', roomSensor, (e) => setRoomSensor(e.target.value), ['none', 'Temperature', 'Temperature and Humidity'], airCurtainControlType === 'Thermostat')}

{renderDropdown('Air Curtain Integration', airCurtainIntegration, (e) => setAirCurtainIntegration(e.target.value), ['none', 'own Panel'], airCurtainControlType === 'Thermostat')}
{renderDropdown('Air Curtain Protocol Integration', airCurtainProtocolIntegration, (e) => setAirCurtainProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], airCurtainControlType === 'Thermostat' || airCurtainIntegration === 'none')}

<TextField
  fullWidth
  variant="outlined"
  placeholder="Air Curtain Integration Points"
  value={airCurtainIntegrationPoints}
  onChange={(e) => setAirCurtainIntegrationPoints(e.target.value)}
  disabled={airCurtainControlType === 'Thermostat' || airCurtainIntegration === 'none'}
  InputProps={{
    style: {
      color: (airCurtainControlType === 'Thermostat' || airCurtainIntegration === 'none') ? '#888' : 'white',
      backgroundColor: (airCurtainControlType === 'Thermostat' || airCurtainIntegration === 'none') ? '#1e1e1e' : 'transparent'
    }
  }}
  sx={{
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: (airCurtainControlType === 'Thermostat' || airCurtainIntegration === 'none') ? '#555' : '#B0BEC5'
    }
  }}
/>


              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveAirCurtain}>Send to Table</PrimaryButton>
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
            {projectCode ? `${projectCode} Output Table` : 'Air Curtain Output Table'}
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
