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
  const [fanPieces, setFanPieces] = useState('');
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
  const [heatingFunction, setHeatingFunction] = useState('');
  const [heatingPieces, setHeatingPieces] = useState('');
  const [heatingPower, setHeatingPower] = useState('');
  const [heatingVoltage, setHeatingVoltage] = useState('');
  const [coolingFunction, setCoolingFunction] = useState('');
  const [coolingPieces, setCoolingPieces] = useState('');
  const [coolingPower, setCoolingPower] = useState('');
  const [coolingVoltage, setCoolingVoltage] = useState('');
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
    options: string[]
  ) => (
    <FormControl fullWidth>
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #1A237E, #000000)',
        color: '#FFFFFF'
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="body1"
            sx={{ mr: 2, fontWeight: 500, color: '#1976d2' }}
          >
            {loggedInUser || 'User'}
          </Typography>
          <PrimaryButton
            startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />}
            onClick={handleLogout}
            sx={{ minWidth: '100px' }}
          >
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Content */}
      <Container
        maxWidth="sm"
        sx={{
          py: 6,
          px: 2,
          maxWidth: '600px',
          ml: 4,
          mr: 'auto'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            p: 4,
            width: '400px',
            maxWidth: '100%',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            AHU System Input
          </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="AHU Project Code"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="AHU Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="AHU Located"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            {/* Dropdownlar */}
            {renderDropdown('AHU Control Type', ahuControl, (e) => setAhuControl(e.target.value), ['MCC', 'Own Panel', 'Smart'])}
            {renderDropdown('AHU Brand', ahuBrand, (e) => setAhuBrand(e.target.value), ['Arçelik', 'Blue Star Limited', 'Carrier', 'Daikin', 'Hitachi', 'Johnson Control', 'Lennox', 'Swegon Group', 'Systemair', 'Teba', 'Trane', 'Trox', 'Üntes'])}
            {renderDropdown('Vantilator Control', fanControl, (e) => setFanControl(e.target.value), ['Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
            {renderDropdown('Vantilator Pieces', fanPieces, (e) => setFanPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Vantilator Power', fanPower, (e) => setFanPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Vantilator Voltage', fanVoltage, (e) => setFanVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Aspirator Control', aspControl, (e) => setAspControl(e.target.value), ['none', 'Dol', 'EC', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
            {renderDropdown('Aspirator Pieces', aspPieces, (e) => setAspPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Aspirator Power', aspPower, (e) => setAspPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Aspirator Voltage', aspVoltage, (e) => setAspVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Run Around Pump Control', pumpControl, (e) => setPumpControl(e.target.value), ['none', 'Dol', 'Power Supply Only', 'Soft Starter', 'Soft Starter with By Pass Circuit', 'Star-Delta', 'VFD', 'VFD with By Pass Circuit', 'VFD with By Pass Circuit + Star-Delta'])}
            {renderDropdown('Run Around Pump Pieces', pumpPieces, (e) => setPumpPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Run Around Pump Power', pumpPower, (e) => setPumpPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Run Around Pump Voltage', pumpVoltage, (e) => setPumpVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Heat Recovery Control', heatRecoveryControl, (e) => setHeatRecoveryControl(e.target.value), ['none', 'Heat Wheel with MCC', 'Heat Wheel with Packaged', 'Plate Recuperator'])}
            {renderDropdown('Heat Recovery Power', heatRecoveryPower, (e) => setHeatRecoveryPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11'])}
            {renderDropdown('Heat Recovery Voltage', heatRecoveryVoltage, (e) => setHeatRecoveryVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Humidification Function', humidificationFunction, (e) => setHumidificationFunction(e.target.value), ['none', 'Evaporative Humidifier', 'Staged Humidifier', 'Steam Humidifier'])}
            {renderDropdown('Humidification Pieces', humidificationPieces, (e) => setHumidificationPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Humidification Power', humidificationPower, (e) => setHumidificationPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Humidification Voltage', humidificationVoltage, (e) => setHumidificationVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Dehumidification Function', dehumidificationFunction, (e) => setDehumidificationFunction(e.target.value), ['none', 'Dehumidification'])}
            {renderDropdown('Dehumidification Pieces', dehumidificationPieces, (e) => setDehumidificationPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Dehumidification Power', dehumidificationPower, (e) => setDehumidificationPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Dehumidification Voltage', dehumidificationVoltage, (e) => setDehumidificationVoltage(e.target.value), ['230', '380'])}
            {renderDropdown('Preheating Function', preheatingFunction, (e) => setPreheatingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged Electrical Heater', 'Proportional Electrical Heater'])}
            {renderDropdown('Preheating Pieces', preheatingPieces, (e) => setPreheatingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Preheating Power', preheatingPower, (e) => setPreheatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Preheating Voltage', preheatingVoltage, (e) => setPreheatingVoltage(e.target.value), ['24', '230', '380'])}
            {renderDropdown('Heating Function', heatingFunction, (e) => setHeatingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged Electrical Heater', 'Proportional Electrical Heater'])}
            {renderDropdown('Heating Pieces', heatingPieces, (e) => setHeatingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Heating Power', heatingPower, (e) => setHeatingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Heating Voltage', heatingVoltage, (e) => setHeatingVoltage(e.target.value), ['24', '230', '380'])}
            {renderDropdown('Cooling Function', coolingFunction, (e) => setCoolingFunction(e.target.value), ['none', 'On/Off Valve Actuator', 'Proportional Valve Actuator', 'Staged DX Unit', 'Proportional DX Unit'])}
            {renderDropdown('Cooling Pieces', coolingPieces, (e) => setCoolingPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'])}
            {renderDropdown('Cooling Power', coolingPower, (e) => setCoolingPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'])}
            {renderDropdown('Cooling Voltage', coolingVoltage, (e) => setCoolingVoltage(e.target.value), ['24', '230', '380'])}
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



            <PrimaryButton sx={{ width: '100%' }}>Save Ahu</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>
              Back to Project Overview
            </PrimaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
