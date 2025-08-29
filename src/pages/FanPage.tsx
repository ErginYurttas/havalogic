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


export default function FanPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [fanControl, setFanControl] = useState('');
  const [fancontrolpackagedprotocolIntegration, setFanControlPackagedProtocolIntegration] = useState('');
  const [fanControlPackagedPoints, setFanControlPackagedPoints] = useState('');
  const [fancontrolpackagedhardpoints, setFanControlPackagedHardPoints] = useState('');

  const [aspControl, setAspControl] = useState('');
  const [aspPieces, setAspPieces] = useState('');
  const [aspPower, setAspPower] = useState('');
  const [aspVoltage, setAspVoltage] = useState('');
  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [doorSafety, setDoorSafety] = useState('');
  const [fireSafety, setFireSafety] = useState('');

  const [returnAirSensor, setReturnAirSensor] = useState('');
  const [exhaustAirSensor, setExhaustAirSensor] = useState('');

  const [returnDamperActuator, setReturnDamperActuator] = useState('');
  const [exhaustDamperActuator, setExhaustDamperActuator] = useState('');

  const [returnFilter, setReturnFilter] = useState('');
  const [exhaustFilter, setExhaustFilter] = useState('');

  const [returnFlow, setReturnFlow] = useState('');
  const [runAroundPumpControl, setRunAroundPumpControl] = useState('');
  const [runAroundPumpPieces, setRunAroundPumpPieces] = useState('');
  const [pumpPower, setPumpPower] = useState('');
  const [pumpVoltage, setPumpVoltage] = useState('');
  const [runAroundTemperature, setRunAroundTemperature] = useState('');


  const [fanIntegration, setFanIntegration] = useState('');
  const [fanprotocolIntegration, setFanProtocolIntegration] = useState('');
  const [fanIntegrationPoints, setFanIntegrationPoints] = useState('');

  const [runaroundpumpIntegration, setRunAroundPumpIntegration] = useState('');
  const [runaroundpumpprotocolIntegration, setRunAroundPumpProtocolIntegration] = useState('');
  const [runaroundpumpIntegrationPoints, setRunAroundPumpIntegrationPoints] = useState('');



  const [showTable, setShowTable] = useState(false);
  const [tableRows, setTableRows] = useState<any[]>([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');


  const [isPackaged, setIsPackaged] = useState(false);

  

  const handleLogout = () => {
    navigate('/');
  };


  const handleBack = () => {
    navigate('/projects');
  };

React.useEffect(() => {
  if (fanControl === 'Packaged') {

    setAspControl('');
    setAspPieces('');
    setAspPower('');
    setAspVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setDoorSafety('');
    setFireSafety('');

    setReturnAirSensor('');
    setExhaustAirSensor('');

    setReturnDamperActuator('');
    setExhaustDamperActuator('');

    setReturnFilter('');
    setExhaustFilter('');

    setReturnFlow('');
    setRunAroundPumpControl('');
    setRunAroundPumpPieces('');
    setPumpPower('');
    setPumpVoltage('');
    setRunAroundTemperature('');

    setFanIntegration('');
    setFanProtocolIntegration('');
    setFanIntegrationPoints('');
    setRunAroundPumpIntegration('');
    setRunAroundPumpProtocolIntegration('');
    setRunAroundPumpIntegrationPoints('');

  }
}, [fanControl]);




  





React.useEffect(() => {
  if (runAroundPumpControl === 'none') {
    setRunAroundPumpPieces('');
    setPumpPower('');
    setPumpVoltage('');
    setRunAroundTemperature('');
  }
}, [runAroundPumpControl]);

  


React.useEffect(() => {
  if (fanIntegration === 'none') {
    setFanProtocolIntegration('');
    setFanIntegrationPoints('');
  }
}, [fanIntegration]);


React.useEffect(() => {
  if (runaroundpumpIntegration === 'none') {
    setRunAroundPumpProtocolIntegration('');
    setRunAroundPumpIntegrationPoints('');
  }
}, [runaroundpumpIntegration]);




React.useEffect(() => {
  if (fanControl === 'MCC') {
    setFanControlPackagedProtocolIntegration('');
    setFanControlPackagedHardPoints('');
    setFanControlPackagedPoints('');
  }
}, [fanControl]);

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

const handleAspControlChange = (e: SelectChangeEvent) => {

  
  const value = e.target.value;
  setAspControl(value);

  if (value === 'none') {
    setAspPieces('');
    setAspPower('');
    setAspVoltage('');
  }
};







const handleFanControlChange = (event: SelectChangeEvent<string>) => {
  const selectedValue = event.target.value;
  setFanControl(selectedValue);

  const packagedSelected = selectedValue === "Packaged";
  setIsPackaged(packagedSelected);

  if (packagedSelected) {

    setAspControl('');
    setAspPieces('');
    setAspPower('');
    setAspVoltage('');
    setMaintenanceSafety('');
    setEmergencySafety('');
    setDoorSafety('');
    setFireSafety('');

    setReturnAirSensor('');
    setExhaustAirSensor('');

    setReturnDamperActuator('');
    setExhaustDamperActuator('');

    setReturnFilter('');
    setExhaustFilter('');

    setReturnFlow('');
    setRunAroundPumpControl('');
    setRunAroundPumpPieces('');
    setPumpPower('');
    setPumpVoltage('');
    setRunAroundTemperature('');

    setFanIntegration('');
    setFanProtocolIntegration('');
    setFanIntegrationPoints('');
    setRunAroundPumpIntegration('');
    setRunAroundPumpProtocolIntegration('');
    setRunAroundPumpIntegrationPoints('');

  }
};



  const handleSaveFan = () => {

       setTableRows([]);
    

const fanControlPackagedRows: any[] = [];

if (
  fancontrolpackagedhardpoints === 'Statuses' ||
  fancontrolpackagedhardpoints === 'Statuses and Command'
) {
  fanControlPackagedRows.push(
    {
      point: 'Fan Packaged System General Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
      mbus: 0
    },
    {
      point: 'Fan Packaged System General Fault',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
      mbus: 0
    }
  );
}

if (
  fancontrolpackagedhardpoints === 'Command' ||
  fancontrolpackagedhardpoints === 'Statuses and Command'
) {
  fanControlPackagedRows.push({
    point: 'Fan Packaged System General Command',
    ai: 0, ao: 0, di: 0, do: 1,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0,
    mbus: 0
  });
}

if (
  fancontrolpackagedprotocolIntegration !== '' &&
  fanControlPackagedPoints !== ''
) {
  const parsedPoints = parseInt(fanControlPackagedPoints) || 0;

  const protocol = {
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0
  };

  switch (fancontrolpackagedprotocolIntegration) {
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

  fanControlPackagedRows.push({
    point: 'Fan Packaged System Integration Points',
    ai: 0, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: protocol.modbusRtu,
    modbusTcp: protocol.modbusTcp,
    bacnetMstp: protocol.bacnetMstp,
    bacnetIp: protocol.bacnetIp,
    mbus: 0
  });
}


let asprows: any[] = [];
const asppieces = Number(aspPieces);

if (!(fanControl === 'MCC' && aspControl && asppieces)) {
  asprows = [];
} else {}

if (aspControl === 'DOL' || aspControl === 'Star-Delta') {
  const dolRows = [
    { point: 'Aspirator Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    const suffix = asppieces > 1 ? ` ${i}` : '';
    dolRows.forEach((row) => {
      asprows.push({
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

if (aspControl === 'VFD') {
  const vfdRows = [
    { point: 'Aspirator Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Aspirator Fan Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    const suffix = asppieces > 1 ? ` ${i}` : '';
    vfdRows.forEach((row) => {
      asprows.push({
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

if (aspControl === 'VFD with By Pass Circuit' || aspControl === 'VFD with By Pass Circuit + Star-Delta') {
  const byPassRows = [
    { point: 'Aspirator Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan By/Pass Switch', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Aspirator Fan Frequency Inverter Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Aspirator Fan Frequency Inverter Feedback', ai: 1, ao: 0, di: 0, do: 0 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    byPassRows.forEach(item => {
      asprows.push({
        projectCode,
        description,
        location,
        point: asppieces > 1 ? `${item.point} ${i}` : item.point,
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

if (aspControl === 'Soft Starter') {
  const softStarterRows = [
    { point: 'Aspirator Soft Starter Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Soft Starter Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Soft Starter Fan Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Soft Starter Fan Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    const suffix = asppieces > 1 ? ` ${i}` : '';
    softStarterRows.forEach((row) => {
      asprows.push({
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

if (aspControl === 'Soft Starter with By Pass Circuit' || aspControl === 'Soft Starter with By Pass Circuit + Star-Delta') {
  const softBypassRows = [
    { point: 'Aspirator Fan Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan By Pass Switch Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    const suffix = asppieces > 1 ? ` ${i}` : '';
    softBypassRows.forEach((row) => {
      asprows.push({
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



if (aspControl === 'EC') {
  const ecRows = [
    { point: 'Aspirator EC Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator EC Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Aspirator EC Fan Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Aspirator EC Fan Feedback', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Aspirator EC Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= asppieces; i++) {
    const suffix = asppieces > 1 ? ` ${i}` : '';
    ecRows.forEach((row) => {
      asprows.push({
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

if (maintenanceSafety === 'for Each Fan') {
  

  if (aspControl !== 'none') {
    for (let i = 1; i <= asppieces; i++) {
      maintenanceRows.push({
        point: `Aspirator Fan Maintenance Status${asppieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

if (maintenanceSafety === 'for All Fans') {
  

  if (aspControl !== 'none') {
    maintenanceRows.push({
      point: 'Aspirator General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}

const emergencyRows: any[] = [];

if (emergencySafety === 'for Each Fan') {
  

  if (aspControl !== 'none') {
    for (let i = 1; i <= asppieces; i++) {
      emergencyRows.push({
        point: `Aspirator Fan Emergency Status${asppieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

if (emergencySafety === 'for All Fans') {
  

  if (aspControl !== 'none') {
    emergencyRows.push({
      point: 'Aspirator General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}

const doorRows: any[] = [];

if (doorSafety === 'for Each Fan') {
  

  if (aspControl !== 'none') {
    for (let i = 1; i <= asppieces; i++) {
      doorRows.push({
        point: `Aspirator Fan Door Status${asppieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }
}

if (doorSafety === 'for All Fans') {
  

  if (aspControl !== 'none') {
    doorRows.push({
      point: 'Aspirator General Door Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}

const fireRows: any[] = [];

if (fireSafety === 'only Viewing') {
  fireRows.push({
    point: 'Aspirator Fan Fire Status',
    ai: 0, ao: 0, di: 1, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (fireSafety === 'Viewing and Control') {
  fireRows.push({
    point: 'Aspirator Fan Fire Status',
    ai: 0, ao: 0, di: 1, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });

}


const returnAirSensorRows: any[] = [];

if (returnAirSensor === 'Temperature') {
  returnAirSensorRows.push({
    point: 'Return Air Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (returnAirSensor === 'Humidity') {
  returnAirSensorRows.push({
    point: 'Return Air Humidity',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (returnAirSensor === 'Co2') {
  returnAirSensorRows.push({
    point: 'Return Air Co2',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (returnAirSensor === 'Temperature and Humidity') {
  returnAirSensorRows.push({
    point: 'Return Air Temperature and Humidity',
    ai: 2, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (returnAirSensor === 'Temperature, Humidity and Co2') {
  returnAirSensorRows.push({
    point: 'Return Air Temperature, Humidity and Co2',
    ai: 3, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}


const exhaustAirSensorRows: any[] = [];

if (exhaustAirSensor === 'Temperature') {
  exhaustAirSensorRows.push({
    point: 'Exhaust Air Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (exhaustAirSensor === 'Humidity') {
  exhaustAirSensorRows.push({
    point: 'Exhaust Air Humidity',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (exhaustAirSensor === 'Temperature and Humidity') {
  exhaustAirSensorRows.push({
    point: 'Exhaust Air Temperature and Humidity',
    ai: 2, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}


const returnDamperRows: any[] = [];

if (returnDamperActuator === 'none') {

}

if (returnDamperActuator === 'On/Off Damper Actuator') {
  returnDamperRows.push({
    point: 'Return Air On/Off Damper Actuator Command', ai: 0, ao: 0, di: 0, do: 1,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnDamperActuator === 'On/Off Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air On/Off Damper Actuator Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air On/Off Damper Actuator Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === 'Floating Damper Actuator') {
  returnDamperRows.push(
    { point: 'Return Air Floating Damper Actuator Open Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === 'Floating Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air Floating Damper Actuator Open Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Open Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === 'Proportional Damper Actuator') {
  returnDamperRows.push({
    point: 'Return Air Proportional Damper Actuator Command', ai: 0, ao: 1, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnDamperActuator === 'Proportional Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air Proportional Damper Actuator Command', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Proportional Damper Actuator Feedback', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x On/Off Damper Actuator') {
  returnDamperRows.push(
    { point: 'Return Air On/Off Damper Actuator Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air On/Off Damper Actuator Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x On/Off Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air On/Off Damper Actuator Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air On/Off Damper Actuator Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air On/Off Damper Actuator Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air On/Off Damper Actuator Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x Floating Damper Actuator') {
  returnDamperRows.push(
    { point: 'Return Air Floating Damper Actuator Open Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Open Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x Floating Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air Floating Damper Actuator Open Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Open Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Open Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Open Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Floating Damper Actuator Close Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x Proportional Damper Actuator') {
  returnDamperRows.push(
    { point: 'Return Air Proportional Damper Actuator Command-1', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Proportional Damper Actuator Command-2', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (returnDamperActuator === '2x Proportional Damper Actuator with Feedback') {
  returnDamperRows.push(
    { point: 'Return Air Proportional Damper Actuator Command-1', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Proportional Damper Actuator Feedback-1', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Proportional Damper Actuator Command-2', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Return Air Proportional Damper Actuator Feedback-2', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}


const exhaustDamperRows: any[] = [];

if (exhaustDamperActuator === 'none') {
}

if (exhaustDamperActuator === 'On/Off Damper Actuator') {
  exhaustDamperRows.push({
    point: 'Exhaust Air On/Off Damper Actuator Command', ai: 0, ao: 0, di: 0, do: 1,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustDamperActuator === 'On/Off Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air On/Off Damper Actuator Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air On/Off Damper Actuator Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === 'Floating Damper Actuator') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Floating Damper Actuator Open Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === 'Floating Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Floating Damper Actuator Open Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Open Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === 'Proportional Damper Actuator') {
  exhaustDamperRows.push({
    point: 'Exhaust Air Proportional Damper Actuator Command', ai: 0, ao: 1, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustDamperActuator === 'Proportional Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Proportional Damper Actuator Command', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Proportional Damper Actuator Feedback', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x On/Off Damper Actuator') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air On/Off Damper Actuator Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air On/Off Damper Actuator Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x On/Off Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air On/Off Damper Actuator Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air On/Off Damper Actuator Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air On/Off Damper Actuator Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air On/Off Damper Actuator Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x Floating Damper Actuator') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Floating Damper Actuator Open Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Open Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x Floating Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Floating Damper Actuator Open Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command-1', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Open Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Status-1', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Open Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Command-2', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Open Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Floating Damper Actuator Close Status-2', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x Proportional Damper Actuator') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Proportional Damper Actuator Command-1', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Proportional Damper Actuator Command-2', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (exhaustDamperActuator === '2x Proportional Damper Actuator with Feedback') {
  exhaustDamperRows.push(
    { point: 'Exhaust Air Proportional Damper Actuator Command-1', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Proportional Damper Actuator Feedback-1', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Proportional Damper Actuator Command-2', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Exhaust Air Proportional Damper Actuator Feedback-2', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}


const returnFilterRows: any[] = [];

if (returnFilter === 'Analog G4') { returnFilterRows.push({   point: 'Return Filter G4 Pressure',   ai: 1, ao: 0, di: 0, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,   bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (returnFilter === 'Digital G4') { returnFilterRows.push({   point: 'Return Filter G4 Status',   ai: 0, ao: 0, di: 1, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnFilter === 'Analog F5') { returnFilterRows.push({ point: 'Return Filter F5 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital F5') { returnFilterRows.push({ point: 'Return Filter F5 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog F6') { returnFilterRows.push({ point: 'Return Filter F6 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital F6') { returnFilterRows.push({ point: 'Return Filter F6 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog F7') { returnFilterRows.push({ point: 'Return Filter F7 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital F7') { returnFilterRows.push({ point: 'Return Filter F7 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog F8') { returnFilterRows.push({ point: 'Return Filter F8 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital F8') { returnFilterRows.push({ point: 'Return Filter F8 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog F9') { returnFilterRows.push({ point: 'Return Filter F9 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital F9') { returnFilterRows.push({ point: 'Return Filter F9 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog H13') { returnFilterRows.push({ point: 'Return Filter H13 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital H13') {returnFilterRows.push({ point: 'Return Filter H13 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (returnFilter === 'Analog H14') { returnFilterRows.push({ point: 'Return Filter H14 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (returnFilter === 'Digital H14') { returnFilterRows.push({ point: 'Return Filter H14 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

const exhaustFilterRows: any[] = [];

if (exhaustFilter === 'Analog G4') { exhaustFilterRows.push({   point: 'Exhaust Filter G4 Pressure',   ai: 1, ao: 0, di: 0, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,   bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital G4') { exhaustFilterRows.push({   point: 'Exhaust Filter G4 Status',   ai: 0, ao: 0, di: 1, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,   bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog F5') { exhaustFilterRows.push({   point: 'Exhaust Filter F5 Pressure',   ai: 1, ao: 0, di: 0, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,   bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital F5') { exhaustFilterRows.push({   point: 'Exhaust Filter F5 Status',   ai: 0, ao: 0, di: 1, do: 0,   projectCode, description, location,   modbusRtu: 0, modbusTcp: 0,   bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog F6') {exhaustFilterRows.push({  point: 'Exhaust Filter F6 Pressure',  ai: 1, ao: 0, di: 0, do: 0,  projectCode, description, location,  modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital F6') { exhaustFilterRows.push({  point: 'Exhaust Filter F6 Status',  ai: 0, ao: 0, di: 1, do: 0,  projectCode, description, location, modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog F7') { exhaustFilterRows.push({  point: 'Exhaust Filter F7 Pressure',  ai: 1, ao: 0, di: 0, do: 0,  projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital F7') {exhaustFilterRows.push({ point: 'Exhaust Filter F7 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog F8') {exhaustFilterRows.push({ point: 'Exhaust Filter F8 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital F8') { exhaustFilterRows.push({ point: 'Exhaust Filter F8 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog F9') {exhaustFilterRows.push({ point: 'Exhaust Filter F9 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital F9') {exhaustFilterRows.push({ point: 'Exhaust Filter F9 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (exhaustFilter === 'Analog H13') {exhaustFilterRows.push({ point: 'Exhaust Filter H13 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}
if (exhaustFilter === 'Digital H13') { exhaustFilterRows.push({ point: 'Exhaust Filter H13 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}

if (exhaustFilter === 'Analog H14') { exhaustFilterRows.push({ point: 'Exhaust Filter H14 Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 });
}
if (exhaustFilter === 'Digital H14') {exhaustFilterRows.push({ point: 'Exhaust Filter H14 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}



const returnFlowRows: any[] = [];

if (returnFlow === 'Belt') {returnFlowRows.push({ point: 'Return Fan Belt Status',  ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnFlow === 'Pressure') {returnFlowRows.push({ point: 'Return Fan Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnFlow === 'Volume') {returnFlowRows.push({ point: 'Return Fan Volume', ai: 1, ao: 0, di: 0, do: 0,projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (returnFlow === 'Belt and Pressure') {returnFlowRows.push( {  point: 'Return Fan Belt Status',  ai: 0, ao: 0, di: 1, do: 0,  projectCode, description, location,  modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Fan Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (returnFlow === 'Belt and Volume') {returnFlowRows.push( {
      point: 'Return Fan Belt Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Fan Volume', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0,  bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (returnFlow === 'Pressure and Volume') {returnFlowRows.push( { point: 'Return Fan Pressure', ai: 1, ao: 0, di: 0, do: 0,  projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Fan Volume', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (returnFlow === 'Belt, Pressure and Volume') {returnFlowRows.push( { point: 'Return Fan Belt Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Fan Pressure', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Return Fan Volume', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location,  modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

const pumpPieces = Number(runAroundPumpPieces) || 1;
let runAroundPumpRows: any[] = [];

if (runAroundPumpControl === 'DOL' || runAroundPumpControl === 'Star-Delta') {
  const dolRows = [
    { point: 'Run Around Pump Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    dolRows.forEach(row => {
      runAroundPumpRows.push({
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

if (runAroundPumpControl === 'VFD') {
  const vfdRows = [
    { point: 'Run Around Pump Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Run Around Pump Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    vfdRows.forEach(row => {
      runAroundPumpRows.push({
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




if (runAroundPumpControl === 'Power Supply Only ( Smart Pump)') {
  const vfdRows = [
    { point: 'Run Around Pump Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Run Around Pump Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    vfdRows.forEach(row => {
      runAroundPumpRows.push({
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





if (runAroundPumpControl === 'VFD with By Pass Circuit' || runAroundPumpControl === 'VFD with By Pass Circuit + Star-Delta') {
  const vfdBypassRows = [
    { point: 'Run Around Pump Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump By/Pass Switch', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Run Around Pump Frequency Inverter Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Run Around Pump Frequency Inverter Feedback', ai: 1, ao: 0, di: 0, do: 0 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    vfdBypassRows.forEach(row => {
      runAroundPumpRows.push({
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

if (runAroundPumpControl === 'Soft Starter') {
  const softRows = [
    { point: 'Run Around Pump Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    softRows.forEach(row => {
      runAroundPumpRows.push({
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

if (runAroundPumpControl === 'Soft Starter with By Pass Circuit' || runAroundPumpControl === 'Soft Starter with By Pass Circuit + Star-Delta') {
  const softBypassRows = [
    { point: 'Run Around Pump Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump By Pass Switch Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Run Around Pump Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pumpPieces; i++) {
    const suffix = pumpPieces > 1 ? ` ${i}` : '';
    softBypassRows.forEach(row => {
      runAroundPumpRows.push({
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

let runaroundCoilTemperatureRows: any[] = [];

if (runAroundTemperature === 'Inlet Temperature') {
  runaroundCoilTemperatureRows.push({
    projectCode,
    description,
    location,
    point: 'Run Around Coil Inlet Temperature',
    ai: 1,
    ao: 0,
    di: 0,
    do: 0,
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0,
    mbus: 0
  });
}

if (runAroundTemperature === 'Outlet Temperature') {
  runaroundCoilTemperatureRows.push({
    projectCode,
    description,
    location,
    point: 'Run Around Coil Outlet Temperature',
    ai: 1,
    ao: 0,
    di: 0,
    do: 0,
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0,
    mbus: 0
  });
}

if (runAroundTemperature === 'Inlet and Outlet Temperature') {
  runaroundCoilTemperatureRows.push(
    {
      projectCode,
      description,
      location,
      point: 'Run Around Coil Inlet Temperature',
      ai: 1,
      ao: 0,
      di: 0,
      do: 0,
      modbusRtu: 0,
      modbusTcp: 0,
      bacnetMstp: 0,
      bacnetIp: 0,
      mbus: 0
    },
    {
      projectCode,
      description,
      location,
      point: 'Run Around Coil Outlet Temperature',
      ai: 1,
      ao: 0,
      di: 0,
      do: 0,
      modbusRtu: 0,
      modbusTcp: 0,
      bacnetMstp: 0,
      bacnetIp: 0,
      mbus: 0
    }
  );
}



const fanIntegrationRows: any[] = [];

if (
  fanIntegration !== 'none' &&
  fanprotocolIntegration &&
  fanIntegrationPoints &&
  !isPackaged
) {
  const pointName = `Fan General ${fanIntegration} Integration Points`;

  const protocolValues = {
    'Modbus RTU': { modbusRtu: fanIntegrationPoints, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0 },
    'Modbus TCP IP': { modbusRtu: 0, modbusTcp: fanIntegrationPoints, bacnetMstp: 0, bacnetIp: 0 },
    'Bacnet MSTP': { modbusRtu: 0, modbusTcp: 0, bacnetMstp: fanIntegrationPoints, bacnetIp: 0 },
    'Bacnet IP': { modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: fanIntegrationPoints },
  };

  const protocol = protocolValues[fanprotocolIntegration as keyof typeof protocolValues] || {
    modbusRtu: 0,
    modbusTcp: 0,
    bacnetMstp: 0,
    bacnetIp: 0
  };

  fanIntegrationRows.push({
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
const runaroundPumpIntegrationRows: any[] = [];

if (
  runaroundpumpIntegration !== 'none' &&
  runaroundpumpprotocolIntegration &&
  runaroundpumpIntegrationPoints &&
  !isPackaged
) {
  const pointName = `Runaround Pump General ${runaroundpumpIntegration} Integration Points`;

  const pointValue = parseInt(runaroundpumpIntegrationPoints) || 0;

  const protocol = {
    modbusRtu: runaroundpumpprotocolIntegration === 'Modbus RTU' ? pointValue : 0,
    modbusTcp: runaroundpumpprotocolIntegration === 'Modbus TCP IP' ? pointValue : 0,
    bacnetMstp: runaroundpumpprotocolIntegration === 'Bacnet MSTP' ? pointValue : 0,
    bacnetIp: runaroundpumpprotocolIntegration === 'Bacnet IP' ? pointValue : 0
  };

  runaroundPumpIntegrationRows.push({
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

  ...asprows,
  ...maintenanceRows,
  ...emergencyRows,
  ...doorRows,
  ...fireRows,
  ...returnAirSensorRows,
  ...exhaustAirSensorRows,
  ...returnDamperRows,
  ...exhaustDamperRows,
  ...returnFilterRows,
  ...exhaustFilterRows,
  ...returnFlowRows,
  ...runAroundPumpRows,
  ...runaroundCoilTemperatureRows,
  ...fanIntegrationRows,
  ...runaroundPumpIntegrationRows,
  ...fanControlPackagedRows
]);


setShowTable(true);
  };


  const handleAddPool = () => {
  if (!tableRows || tableRows.length === 0) {
    setSnackbarMsg('No rows to add. Please generate the table first.');
    setSnackbarOpen(true);
    return;
  }

  const codes = Array.from(new Set(
    tableRows
      .map((r: any) => (r.projectCode ?? '').trim())
      .filter((c: string) => c.length > 0)
  ));

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
    system: 'fan',
    rows: tableRows,
    createdAt: new Date().toISOString(),
    meta: { description, location }
  };

  localStorage.setItem(key, JSON.stringify([...existing, payload]));

  setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
  setSnackbarOpen(true);

  // tabloyu temizle/gizle
  setTableRows([]);
  setShowTable(false);
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Fan System Input</Typography>
            <Stack spacing={2}>
              <TextField
  label="Project Code"
  value={projectCode}
  onChange={(e) => setProjectCode(e.target.value)}
  fullWidth
  variant="outlined"
  InputLabelProps={{ sx: labelStyles }}   // Select ile aynı label rengi
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  }}
  InputProps={{
    sx: {
      '& .MuiInputBase-input': { color: '#ECEFF1' }, // Select iç yazı rengiyle aynı
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

              {renderDropdown('Control Type', fanControl, handleFanControlChange, ['MCC', 'Packaged'])}
              {renderDropdown('Control Protocol Integration', fancontrolpackagedprotocolIntegration, (e) => setFanControlPackagedProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], fanControl === 'MCC')}
              
              <TextField
  label="Control Packaged Integration Points"
  value={fanControlPackagedPoints}
  onChange={(e) => setFanControlPackagedPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={fanControl === 'MCC'}
  InputLabelProps={{ sx: labelStyles }} // Select ile aynı label renkleri
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: fanControl === 'MCC' ? '#555' : '#B0BEC5',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: fanControl === 'MCC' ? '#555' : '#90A4AE',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: fanControl === 'MCC' ? '#555' : '#CFD8DC',
    },
  }}
  InputProps={{
    sx: {
      backgroundColor: fanControl === 'MCC' ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: 'white' },
      '&.Mui-disabled .MuiInputBase-input': {
        WebkitTextFillColor: '#888',
        color: '#888',
      },
    },
  }}
/>

              
              {renderDropdown('Control Packaged Hard Points', fancontrolpackagedhardpoints, (e) => setFanControlPackagedHardPoints(e.target.value), ['none', 'Statuses', 'Command', 'Statuses and Command'], fanControl === 'MCC')}

              {renderDropdown('Aspirator Control', aspControl, handleAspControlChange, ['DOL', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta','Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'], isPackaged)}
              {renderDropdown('Aspirator Pieces', aspPieces, (e) => setAspPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], aspControl === 'none'|| isPackaged)}
              {renderDropdown('Aspirator Power', aspPower, (e) => setAspPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], aspControl === 'none'|| isPackaged)}
              {renderDropdown('Aspirator Voltage', aspVoltage, (e) => setAspVoltage(e.target.value), ['230', '380'], aspControl === 'none'|| isPackaged)}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'], isPackaged)}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'], isPackaged)}
              {renderDropdown('Door Safety Contacts', doorSafety, (e) => setDoorSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'], isPackaged)}
              {renderDropdown('Fire Safety Contacts', fireSafety, (e) => setFireSafety(e.target.value), ['none', 'only Viewing', 'Viewing and Control'], isPackaged)}
              
              {renderDropdown('Return Air Measurement', returnAirSensor, (e) => setReturnAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity', 'Co2', 'Temperature, Humidity and Co2'], isPackaged)}
              {renderDropdown('Exhaust Air Measurement', exhaustAirSensor, (e) => setExhaustAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'], isPackaged)}
              
              {renderDropdown('Return Damper Actuator', returnDamperActuator, (e) => setReturnDamperActuator(e.target.value), ['none','On/Off Damper Actuator','On/Off Damper Actuator with Feedback','Floating Damper Actuator','Floating Damper Actuator with Feedback','Proportional Damper Actuator','Proportional Damper Actuator with Feedback','2x On/Off Damper Actuator','2x On/Off Damper Actuator with Feedback','2x Floating Damper Actuator','2x Floating Damper Actuator with Feedback','2x Proportional Damper Actuator','2x Proportional Damper Actuator with Feedback' ], isPackaged)}
              {renderDropdown('Exhaust Damper Actuator',exhaustDamperActuator, (e) => setExhaustDamperActuator(e.target.value), ['none','On/Off Damper Actuator','On/Off Damper Actuator with Feedback','Floating Damper Actuator','Floating Damper Actuator with Feedback','Proportional Damper Actuator','Proportional Damper Actuator with Feedback','2x On/Off Damper Actuator','2x On/Off Damper Actuator with Feedback','2x Floating Damper Actuator','2x Floating Damper Actuator with Feedback','2x Proportional Damper Actuator','2x Proportional Damper Actuator with Feedback' ], isPackaged)}
              
              {renderDropdown('Return Filter', returnFilter, (e) => setReturnFilter(e.target.value), ['none', 'Analog G4', 'Digital G4', 'Analog F5', 'Digital F5', 'Analog F6', 'Digital F6', 'Analog F7', 'Digital F7', 'Analog F8', 'Digital F8', 'Analog F9', 'Digital F9', 'Analog H13', 'Digital H13', 'Analog H14', 'Digital H14' ], isPackaged)}
              {renderDropdown('Exhaust Filter', exhaustFilter, (e) => setExhaustFilter(e.target.value), ['none','Analog G4', 'Digital G4', 'Analog F5', 'Digital F5', 'Analog F6', 'Digital F6', 'Analog F7', 'Digital F7', 'Analog F8', 'Digital F8', 'Analog F9', 'Digital F9', 'Analog H13', 'Digital H13', 'Analog H14', 'Digital H14' ], isPackaged)}
              
              {renderDropdown('Return Flow', returnFlow, (e) => setReturnFlow(e.target.value), [ 'none', 'Belt', 'Pressure', 'Volume', 'Belt and Pressure', 'Belt and Volume', 'Pressure and Volume', 'Belt, Pressure and Volume'], isPackaged)}
              {renderDropdown('Run Around Pump Control', runAroundPumpControl, (e) => setRunAroundPumpControl(e.target.value), [ 'none', 'DOL', 'Power Supply Only ( Smart Pump)', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta' ], isPackaged)}
              {renderDropdown('Run Around Pump Pieces', runAroundPumpPieces, (e) => setRunAroundPumpPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], runAroundPumpControl === 'none'|| isPackaged)}
              {renderDropdown('Run Around Pump Power', pumpPower, (e) => setPumpPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], runAroundPumpControl === 'none'|| isPackaged)}
              {renderDropdown('Run Around Pump Voltage', pumpVoltage, (e) => setPumpVoltage(e.target.value), ['230', '380'], runAroundPumpControl === 'none'|| isPackaged)}
              {renderDropdown('Run Around Coil Temperature', runAroundTemperature,  (e) => setRunAroundTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], runAroundPumpControl === 'none'|| isPackaged)}
              
              
              {renderDropdown('Fan Integration', fanIntegration, (e) => setFanIntegration(e.target.value), ['none', 'EC', 'VFD'], isPackaged)}
              {renderDropdown('Fan Protocol Integration', fanprotocolIntegration, (e) => setFanProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], fanIntegration === 'none'|| isPackaged)}

            
              <TextField
  label="Fan Integration Points"
  value={fanIntegrationPoints}
  onChange={(e) => setFanIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={fanIntegration === 'none' || isPackaged}
  InputLabelProps={{ sx: labelStyles }} // Select ile aynı label renkleri
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: (fanIntegration === 'none' || isPackaged) ? '#555' : '#B0BEC5',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (fanIntegration === 'none' || isPackaged) ? '#555' : '#90A4AE',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (fanIntegration === 'none' || isPackaged) ? '#555' : '#CFD8DC',
    },
  }}
  InputProps={{
    sx: {
      backgroundColor: (fanIntegration === 'none' || isPackaged) ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: 'white' },
      '&.Mui-disabled .MuiInputBase-input': {
        WebkitTextFillColor: '#888',
        color: '#888',
      },
    },
  }}
/>



              {renderDropdown('Run Around Pump Integration', runaroundpumpIntegration, (e) => setRunAroundPumpIntegration(e.target.value), ['none', 'own Panel', 'VFD'], isPackaged)}
              {renderDropdown('Run Around Pump Protocol Integration', runaroundpumpprotocolIntegration, (e) => setRunAroundPumpProtocolIntegration(e.target.value), ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'], runaroundpumpIntegration === 'none'|| isPackaged)}


              <TextField
  label="Run Around Pump Integration Points"
  value={runaroundpumpIntegrationPoints}
  onChange={(e) => setRunAroundPumpIntegrationPoints(e.target.value)}
  fullWidth
  variant="outlined"
  disabled={runaroundpumpIntegration === 'none' || isPackaged}
  InputLabelProps={{
    sx: {
      color: '#90A4AE',
      '&.Mui-focused': { color: '#B0BEC5' },
      '&.Mui-disabled': { color: '#888' },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: (runaroundpumpIntegration === 'none' || isPackaged) ? '#555' : '#B0BEC5',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (runaroundpumpIntegration === 'none' || isPackaged) ? '#555' : '#90A4AE',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: (runaroundpumpIntegration === 'none' || isPackaged) ? '#555' : '#CFD8DC',
    },
  }}
  InputProps={{
    sx: {
      backgroundColor: (runaroundpumpIntegration === 'none' || isPackaged) ? '#1e1e1e' : 'transparent',
      '& .MuiInputBase-input': { color: '#ECEFF1' },
      '&.Mui-disabled .MuiInputBase-input': {
        WebkitTextFillColor: '#888',
        color: '#888',
      },
    },
  }}
/>





              


<PrimaryButton sx={{ width: '100%' }} onClick={handleSaveFan}>Send to Table</PrimaryButton>

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
    {projectCode ? `${projectCode} Output Table` : 'Fan Output Table'}
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
