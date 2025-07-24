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
