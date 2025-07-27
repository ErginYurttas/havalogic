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

export default function AhuPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [ahuControl, setAhuControl] = useState('');
  const [ahuBrand, setAhuBrand] = useState('');
  const [fanControl, setFanControl] = useState('');
  const [vantilatorFanPieces, setVantilatorFanPieces] = useState('');
  const [fanPower, setFanPower] = useState('');
  const [fanVoltage, setFanVoltage] = useState('');
  const [aspControl, setAspControl] = useState('');
  const [aspPieces, setAspPieces] = useState('');
  const [aspPower, setAspPower] = useState('');
  const [aspVoltage, setAspVoltage] = useState('');
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
  const [preheatingFunction, setPreheatingFunction] = useState('');
  const [preheatingPieces, setPreheatingPieces] = useState('');
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
  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [doorSafety, setDoorSafety] = useState('');
  const [fireSafety, setFireSafety] = useState('');
  const [frostSafety, setFrostSafety] = useState('');
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

  const handleSaveAhu = () => {
    if (ahuControl !== 'MCC') {
      setTableRows([]);
      setShowTable(false);
      return;
    }

    const pieces = Number(vantilatorFanPieces) || 1;
    let rows: any[] = [];

    if (fanControl === 'Dol' || fanControl === 'Star-Delta') {
  const dolRows = [
    { point: 'Vantilator Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pieces; i++) {
    const suffix = pieces > 1 ? ` ${i}` : '';
    dolRows.forEach((row) => {
      rows.push({ ...row, point: `${row.point}${suffix}` });
    });
  }
}

    if (fanControl === 'VFD') {
  const vfdRows = [
    { point: 'Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
    { point: 'Fan Frequency Inverter Proportional Control', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Fan Frequency Inverter Feedback', ai: 0, ao: 1, di: 0, do: 0 }
  ];

  for (let i = 1; i <= pieces; i++) {
    const suffix = pieces > 1 ? ` ${i}` : '';
    vfdRows.forEach((row) => {
      rows.push({ ...row, point: `${row.point}${suffix}` });
    });
  }
}

    if (fanControl === 'VFD with By Pass Circuit' || fanControl === 'VFD with By Pass Circuit + Star-Delta') {
      const byPassRows = [
          { point: 'Fan Frequency Inverter Status', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan Frequency Inverter Fault', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan Frequency Inverter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan By/Pass Switch', ai: 0, ao: 0, di: 1, do: 0 },
          { point: 'Fan Frequency Inverter Command', ai: 0, ao: 0, di: 0, do: 1 },
          { point: 'Fan Frequency Inverter Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
          { point: 'Fan Frequency Inverter Feedback', ai: 1, ao: 0, di: 0, do: 0 }
        ];

    for (let i = 1; i <= pieces; i++) {
      byPassRows.forEach(item => {
        rows.push({
          projectCode,
          description,
          location,
          point: pieces > 1 ? `${item.point} ${i}` : item.point,
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

if (fanControl === 'Soft Starter') { 
  const softStarterRows = [
    { point: 'Vantilator Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pieces; i++) {
    const suffix = pieces > 1 ? ` ${i}` : '';
    softStarterRows.forEach((row) => {
      rows.push({ ...row, point: `${row.point}${suffix}` });
    });
  }
}

if (fanControl === 'Soft Starter with By Pass Circuit'|| fanControl === 'Soft Starter with By Pass Circuit + Star-Delta') {
  const softBypassRows = [
    { point: 'Vantilator Fan Soft Starter Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Contactor Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Circuit Breaker Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan By Pass Switch Auto/Manual', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pieces; i++) {
    const suffix = pieces > 1 ? ` ${i}` : '';
    softBypassRows.forEach((row) => {
      rows.push({
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

if (fanControl === 'EC') {
  const ecRows = [
    { point: 'Vantilator EC Fan Status', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator EC Fan Fault', ai: 0, ao: 0, di: 1, do: 0 },
    { point: 'Vantilator EC Fan Proportional Control', ai: 0, ao: 1, di: 0, do: 0 },
    { point: 'Vantilator EC Fan Feedback', ai: 1, ao: 0, di: 0, do: 0 },
    { point: 'Vantilator EC Fan Soft Starter Command', ai: 0, ao: 0, di: 0, do: 1 }
  ];

  for (let i = 1; i <= pieces; i++) {
    const suffix = pieces > 1 ? ` ${i}` : '';
    ecRows.forEach((row) => {
      rows.push({
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
    rows = rows.map(row => ({
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

    setTableRows(rows);
    setShowTable(true);
  };


  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top right, #1A237E, #000000)', color: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <Box sx={{ py: 2, px: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
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
              {renderDropdown('Vantilator Control', fanControl, (e) => setFanControl(e.target.value), ['Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
              {renderDropdown('Vantilator Pieces', vantilatorFanPieces, (e) => setVantilatorFanPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
              {renderDropdown('Vantilator Power', fanPower, (e) => setFanPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
              {renderDropdown('Vantilator Voltage', fanVoltage, (e) => setFanVoltage(e.target.value), ['230', '380'])}
              {renderDropdown('Aspirator Control', aspControl, (e) => setAspControl(e.target.value), ['Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Soft Starter with By Pass Circuit + Star-Delta','Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
              {renderDropdown('Aspirator Pieces', aspPieces, (e) => setAspPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], aspControl === 'none')}
              {renderDropdown('Aspirator Power', aspPower, (e) => setAspPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], aspControl === 'none')}
              {renderDropdown('Aspirator Voltage', aspVoltage, (e) => setAspVoltage(e.target.value), ['230', '380'], aspControl === 'none')}
              {renderDropdown('Run Around Pump Control', pumpControl, (e) => setPumpControl(e.target.value), ['none', 'Dol', 'Ec', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
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
              {renderDropdown('Preheating Function', preheatingFunction, (e) => setPreheatingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged Electrical Heater', 'Proportional Electrical Heater'])}
              {renderDropdown('Preheating Pieces', preheatingPieces, (e) => setPreheatingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], preheatingFunction === 'none')}
              {renderDropdown('Preheating Power', preheatingPower, (e) => setPreheatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], preheatingFunction === 'none')}
              {renderDropdown('Preheating Voltage', preheatingVoltage, (e) => setPreheatingVoltage(e.target.value), ['24', '230', '380'], preheatingFunction === 'none')}
              {renderDropdown('Preheating Temperature', preheatingTemperature, (e) => setPreheatingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], preheatingFunction === 'none')}
              {renderDropdown('Heating Function', heatingFunction, (e) => setHeatingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged Electrical Heater', 'Proportional Electrical Heater'])}
              {renderDropdown('Heating Pieces', heatingPieces, (e) => setHeatingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], heatingFunction === 'none')}
              {renderDropdown('Heating Power', heatingPower, (e) => setHeatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], heatingFunction === 'none')}
              {renderDropdown('Heating Voltage', heatingVoltage, (e) => setHeatingVoltage(e.target.value), ['24', '230', '380'], heatingFunction === 'none')}
              {renderDropdown('Heating Temperature', heatingTemperature, (e) => setHeatingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], heatingFunction === 'none')}
              {renderDropdown('Cooling Function', coolingFunction, (e) => setCoolingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged DX Unit', 'Proportional DX Unit'])}
              {renderDropdown('Cooling Pieces', coolingPieces, (e) => setCoolingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], coolingFunction === 'none')}
              {renderDropdown('Cooling Power', coolingPower, (e) => setCoolingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], coolingFunction === 'none')}
              {renderDropdown('Cooling Voltage', coolingVoltage, (e) => setCoolingVoltage(e.target.value), ['24', '230', '380'], coolingFunction === 'none')}
              {renderDropdown('Cooling Temperature', coolingTemperature, (e) => setCoolingTemperature(e.target.value), ['none', 'Inlet Temperature', 'Outlet Temperature', 'Inlet and Outlet Temperature'], coolingFunction === 'none')}
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
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Door Safety Contacts', doorSafety, (e) => setDoorSafety(e.target.value), ['none', 'for Each Fan', 'for All Fans'])}
              {renderDropdown('Fire Safety Contacts', fireSafety, (e) => setFireSafety(e.target.value), ['none', 'only Viewing', 'Viewing and Control'])}
              {renderDropdown('Frost Safety Contacts', frostSafety, (e) => setFrostSafety(e.target.value), ['none', 'Automatic Reset', 'Manual Reset'])}
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
          <Typography variant="h6" sx={{ mb: 2 }}>AHU Output Table</Typography>

          {showTable && tableRows.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', border: '1px solid #ccc', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#263238' }}>
                  {['Project Code', 'Description', 'Located', 'Point Name', 'AI', 'AO', 'DI', 'DO', 'Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP', 'Mbus'].map((header, i) => (
                    <th key={i} style={{ border: '1px solid #ccc', padding: '8px', fontWeight: '600' }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#37474F' : '#455A64' }}>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.description}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.location}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.point}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.di}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.do}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #ccc', padding: '6px' }}>{row.mbus}</td>
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
