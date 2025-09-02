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
  MenuItem,
  Snackbar,
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
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
});

const PrimaryButton = styled(ModernButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  borderColor: 'transparent',
  '&:hover': {
    backgroundColor: '#1565c0',
    borderColor: 'transparent',
  },
});

const selectStyles = {
  color: '#ECEFF1',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' },
  '&.Mui-disabled': { color: '#888', backgroundColor: '#1e1e1e' },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
  svg: { color: '#90A4AE' },
} as const;

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' },
} as const;

export default function UnitHeaterPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Common meta
  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Control Type
  const [controlType, setControlType] = useState(''); // 'with DDC' | 'Thermostat'

  // DDC alanları
  const [pieces, setPieces] = useState('');
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('');

  // Heating
  const [heatingFunction, setHeatingFunction] = useState('');
  const [heatingPower, setHeatingPower] = useState('');
  const [heatingVoltage, setHeatingVoltage] = useState('');

  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [doorSafety, setDoorSafety] = useState('');


  // Room sensor
  const [roomSensor, setRoomSensor] = useState(''); // 'none' | 'Temperature' | 'Temperature and Humidity'

  // Thermostat integration (sadece thermostat tarafı kaldı)
  const [thermostatIntegration, setThermostatIntegration] = useState(''); // 'none' | 'Thermostat'
  const [thermostatProtocol, setThermostatProtocol] = useState('');
  const [thermostatIntegrationPoints, setThermostatIntegrationPoints] = useState('');

  // Table + Snackbar
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  // Dropdown helper
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
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const disSafety = controlType === 'Thermostat';


  // ===== Effects: cleanup / disable zincirleri =====
  // with DDC seçilince thermostat alanlarını temizle
  useEffect(() => {
    if (controlType === 'with DDC') {
      setThermostatIntegration('');
      setThermostatProtocol('');
      setThermostatIntegrationPoints('');
    }
  }, [controlType]);

  // Thermostat seçilince DDC alanlarını ve heater/room sensörü temizle
  useEffect(() => {
    if (controlType === 'Thermostat') {
      setPieces('');
      setPower('');
      setVoltage('');
      setHeatingFunction('');
      setHeatingPower('');
      setHeatingVoltage('');
      setRoomSensor('');
    }
  }, [controlType]);





  // Heating function valve tipinde veya 'none' ise power/voltage temizle
  useEffect(() => {
    const valveFunctions = [
      'On/Off Valve Actuator',
      'On/Off Valve Actuator with Feedback',
      'Floating Valve Actuator',
      'Floating Valve Actuator with Feedback',
      'Proportional Valve Actuator',
      'Proportional Valve Actuator with Feedback',
    ];
    const shouldClear = valveFunctions.includes(heatingFunction) || heatingFunction === 'none';
    if (shouldClear) {
      setHeatingPower('');
      setHeatingVoltage('');
    }
  }, [heatingFunction]);

  // ===== Build table rows =====
  const handleSaveUnitHeater = () => {
    const rows: any[] = [];

// --- Control Type: with DDC -> sabit hard points ---
  if (controlType === 'with DDC') {
    const pcs = Math.max(1, parseInt(pieces || '1', 10) || 1);
    const isMultiple = pcs > 1;

    for (let i = 1; i <= pcs; i++) {
      const suffix = isMultiple ? ` ${i}` : '';

      rows.push({
        projectCode, description, location,
        point: `Unit Heater Status${suffix}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });

      rows.push({
        projectCode, description, location,
        point: `Unit Heater Fault${suffix}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });

      rows.push({
        projectCode, description, location,
        point: `Unit Heater Auto / Manual${suffix}`,
        ai: 0, ao: 0, di: 1, do: 0,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });

      rows.push({
        projectCode, description, location,
        point: `Unit Heater Command${suffix}`,
        ai: 0, ao: 0, di: 0, do: 1,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
  }


    // --- Safety Contacts (Maintenance / Emergency / Door) ---
const pcs = parseInt(pieces) || 1;
const isMultiple = pcs > 1;

// Maintenance
if (maintenanceSafety === 'for Each Unit Heater') {
  for (let i = 1; i <= pcs; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    rows.push({
      projectCode, description, location,
      point: `Unit Heater Maintenance Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (maintenanceSafety === 'for All Unit Heaters') {
  rows.push({
    projectCode, description, location,
    point: 'Unit Heaters Group Maintenance Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

// Emergency
if (emergencySafety === 'for Each Unit Heater') {
  for (let i = 1; i <= pcs; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    rows.push({
      projectCode, description, location,
      point: `Unit Heater Emergency Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (emergencySafety === 'for All Unit Heaters') {
  rows.push({
    projectCode, description, location,
    point: 'Unit Heaters Group Emergency Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}

// Door
if (doorSafety === 'for Each Unit Heater') {
  for (let i = 1; i <= pcs; i++) {
    const suffix = isMultiple ? ` ${i}` : '';
    rows.push({
      projectCode, description, location,
      point: `Unit Heater Door Safety${suffix}`,
      ai: 0, ao: 0, di: 1, do: 0,
      modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
    });
  }
} else if (doorSafety === 'for All Unit Heaters') {
  rows.push({
    projectCode, description, location,
    point: 'Unit Heaters Group Door Safety',
    ai: 0, ao: 0, di: 1, do: 0,
    modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
  });
}


    // --- Heating Function ---
    if (heatingFunction === 'On/Off Valve Actuator') {
      rows.push({
        projectCode,
        description,
        location,
        point: 'Heating Valve Command',
        ai: 0,
        ao: 0,
        di: 0,
        do: 1,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    if (heatingFunction === 'On/Off Valve Actuator with Feedback') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === 'Floating Valve Actuator') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Open Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Close Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === 'Floating Valve Actuator with Feedback') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Open Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Close Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Open Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Close Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === 'Proportional Valve Actuator') {
      rows.push({
        projectCode,
        description,
        location,
        point: 'Heating Valve Proportional Command',
        ai: 0,
        ao: 1,
        di: 0,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    }

    if (heatingFunction === 'Proportional Valve Actuator with Feedback') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Proportional Command',
          ai: 0,
          ao: 1,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Valve Proportional Feedback',
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === '1-Staged Electrical Heater') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Air Flow',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === '2-Staged Electrical Heater') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Air Flow',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === '3-Staged Electrical Heater') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-1 Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-2 Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-3 Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-3 Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater-3 Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Electrical Heater Air Flow',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    if (heatingFunction === 'Proportional Electrical Heater') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Heating Proportional Electrical Heater Status',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Proportional Electrical Heater Fault',
          ai: 0,
          ao: 0,
          di: 1,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Proportional Electrical Heater Command',
          ai: 0,
          ao: 0,
          di: 0,
          do: 1,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Proportional Electrical Heater Proportional Control',
          ai: 0,
          ao: 1,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Heating Proportional Electrical Heater Feedback',
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    // --- Room Sensor ---
    if (roomSensor === 'Temperature') {
      rows.push({
        projectCode,
        description,
        location,
        point: 'Room Temperature',
        ai: 1,
        ao: 0,
        di: 0,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      });
    } else if (roomSensor === 'Temperature and Humidity') {
      rows.push(
        {
          projectCode,
          description,
          location,
          point: 'Room Temperature',
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        },
        {
          projectCode,
          description,
          location,
          point: 'Room Humidity',
          ai: 1,
          ao: 0,
          di: 0,
          do: 0,
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0,
          mbus: 0,
        }
      );
    }

    // --- Thermostat Integration (yalnızca Thermostat tarafı) ---
    if (
      thermostatIntegration === 'Thermostat' &&
      ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'].includes(thermostatProtocol) &&
      thermostatIntegrationPoints.trim() !== '' &&
      !isNaN(Number(thermostatIntegrationPoints))
    ) {
      const pts = Number(thermostatIntegrationPoints);
      const row: any = {
        projectCode,
        description,
        location,
        point: 'Unit Heater Thermostat Integration Points',
        ai: 0,
        ao: 0,
        di: 0,
        do: 0,
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0,
      };
      switch (thermostatProtocol) {
        case 'Modbus RTU':
          row.modbusRtu = pts;
          break;
        case 'Modbus TCP IP':
          row.modbusTcp = pts;
          break;
        case 'Bacnet MSTP':
          row.bacnetMstp = pts;
          break;
        case 'Bacnet IP':
          row.bacnetIp = pts;
          break;
      }
      rows.push(row);
    }

    setTableRows(rows);
    setShowTable(true);
    setMaintenanceSafety('');
    setEmergencySafety('');
    setDoorSafety('');

  };

  // ===== Pool: Collector/AirCurtain ile aynı mantık =====
  // Anahtar: tablodaki Project Code'a göre yaz
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
      system: 'unitHeater',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location },
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
    setSnackbarOpen(true);

    // Temizle
    setTableRows([]);
    setShowTable(false);
  };

  // Disable kuralları
  const disThermostatFields = controlType === 'with DDC';
  const disDdcSide = controlType === 'Thermostat';

  const disHeatingPower =
    disDdcSide || ['none', 'On/Off Valve Actuator', 'On/Off Valve Actuator with Feedback', 'Floating Valve Actuator', 'Floating Valve Actuator with Feedback', 'Proportional Valve Actuator', 'Proportional Valve Actuator with Feedback'].includes(heatingFunction);
  const disHeatingVoltage = disHeatingPower;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top right, #1A237E, #000000)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          py: 2,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          <Box component="span" sx={{ color: '#1976d2' }}>
            hava
          </Box>
          <Box component="span" sx={{ color: '#B0BEC5' }}>
            logic
          </Box>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500, color: '#1976d2' }}>
            {loggedInUser || 'User'}
          </Typography>
          <PrimaryButton startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />} onClick={handleLogout} sx={{ minWidth: '100px' }}>
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Form */}
        <Container maxWidth="sm" sx={{ py: 6, px: 2, maxWidth: '600px', ml: 4, mr: 2 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              p: 4,
              width: '400px',
              maxWidth: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Unit Heater System Input
            </Typography>
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
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
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
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              <TextField
                label="Located"
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
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown('Control Type', controlType, (e) => setControlType(e.target.value), ['with DDC', 'Thermostat'])}

              {renderDropdown('Thermostat Integration', thermostatIntegration, (e) => setThermostatIntegration(e.target.value), ['none', 'Thermostat'], disThermostatFields)}

              {renderDropdown(
                'Thermostat Protocol',
                thermostatProtocol,
                (e) => setThermostatProtocol(e.target.value),
                ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],
                disThermostatFields || thermostatIntegration === 'none'
              )}

              <TextField
                label="Thermostat Integration Points"
                value={thermostatIntegrationPoints}
                onChange={(e) => setThermostatIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={disThermostatFields || thermostatIntegration === 'none'}
                InputLabelProps={{ sx: { ...labelStyles, '&.Mui-disabled': { color: '#888' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermostatFields || thermostatIntegration === 'none' ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermostatFields || thermostatIntegration === 'none' ? '#555' : '#90A4AE',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: disThermostatFields || thermostatIntegration === 'none' ? '#555' : '#CFD8DC',
                  },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: disThermostatFields || thermostatIntegration === 'none' ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value), ['1', '2', '3', '4', '5', '6', '7', '8'], disDdcSide)}

              {renderDropdown('Power', power, (e) => setPower(e.target.value), ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'], disDdcSide)}

              {renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value), ['230', '380'], disDdcSide)}

{renderDropdown(
  'Maintenance Safety Contacts',
  maintenanceSafety,
  (e) => setMaintenanceSafety(e.target.value),
  ['none', 'for Each Unit Heater', 'for All Unit Heaters'],
  disSafety
)}

{renderDropdown(
  'Emergency Safety Contacts',
  emergencySafety,
  (e) => setEmergencySafety(e.target.value),
  ['none', 'for Each Unit Heater', 'for All Unit Heaters'],
  disSafety
)}

{renderDropdown(
  'Door Safety Contacts',
  doorSafety,
  (e) => setDoorSafety(e.target.value),
  ['none', 'for Each Unit Heater', 'for All Unit Heaters'], // istersen "Heater" tekil de yazılabilir
  disSafety
)}



              {renderDropdown(
                'Heating Function',
                heatingFunction,
                (e) => setHeatingFunction(e.target.value),
                [
                  'none',
                  'On/Off Valve Actuator',
                  'On/Off Valve Actuator with Feedback',
                  'Floating Valve Actuator',
                  'Floating Valve Actuator with Feedback',
                  'Proportional Valve Actuator',
                  'Proportional Valve Actuator with Feedback',
                  '1-Staged Electrical Heater',
                  '2-Staged Electrical Heater',
                  '3-Staged Electrical Heater',
                  'Proportional Electrical Heater',
                ],
                disDdcSide
              )}

              {renderDropdown(
                'Heating Power',
                heatingPower,
                (e) => setHeatingPower(e.target.value),
                ['0,55', '0,75', '1,1', '1,5', '2,2', '3', '4', '5,5', '7,5', '11', '15', '18,5', '22', '30', '37', '45', '55', '75', '90', '110', '132', '160'],
                disHeatingPower
              )}

              {renderDropdown('Heating Voltage', heatingVoltage, (e) => setHeatingVoltage(e.target.value), ['230', '380'], disHeatingVoltage)}

              {renderDropdown('Room Sensor', roomSensor, (e) => setRoomSensor(e.target.value), ['none', 'Temperature', 'Temperature and Humidity'], disDdcSide)}

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveUnitHeater}>
                Send to Table
              </PrimaryButton>

              <PrimaryButton sx={{ width: '100%' }} onClick={handleAddPool} disabled={tableRows.length === 0}>
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
            {projectCode ? `${projectCode} Output Table` : 'Unit Heater Output Table'}
          </Typography>

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
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#f0f4f8' }}>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.projectCode}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.description}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.location}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.point}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.ai}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.ao}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.di}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.do}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.modbusRtu}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.modbusTcp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.bacnetMstp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.bacnetIp}</td>
                    <td style={{ border: '1px solid #e0e0e0', padding: '8px' }}>{row.mbus}</td>
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
