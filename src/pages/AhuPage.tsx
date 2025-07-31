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

// Yeni Select stilleri
const selectStyles = {
  color: '#ECEFF1',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#B0BEC5'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#90A4AE'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#CFD8DC'
  },
  '&.Mui-disabled': {
    color: '#888',
    backgroundColor: '#1e1e1e'
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555'
  },
  svg: {
    color: '#90A4AE'
  }
};

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': {
    color: '#B0BEC5'
  }
};

const preheatingValveOptions = [
  'On/Off Valve Actuator',
  'On/Off Valve Actuator with Feedback',
  'Proportional Valve Actuator',
  'Proportional Valve Actuator with Feedback'
];

const heatingValveOptions = [
  'On/Off Valve Actuator',
  'On/Off Valve Actuator with Feedback',
  'Proportional Valve Actuator',
  'Proportional Valve Actuator with Feedback'
];

export default function AhuPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [ahuControl, setAhuControl] = useState('');
  const [ahuBrand, setAhuBrand] = useState('');
  const [vantControl, setVantControl] = useState('');
  const [vantPieces, setVantPieces] = useState('');
  const [fanPower, setFanPower] = useState('');
  const [fanVoltage, setFanVoltage] = useState('');
  const [aspControl, setAspControl] = useState('');
  const [aspPieces, setAspPieces] = useState('');
  const [aspPower, setAspPower] = useState('');
  const [aspVoltage, setAspVoltage] = useState('');
  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [doorSafety, setDoorSafety] = useState('');
  const [fireSafety, setFireSafety] = useState('');
  const [frostSafety, setFrostSafety] = useState('');
  const [preheatingFunction, setPreheatingFunction] = useState('');
  const [preheatingPower, setPreheatingPower] = useState('');
  const [preheatingVoltage, setPreheatingVoltage] = useState('');
  const [preheatingTemperature, setPreheatingTemperature] = useState('');
  const [heatingFunction, setHeatingFunction] = useState('');
  const [heatingPieces, setHeatingPieces] = useState('');
  const [heatingPower, setHeatingPower] = useState('');
  const [heatingVoltage, setHeatingVoltage] = useState('');
  const [heatingTemperature, setHeatingTemperature] = useState('');
  const [coolingFunction, setCoolingFunction] = useState('');
  const [coolingPieces, setCoolingPieces] = useState('');
  const [coolingPower, setCoolingPower] = useState('');
  const [coolingVoltage, setCoolingVoltage] = useState('');
  const [coolingTemperature, setCoolingTemperature] = useState('');

  const [pumpControl, setPumpControl] = useState('');
  const [pumpPieces, setPumpPieces] = useState('');
  const [pumpPower, setPumpPower] = useState('');
  const [pumpVoltage, setPumpVoltage] = useState('');
  const [runAroundTemperature, setRunAroundTemperature] = useState('');
  const [heatRecoveryControl, setHeatRecoveryControl] = useState('');
  const [heatRecoveryPower, setHeatRecoveryPower] = useState('');
  const [heatRecoveryVoltage, setHeatRecoveryVoltage] = useState('');
  const [humidificationFunction, setHumidificationFunction] = useState('');
  const [humidificationPieces, setHumidificationPieces] = useState('');
  const [humidificationPower, setHumidificationPower] = useState('');
  const [humidificationVoltage, setHumidificationVoltage] = useState('');
  const [dehumidificationFunction, setDehumidificationFunction] = useState('');
  const [dehumidificationPieces, setDehumidificationPieces] = useState('');
  const [dehumidificationPower, setDehumidificationPower] = useState('');
  const [dehumidificationVoltage, setDehumidificationVoltage] = useState('');
  
  const [freshDamperActuator, setFreshDamperActuator] = useState('');
  const [supplyDamperActuator, setSupplyDamperActuator] = useState('');
  const [returnDamperActuator, setReturnDamperActuator] = useState('');
  const [exhaustDamperActuator, setExhaustDamperActuator] = useState('');
  const [mixedDamperActuator, setMixedDamperActuator] = useState('');
  const [recirculationDamperActuator, setRecirculationDamperActuator] = useState('');
  const [supplyAirSensor, setSupplyAirSensor] = useState('');
  const [freshAirSensor, setFreshAirSensor] = useState('');
  const [returnAirSensor, setReturnAirSensor] = useState('');
  const [exhaustAirSensor, setExhaustAirSensor] = useState('');
  const [heatExchangerAirSensor, setHeatExchangerAirSensor] = useState('');
  const [mixedAirSensor, setMixedAirSensor] = useState('');
  const [dehumidificationSensor, setDehumidificationSensor] = useState('');
 
  const [supplyFilter, setSupplyFilter] = useState('');
  const [freshFilter, setFreshFilter] = useState('');
  const [returnFilter, setReturnFilter] = useState('');
  const [recuperatorFilter, setRecuperatorFilter] = useState('');
  const [supplyFlow, setSupplyFlow] = useState('');
  const [returnFlow, setReturnFlow] = useState('');
  const [systemIntegration, setSystemIntegration] = useState('');
  const [protocolIntegration, setProtocolIntegration] = useState('');
  const [totalIntegrationPoints, setTotalIntegrationPoints] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [tableRows, setTableRows] = useState<any[]>([]);

const isPreheatingTemperatureDisabled = () => {
    return (
      preheatingFunction === 'none' ||
      preheatingFunction.includes('Electrical Heater')
    );
  };

  React.useEffect(() => {
  if (
    preheatingFunction === 'none' ||
    preheatingFunction.includes('Electrical Heater')
  ) {
    setPreheatingTemperature('');
  }
}, [preheatingFunction]);

  const isHeatingTemperatureDisabled = () => {
    return (
      heatingFunction === 'none' ||
      heatingFunction.includes('Electrical Heater')
    );
  };

React.useEffect(() => {
  if (
    heatingFunction === 'none' ||
    heatingFunction.includes('Electrical Heater')
  ) {
    setHeatingTemperature('');
  }
}, [heatingFunction]);

  const handleBack = () => {
    navigate('/projects');
  };

  const handleLogout = () => {
    navigate('/');
  };

  
  const renderDropdown = (
    label: string,
    value: string,
    onChange: (e: SelectChangeEvent) => void,
    options: string[],
    disabled: boolean = false // yeni eklendi
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

const handlePreheatingFunctionChange = (e: SelectChangeEvent) => {
  const value = e.target.value;
  setPreheatingFunction(value);

  if (preheatingValveOptions.includes(value)) {
    setPreheatingPower('');
    setPreheatingVoltage('');
  }
};

const handleHeatingFunctionChange = (e: SelectChangeEvent) => {
  const value = e.target.value;
  setHeatingFunction(value);

  if (heatingValveOptions.includes(value)) {
    setHeatingPower('');
    setHeatingVoltage('');
  }
};

  const handleSaveAhu = () => {
    if (ahuControl !== 'MCC') {
      

      return;
    }

    const vantpieces = Number(vantPieces) || 1;
    let vantrows: any[] = [];

    if (vantControl === 'Dol' || vantControl === 'Star-Delta') {
  const dolRows = [
    { point: 'Vantilator Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= vantpieces; i++) {
    const suffix = vantpieces > 1 ? ` ${i}` : '';
    dolRows.forEach((row) => {
      vantrows.push({
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

    if (vantControl === 'VFD') {
  const vfdRows = [
    { point: 'Vantilator Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Vantilator Fan Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Vantilator Fan Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= vantpieces; i++) {
    const suffix = vantpieces > 1 ? ` ${i}` : '';
    vfdRows.forEach((row) => {
      vantrows.push({
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

    if (vantControl === 'VFD with By Pass Circuit' || vantControl === 'VFD with By Pass Circuit + Star-Delta') {
      const byPassRows = [
          { point: 'Vantilator Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan By/Pass Switch', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Vantilator Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
          { point: 'Vantilator Fan Frequency Inverter Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
          { point: 'Vantilator Fan Frequency Inverter Feedback', ai: 1, ao: 0, di: 0, do: 0 }
        ];

    for (let i = 1; i <= vantpieces; i++) {
      byPassRows.forEach(item => {
        vantrows.push({
          projectCode,
          description,
          location,
          point: vantpieces > 1 ? `${item.point} ${i}` : item.point,
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

if (vantControl === 'Soft Starter') { 
  const softStarterRows = [
    { point: 'Vantilator Fan Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= vantpieces; i++) {
    const suffix = vantpieces > 1 ? ` ${i}` : '';
    softStarterRows.forEach((row) => {
      vantrows.push({
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

if (vantControl === 'Soft Starter with By Pass Circuit'|| vantControl === 'Soft Starter with By Pass Circuit + Star-Delta') {
  const softBypassRows = [
    { point: 'Vantilator Fan Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan By Pass Switch Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= vantpieces; i++) {
    const suffix = vantpieces > 1 ? ` ${i}` : '';
    softBypassRows.forEach((row) => {
      vantrows.push({
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

if (vantControl === 'EC') {
  const ecRows = [
    { point: 'Vantilator EC Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator EC Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator EC Fan Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Vantilator EC Fan Feedback', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Vantilator EC Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= vantpieces; i++) {
    const suffix = vantpieces > 1 ? ` ${i}` : '';
    ecRows.forEach((row) => {
      vantrows.push({
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



const asppieces = Number(aspPieces) || 1;
let asprows: any[] = [];

if (aspControl === 'Dol' || aspControl === 'Star-Delta') {
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

    // Protokol kolonlarını ve diğer bilgileri her satıra ekle
    asprows = asprows.map(row => ({
      projectCode,
      description,
      location,
      ...row,
      modbusRtu: 0,
      modbusTcp: 0,
      bacnetMstp: 0,
      bacnetIp: 0,
      mbus: 0
    }));


const maintenanceRows: any[] = [];

if (maintenanceSafety === 'for Each Fan') {
  if (vantControl !== 'none') {
    for (let i = 1; i <= vantpieces; i++) {
      maintenanceRows.push({
        point: `Vantilator Fan Maintenance Status${vantpieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

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
  if (vantControl !== 'none') {
    maintenanceRows.push({
      point: 'Vantilator General Maintenance Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

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
  if (vantControl !== 'none') {
    for (let i = 1; i <= vantpieces; i++) {
      emergencyRows.push({
        point: `Vantilator Fan Emergency Status${vantpieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

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
  if (vantControl !== 'none') {
    emergencyRows.push({
      point: 'Vantilator General Emergency Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

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
  if (vantControl !== 'none') {
    for (let i = 1; i <= vantpieces; i++) {
      doorRows.push({
        point: `Vantilator Fan Door Status${vantpieces > 1 ? ` ${i}` : ''}`,
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }

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
  if (vantControl !== 'none') {
    doorRows.push({
      point: 'Vantilator General Door Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }

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
    point: 'Fire General Status',
    ai: 0, ao: 0, di: 1, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (fireSafety === 'Viewing and Control') {
  fireRows.push({
    point: 'Vantilator Fan Fire Status',
    ai: 0, ao: 0, di: 1, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });

  if (aspControl !== 'none') {
    fireRows.push({
      point: 'Aspirator Fan Fire Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
}

const frostRows: any[] = [];

if (frostSafety === 'Automatic Reset' || frostSafety === 'Manual Reset') {
  frostRows.push({
    point: 'Frost Thermostat Status',
    ai: 0, ao: 0, di: 1, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

const preheatingRows: any[] = [];

if (preheatingFunction === 'On/Off Valve Actuator') {
  preheatingRows.push(
    {
      point: 'Preheating Valve Open Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Valve Close Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (preheatingFunction === 'On/Off Valve Actuator with Feedback') {
  preheatingRows.push(
    {
      point: 'Preheating Valve Open Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Valve Close Command',
      ai: 0, ao: 0, di: 0, do: 1,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Valve Open Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Valve Close Status',
      ai: 0, ao: 0, di: 1, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (preheatingFunction === 'Proportional Valve Actuator') {
  preheatingRows.push({
    point: 'Preheating Valve Proportional Command',
    ai: 0, ao: 1, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

if (preheatingFunction === 'Proportional Valve Actuator with Feedback') {
  preheatingRows.push(
    {
      point: 'Preheating Valve Proportional Command',
      ai: 0, ao: 1, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Valve Proportional Feedback',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

if (preheatingFunction === '1-Staged Electrical Heater') {
  preheatingRows.push(
    { point: 'Preheating Electrical Heater Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }

  );
}

if (preheatingFunction === '2-Staged Electrical Heater') {
  preheatingRows.push(
    { point: 'Preheating Electrical Heater-1 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-1 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-1 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (preheatingFunction === '3-Staged Electrical Heater') {
  preheatingRows.push(
    { point: 'Preheating Electrical Heater-1 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-1 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-1 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-2 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-3 Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-3 Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater-3 Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Electrical Heater Air Flow', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

if (preheatingFunction === 'Proportional Electrical Heater') {
  preheatingRows.push(
    { point: 'Preheating Proportional Electrical Heater Status', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Proportional Electrical Heater Fault', ai: 0, ao: 0, di: 1, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Proportional Electrical Heater Command', ai: 0, ao: 0, di: 0, do: 1, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Proportional Electrical Heater Proportional Control', ai: 0, ao: 1, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 },
    { point: 'Preheating Proportional Electrical Heater Feedback', ai: 1, ao: 0, di: 0, do: 0, projectCode, description, location, modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0 }
  );
}

const preheatingTemperatureRows: any[] = [];

if (preheatingTemperature === 'Inlet Temperature') {
  preheatingTemperatureRows.push({
    point: 'Preheating Coil Inlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (preheatingTemperature === 'Outlet Temperature') {
  preheatingTemperatureRows.push({
    point: 'Preheating Coil Outlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (preheatingTemperature === 'Inlet and Outlet Temperature') {
  preheatingTemperatureRows.push(
    {
      point: 'Preheating Coil Inlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Preheating Coil Outlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}

const heatingRows: any[] = [];

if (heatingFunction === 'On/Off Valve Actuator') {
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
    }
  );
}

if (heatingFunction === 'On/Off Valve Actuator with Feedback') {
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

const heatingTemperatureRows: any[] = [];

if (heatingTemperature === 'Inlet Temperature') {
  heatingTemperatureRows.push({
    point: 'Heating Coil Inlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (heatingTemperature === 'Outlet Temperature') {
  heatingTemperatureRows.push({
    point: 'Heating Coil Outlet Temperature',
    ai: 1, ao: 0, di: 0, do: 0,
    projectCode, description, location,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
} else if (heatingTemperature === 'Inlet and Outlet Temperature') {
  heatingTemperatureRows.push(
    {
      point: 'Heating Coil Inlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    },
    {
      point: 'Heating Coil Outlet Temperature',
      ai: 1, ao: 0, di: 0, do: 0,
      projectCode, description, location,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    }
  );
}


setTableRows([
  ...vantrows,
  ...asprows,
  ...maintenanceRows,
  ...emergencyRows,
  ...doorRows,
  ...fireRows,
  ...frostRows,
  ...preheatingRows,
  ...preheatingTemperatureRows,
  ...heatingRows,
  ...heatingTemperatureRows
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>AHU System Input</Typography>
            <Stack spacing={2}>
              <TextField fullWidth variant="outlined" placeholder="AHU Project Code" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="AHU Description" value={description} onChange={(e) => setDescription(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              <TextField fullWidth variant="outlined" placeholder="AHU Located" value={location} onChange={(e) => setLocation(e.target.value)} InputProps={{ style: { color: 'white' } }} />
              {renderDropdown('AHU Control Type', ahuControl, (e) => setAhuControl(e.target.value), ['MCC', 'Own Panel', 'Smart'])}
              {renderDropdown('Vantilator Control', vantControl, (e) => setVantControl(e.target.value), ['Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
              {renderDropdown('Vantilator Pieces', vantPieces, (e) => setVantPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
              {renderDropdown('Vantilator Power', fanPower, (e) => setFanPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
              {renderDropdown('Vantilator Voltage', fanVoltage, (e) => setFanVoltage(e.target.value), ['230', '380'])}
              {renderDropdown('Aspirator Control', aspControl, handleAspControlChange, ['none', 'Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta','Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
              {renderDropdown('Aspirator Pieces', aspPieces, (e) => setAspPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], aspControl === 'none')}
              {renderDropdown('Aspirator Power', aspPower, (e) => setAspPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], aspControl === 'none')}
              {renderDropdown('Aspirator Voltage', aspVoltage, (e) => setAspVoltage(e.target.value), ['230', '380'], aspControl === 'none')}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Door Safety Contacts', doorSafety, (e) => setDoorSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Fire Safety Contacts', fireSafety, (e) => setFireSafety(e.target.value), ['none', 'only Viewing', 'Viewing and Control'])}
              {renderDropdown('Frost Safety Contacts', frostSafety, (e) => setFrostSafety(e.target.value), ['none', 'Automatic Reset', 'Manual Reset'])}
              {renderDropdown('Preheating Function', preheatingFunction, handlePreheatingFunctionChange, ['none', 'On/Off Valve Actuator', 'On/Off Valve Actuator with Feedback', 'Proportional Valve Actuator', 'Proportional Valve Actuator with Feedback', '1-Staged Electrical Heater', '2-Staged Electrical Heater', '3-Staged Electrical Heater', 'Proportional Electrical Heater'])}
              {renderDropdown('Preheating Power', preheatingPower, (e) => setPreheatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], preheatingFunction === 'none' || preheatingValveOptions.includes(preheatingFunction))}
              {renderDropdown('Preheating Voltage', preheatingVoltage, (e) => setPreheatingVoltage(e.target.value), ['230', '380'], preheatingFunction === 'none' || preheatingValveOptions.includes(preheatingFunction))}
              {renderDropdown('Preheating Coil Temperature', preheatingTemperature, (e) => setPreheatingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], isPreheatingTemperatureDisabled())}
              {renderDropdown('Heating Function', heatingFunction, handleHeatingFunctionChange, ['none', 'On/Off Valve Actuator', 'On/Off Valve Actuator with Feedback', 'Proportional Valve Actuator', 'Proportional Valve Actuator with Feedback', '1-Staged Electrical Heater', '2-Staged Electrical Heater', '3-Staged Electrical Heater', 'Proportional Electrical Heater'])}
              {renderDropdown('Heating Power', heatingPower, (e) => setHeatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], heatingFunction === 'none' || heatingValveOptions.includes(heatingFunction))}
              {renderDropdown('Heating Voltage', heatingVoltage, (e) => setHeatingVoltage(e.target.value), ['230', '380'], heatingFunction === 'none' || heatingValveOptions.includes(heatingFunction))}
              {renderDropdown('Heating Coil Temperature', heatingTemperature, (e) => setHeatingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'],isHeatingTemperatureDisabled())}
              {renderDropdown('Cooling Function', coolingFunction, (e) => setCoolingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged DX Unit', 'Proportional DX Unit'])}
              {renderDropdown('Cooling Pieces', coolingPieces, (e) => setCoolingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], coolingFunction === 'none')}
              {renderDropdown('Cooling Power', coolingPower, (e) => setCoolingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], coolingFunction === 'none')}
              {renderDropdown('Cooling Voltage', coolingVoltage, (e) => setCoolingVoltage(e.target.value), ['24', '230', '380'], coolingFunction === 'none')}
              {renderDropdown('Cooling Coil Temperature', coolingTemperature, (e) => setCoolingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], coolingFunction === 'none')}

              {renderDropdown('Run Around Pump Control', pumpControl, (e) => setPumpControl(e.target.value), ['none', 'Dol', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
              {renderDropdown('Run Around Pump Pieces', pumpPieces, (e) => setPumpPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], pumpControl === 'none')}
              {renderDropdown('Run Around Pump Power', pumpPower, (e) => setPumpPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], pumpControl === 'none')}
              {renderDropdown('Run Around Pump Voltage', pumpVoltage, (e) => setPumpVoltage(e.target.value), ['230', '380'], pumpControl === 'none')}
              {renderDropdown('Run Around Temperature', runAroundTemperature, (e) => setRunAroundTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], pumpControl === 'none')}
              {renderDropdown('Heat Recovery Control', heatRecoveryControl, (e) => setHeatRecoveryControl(e.target.value), ['none', 'Heat Wheel with MCC', 'Heat Wheel with Packaged', 'Plate Recuperator'])}
              {renderDropdown('Heat Recovery Power', heatRecoveryPower, (e) => setHeatRecoveryPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11'], heatRecoveryControl === 'none')}
              {renderDropdown('Heat Recovery Voltage', heatRecoveryVoltage, (e) => setHeatRecoveryVoltage(e.target.value), ['230', '380'], heatRecoveryControl === 'none')}
              {renderDropdown('Humidification Function', humidificationFunction, (e) => setHumidificationFunction(e.target.value), ['none', 'Evaporative Humidifier', 'Staged Humidifier', 'Steam Humidifier'])}
              {renderDropdown('Humidification Pieces', humidificationPieces, (e) => setHumidificationPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], humidificationFunction === 'none')}
              {renderDropdown('Humidification Power', humidificationPower, (e) => setHumidificationPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], humidificationFunction === 'none')}
              {renderDropdown('Humidification Voltage', humidificationVoltage, (e) => setHumidificationVoltage(e.target.value), ['230', '380'], humidificationFunction === 'none')}
              {renderDropdown('Dehumidification Function', dehumidificationFunction, (e) => setDehumidificationFunction(e.target.value), ['none', 'Dehumidification'])}
              {renderDropdown('Dehumidification Pieces', dehumidificationPieces, (e) => setDehumidificationPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], dehumidificationFunction === 'none')}
              {renderDropdown('Dehumidification Power', dehumidificationPower, (e) => setDehumidificationPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], dehumidificationFunction === 'none')}
              {renderDropdown('Dehumidification Voltage', dehumidificationVoltage, (e) => setDehumidificationVoltage(e.target.value), ['230', '380'], dehumidificationFunction === 'none')}
              
              {renderDropdown('Fresh Damper Actuator', freshDamperActuator, (e) => setFreshDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Supply Damper Actuator', supplyDamperActuator, (e) => setSupplyDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Return Damper Actuator', returnDamperActuator, (e) => setReturnDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Exhaust Damper Actuator', exhaustDamperActuator, (e) => setExhaustDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Mixed Damper Actuator', mixedDamperActuator, (e) => setMixedDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Re Circilation Damper Actuator', recirculationDamperActuator, (e) => setRecirculationDamperActuator(e.target.value), ['none', 'On/Off', 'Proportional', '2x On/Off', '2x Proportional'])}
              {renderDropdown('Supply Air', supplyAirSensor, (e) => setSupplyAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'])}
              {renderDropdown('Fresh Air', freshAirSensor, (e) => setFreshAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'])}
              {renderDropdown('Return Air', returnAirSensor, (e) => setReturnAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Co2', 'Temperature, Humidity and Co2'])}
              {renderDropdown('Exhaust Air', exhaustAirSensor, (e) => setExhaustAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'])}
              {renderDropdown('Heat Exchanger Air', heatExchangerAirSensor, (e) => setHeatExchangerAirSensor(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'])}
              {renderDropdown('Mixed Air', mixedAirSensor, (e) => setMixedAirSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'])}
              {renderDropdown('Dehumidification', dehumidificationSensor, (e) => setDehumidificationSensor(e.target.value), ['none', 'Temperature', 'Humidity', 'Temperature and Humidity'])}
              
              {renderDropdown('Supply Filter', supplyFilter, (e) => setSupplyFilter(e.target.value), ['none', 'Analog', 'Digital'])}
              {renderDropdown('Fresh Filter', freshFilter, (e) => setFreshFilter(e.target.value), ['none', 'Analog', 'Digital'])}
              {renderDropdown('Return Filter', returnFilter, (e) => setReturnFilter(e.target.value), ['none', 'Analog', 'Digital'])}
              {renderDropdown('Recuperator Filter', recuperatorFilter, (e) => setRecuperatorFilter(e.target.value), ['none', 'Analog', 'Digital'])}
              {renderDropdown('Supply Flow', supplyFlow, (e) => setSupplyFlow(e.target.value), ['none', 'Pressure', 'Volume'])}
              {renderDropdown('Return Flow', returnFlow, (e) => setReturnFlow(e.target.value), ['none', 'Pressure', 'Volume'])}
              {renderDropdown('System Integration', systemIntegration, (e) => setSystemIntegration(e.target.value), ['none', 'Package', 'VFD'])}
              {renderDropdown('Protocol Integration', protocolIntegration, (e) => setProtocolIntegration(e.target.value), ['none', 'Modbus RTU', 'Modbus TCP', 'Bacnet MSTP', 'Bacnet IP'], systemIntegration === 'none')}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Total Integration Points"
                value={totalIntegrationPoints}
                onChange={(e) => setTotalIntegrationPoints(e.target.value)}
                disabled={systemIntegration === 'none'}
                InputProps={{
                  style: {
                    color: systemIntegration === 'none' ? '#888' : 'white',
                    backgroundColor: systemIntegration === 'none' ? '#1e1e1e' : 'transparent'
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: systemIntegration === 'none' ? '#555' : '#B0BEC5'
                  }
                }}
              />
              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveAhu}>Save Ahu</PrimaryButton>
              <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>Back to Project Overview</PrimaryButton>
            </Stack>
          </Box>
        </Container>

        {/* Tablo */}
        <Box sx={{ flex: 1, p: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', mr: 1, ml: 0, mt: 6, maxHeight: '85vh', overflowY: 'auto', color: 'white' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
  {projectCode ? `${projectCode} Output Table` : 'AHU Output Table'}
</Typography>

          {showTable && tableRows.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff',
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
