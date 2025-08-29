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
} as const;

const labelStyles = {
  color: '#90A4AE',
  '&.Mui-focused': { color: '#B0BEC5' }
};

export default function HeatReclaimPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [controlType, setControlType] = useState(''); // 'none' | 'Local' | 'own Panel'
  const [controlProtocolIntegration, setControlProtocolIntegration] = useState('');
  const [controlPanelIntegrationPoints, setControlPanelIntegrationPoints] = useState('');
  const [controlPanelHardPoints, setControlPanelHardPoints] = useState('');

  const [pieces, setPieces] = useState('');
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('');

  const [maintenanceSafety, setMaintenanceSafety] = useState('');
  const [emergencySafety, setEmergencySafety] = useState('');
  const [fireSafety, setFireSafety] = useState('');
  const [heatingValveFunction, setHeatingValveFunction] = useState('');
  const [coolingValveFunction, setCoolingValveFunction] = useState('');

  const [temperatureMeasurement, setTemperatureMeasurement] = useState('');

  const [freshAirFilter, setFreshAirFilter] = useState('');
  const [supplyAirFilter, setSupplyAirFilter] = useState('');
  const [returnAirFilter, setReturnAirFilter] = useState('');

  const [vfdIntegration, setVfdIntegration] = useState('');
  const [vfdProtocolIntegration, setVfdProtocolIntegration] = useState('');
  const [vfdIntegrationPoints, setVfdIntegrationPoints] = useState('');

  const isControlLocal = controlType === 'Local';
  const isControlOwnPanel = controlType === 'own Panel';
  const isVfdNone = vfdIntegration !== 'VFD';

  const [tableRows, setTableRows] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const handleLogout = () => navigate('/');
  const handleBack = () => navigate('/projects');

  // Control Type = Local => panel entegrasyon alanlarını temizle
  useEffect(() => {
    if (isControlLocal) {
      setControlProtocolIntegration('');
      setControlPanelIntegrationPoints('');
      setControlPanelHardPoints('');
    }
  }, [isControlLocal]);

  // Control Type = own Panel => listelenen diğer alanları temizle
  useEffect(() => {
    if (isControlOwnPanel) {
      setPieces('');
      setPower('');
      setVoltage('');
      setMaintenanceSafety('');
      setEmergencySafety('');
      setFireSafety('');
      setHeatingValveFunction('');
      setCoolingValveFunction('');
      setTemperatureMeasurement('');
      setFreshAirFilter('');
      setSupplyAirFilter('');
      setReturnAirFilter('');
      setVfdIntegration('');
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
  }, [isControlOwnPanel]);

  // VFD Integration = none => alt alanları temizle
  useEffect(() => {
    if (isVfdNone) {
      setVfdProtocolIntegration('');
      setVfdIntegrationPoints('');
    }
  }, [isVfdNone]);

  const renderDropdown = (
    label: string,
    value: string,
    onChange: (e: SelectChangeEvent<string>) => void,
    options: string[],
    disabled: boolean = false
  ) => (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel sx={labelStyles}>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange} sx={selectStyles}>
        {options.map((opt, i) => (
          <MenuItem key={i} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const handleSaveHeatReclaim = () => {
    const rows: any[] = [];

    // Pieces — boşsa 1 kabul edilir
    const numPieces = Math.max(parseInt(pieces) || 1, 1);
    const suffix = (i: number) => (numPieces > 1 ? ` ${i}` : '');

    // 1) Control Type 'none' ya da boş ise satır ekleme, sadece tabloyu aç
    if (controlType === 'none' || controlType === '') {
      setTableRows([]);
      setShowTable(true);
      return;
    }

    // 2) Control Type 'Local' ise: Status/Fault/Command — parça sayısına göre
    if (controlType === 'Local') {
      for (let i = 1; i <= numPieces; i++) {
        rows.push(
          {
            point: `Heat Reclaim Unit Status${suffix(i)}`,
            description, location,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          },
          {
            point: `Heat Reclaim Unit Fault${suffix(i)}`,
            description, location,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          },
          {
            point: `Heat Reclaim Unit Command${suffix(i)}`,
            description, location,
            ai: 0, ao: 0, di: 0, do: 1,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          }
        );
      }
    }

    // 3) Control Type 'own Panel' ise: Integration satırı
    if (controlType === 'own Panel') {
      if (controlProtocolIntegration !== '' && controlPanelIntegrationPoints !== '') {
        const parsedPoints = parseInt(controlPanelIntegrationPoints) || 0;

        const protocol = {
          modbusRtu: 0,
          modbusTcp: 0,
          bacnetMstp: 0,
          bacnetIp: 0
        };

        switch (controlProtocolIntegration) {
          case 'Modbus RTU':    protocol.modbusRtu  = parsedPoints; break;
          case 'Modbus TCP IP': protocol.modbusTcp  = parsedPoints; break;
          case 'Bacnet MSTP':   protocol.bacnetMstp = parsedPoints; break;
          case 'Bacnet IP':     protocol.bacnetIp   = parsedPoints; break;
          default: break;
        }

        rows.push({
          point: 'Heat Reclaim Control Unit Integration',
          description, location,
          ai: 0, ao: 0, di: 0, do: 0,
          modbusRtu: protocol.modbusRtu,
          modbusTcp: protocol.modbusTcp,
          bacnetMstp: protocol.bacnetMstp,
          bacnetIp: protocol.bacnetIp,
          mbus: 0,
          projectCode
        });
      }
    }

    // 4) Control Panel Hard Points
    if (controlPanelHardPoints === 'Statuses' || controlPanelHardPoints === 'Statuses and Command') {
      rows.push(
        {
          point: 'Heat Reclaim Control Unit General Status',
          description, location,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
          projectCode
        },
        {
          point: 'Heat Reclaim Control Unit General Fault',
          description, location,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
          projectCode
        }
      );
    }
    if (controlPanelHardPoints === 'Command' || controlPanelHardPoints === 'Statuses and Command') {
      rows.push({
        point: 'Heat Reclaim Control Unit General Command',
        description, location,
        ai: 0, ao: 0, di: 0, do: 1,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
        projectCode
      });
    }

    // 5) Maintenance
    const maintenanceRows: any[] = [];
    if (maintenanceSafety === 'for Each Heat Reclaim' && controlType !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        maintenanceRows.push({
          point: `Heat Reclaim Maintenance Status${numPieces > 1 ? ` ${i}` : ''}`,
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    } else if (maintenanceSafety === 'for All Heat Reclaim' && controlType !== 'none') {
      maintenanceRows.push({
        point: 'Heat Reclaim General Maintenance Status',
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
    rows.push(...maintenanceRows);

    // 6) Emergency
    const emergencyRows: any[] = [];
    if (emergencySafety === 'for Each Heat Reclaim' && controlType !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        emergencyRows.push({
          point: `Heat Reclaim Emergency Status${numPieces > 1 ? ` ${i}` : ''}`,
          ai: 0, ao: 0, di: 1, do: 0,
          projectCode, description, location,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
        });
      }
    } else if (emergencySafety === 'for All Heat Reclaim' && controlType !== 'none') {
      emergencyRows.push({
        point: 'Heat Reclaim General Emergency Status',
        ai: 0, ao: 0, di: 1, do: 0,
        projectCode, description, location,
        modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0
      });
    }
    rows.push(...emergencyRows);

    // 7) Fire Safety
    if (fireSafety && fireSafety !== 'none') {
      if (fireSafety === 'only Viewing' || fireSafety === 'Viewing and Control') {
        rows.push({
          point: 'Heat Reclaim Fire Status',
          description, location,
          ai: 0, ao: 0, di: 1, do: 0,
          modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
          projectCode
        });
      }
    }

    // 8) Heating Valve Function
    for (let i = 1; i <= numPieces; i++) {
      const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

      switch (heatingValveFunction) {
        case 'none':
        case '':
          break;
        case 'On/Off Valve Actuator':
          rows.push({
            point: `Heat Reclaim Heating On/Off Valve Command${pieceSuffix}`,
            description, location,
            ai: 0, ao: 0, di: 0, do: 1,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });
          break;
        case 'On/Off Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Heating On/Off Valve Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating On/Off Valve Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Floating Valve Actuator':
          rows.push(
            {
              point: `Heat Reclaim Heating Floating Valve Open Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating Floating Valve Close Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Floating Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Heating Floating Valve Open Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating Floating Valve Close Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating Floating Valve Open Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating Floating Valve Close Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Proportional Valve Actuator':
          rows.push({
            point: `Heat Reclaim Heating Proportional  Valve Control${pieceSuffix}`,
            description, location,
            ai: 0, ao: 1, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });
          break;
        case 'Proportional Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Heating Proportional  Valve Control${pieceSuffix}`,
              description, location,
              ai: 0, ao: 1, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Heating Proportional  Valve Feedback${pieceSuffix}`,
              description, location,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        default:
          break;
      }
    }

    // 9) Cooling Valve Function
    for (let i = 1; i <= numPieces; i++) {
      const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

      switch (coolingValveFunction) {
        case 'none':
        case '':
          break;
        case 'On/Off Valve Actuator':
          rows.push({
            point: `Heat Reclaim Cooling On/Off Valve Command${pieceSuffix}`,
            description, location,
            ai: 0, ao: 0, di: 0, do: 1,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });
          break;
        case 'On/Off Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Cooling On/Off Valve Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling On/Off Valve Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Floating Valve Actuator':
          rows.push(
            {
              point: `Heat Reclaim Cooling Floating Valve Open Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling Floating Valve Close Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Floating Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Cooling Floating Valve Open Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling Floating Valve Close Command${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 0, do: 1,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling Floating Valve Open Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling Floating Valve Close Status${pieceSuffix}`,
              description, location,
              ai: 0, ao: 0, di: 1, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            }
          );
          break;
        case 'Proportional Valve Actuator':
          rows.push({
            point: `Heat Reclaim Cooling Proportional  Valve Control${pieceSuffix}`,
            description, location,
            ai: 0, ao: 1, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });
          break;
        case 'Proportional Valve Actuator with Feedback':
          rows.push(
            {
              point: `Heat Reclaim Cooling Proportional  Valve Control${pieceSuffix}`,
              description, location,
              ai: 0, ao: 1, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
              projectCode
            },
            {
              point: `Heat Reclaim Cooling Proportional  Valve Feedback${pieceSuffix}`,
              description, location,
              ai: 1, ao: 0, di: 0, do: 0,
              modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, mbus: 0, bacnetIp: 0,
              projectCode
            }
          );
          break;
        default:
          break;
      }
    }

    // 10) Temperature Measurement
    if (temperatureMeasurement && temperatureMeasurement !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

        const addTempRow = (label: string) =>
          rows.push({
            point: `Heat Reclaim ${label}${pieceSuffix}`,
            description, location,
            ai: 1, ao: 0, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        switch (temperatureMeasurement) {
          case 'Supply Air Temperature':
            addTempRow('Supply Air Temperature'); break;
          case 'Return Air Temperature':
            addTempRow('Return Air Temperature'); break;
          case 'Fresh Air Temperature':
            addTempRow('Fresh Air Temperature'); break;
          case 'Exhaust Air Temperature':
            addTempRow('Exhaust Air Temperature'); break;
          case 'Inside Air Temperature':
            addTempRow('Supply Air Temperature');
            addTempRow('Return Air Temperature'); break;
          case 'Outside Air Temperature':
            addTempRow('Fresh Air Temperature');
            addTempRow('Exhaust Air Temperature'); break;
          case 'Inlet Air Temperature':
            addTempRow('Fresh Air Temperature');
            addTempRow('Supply Air Temperature'); break;
          case 'Outlet Air Temperature':
            addTempRow('Return Air Temperature');
            addTempRow('Exhaust Air Temperature'); break;
          case 'Inlet and Outlet Air Temperature':
            addTempRow('Fresh Air Temperature');
            addTempRow('Supply Air Temperature');
            addTempRow('Return Air Temperature');
            addTempRow('Exhaust Air Temperature'); break;
          default: break;
        }
      }
    }

    // 11) Fresh Air Filter
    if (freshAirFilter && freshAirFilter !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

        const pushAnalog = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Fresh Filter ${grade} Pressure${pieceSuffix}`,
            description, location,
            ai: 1, ao: 0, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        const pushDigital = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Fresh Filter ${grade} Status${pieceSuffix}`,
            description, location,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        switch (freshAirFilter) {
          case 'Analog G4':   pushAnalog('G4');  break;
          case 'Digital G4':  pushDigital('G4'); break;
          case 'Analog F5':   pushAnalog('F5');  break;
          case 'Digital F5':  pushDigital('F5'); break;
          case 'Analog F6':   pushAnalog('F6');  break;
          case 'Digital F6':  pushDigital('F6'); break;
          case 'Analog F7':   pushAnalog('F7');  break;
          case 'Digital F7':  pushDigital('F7'); break;
          case 'Analog F8':   pushAnalog('F8');  break;
          case 'Digital F8':  pushDigital('F8'); break;
          case 'Analog F9':   pushAnalog('F9');  break;
          case 'Digital F9':  pushDigital('F9'); break;
          case 'Analog H13':  pushAnalog('H13'); break;
          case 'Digital H13': pushDigital('H13');break;
          case 'Analog H14':  pushAnalog('H14'); break;
          case 'Digital H14': pushDigital('H14');break;
          default: break;
        }
      }
    }

    // 12) Supply Air Filter
    if (supplyAirFilter && supplyAirFilter !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

        const pushAnalog = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Supply Filter ${grade} Pressure${pieceSuffix}`,
            description, location,
            ai: 1, ao: 0, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        const pushDigital = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Supply Filter ${grade} Status${pieceSuffix}`,
            description, location,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        switch (supplyAirFilter) {
          case 'Analog G4':   pushAnalog('G4');  break;
          case 'Digital G4':  pushDigital('G4'); break;
          case 'Analog F5':   pushAnalog('F5');  break;
          case 'Digital F5':  pushDigital('F5'); break;
          case 'Analog F6':   pushAnalog('F6');  break;
          case 'Digital F6':  pushDigital('F6'); break;
          case 'Analog F7':   pushAnalog('F7');  break;
          case 'Digital F7':  pushDigital('F7'); break;
          case 'Analog F8':   pushAnalog('F8');  break;
          case 'Digital F8':  pushDigital('F8'); break;
          case 'Analog F9':   pushAnalog('F9');  break;
          case 'Digital F9':  pushDigital('F9'); break;
          case 'Analog H13':  pushAnalog('H13'); break;
          case 'Digital H13': pushDigital('H13'); break;
          case 'Analog H14':  pushAnalog('H14'); break;
          case 'Digital H14': pushDigital('H14'); break;
          default: break;
        }
      }
    }

    // 13) Return Air Filter
    if (returnAirFilter && returnAirFilter !== 'none') {
      for (let i = 1; i <= numPieces; i++) {
        const pieceSuffix = numPieces > 1 ? ` ${i}` : '';

        const pushAnalog = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Return Filter ${grade} Pressure${pieceSuffix}`,
            description, location,
            ai: 1, ao: 0, di: 0, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        const pushDigital = (grade: string) =>
          rows.push({
            point: `Heat Reclaim Return Filter ${grade} Status${pieceSuffix}`,
            description, location,
            ai: 0, ao: 0, di: 1, do: 0,
            modbusRtu: 0, modbusTcp: 0, bacnetMstp: 0, bacnetIp: 0, mbus: 0,
            projectCode
          });

        switch (returnAirFilter) {
          case 'Analog G4':   pushAnalog('G4');  break;
          case 'Digital G4':  pushDigital('G4'); break;
          case 'Analog F5':   pushAnalog('F5');  break;
          case 'Digital F5':  pushDigital('F5'); break;
          case 'Analog F6':   pushAnalog('F6');  break;
          case 'Digital F6':  pushDigital('F6'); break;
          case 'Analog F7':   pushAnalog('F7');  break;
          case 'Digital F7':  pushDigital('F7'); break;
          case 'Analog F8':   pushAnalog('F8');  break;
          case 'Digital F8':  pushDigital('F8'); break;
          case 'Analog F9':   pushAnalog('F9');  break;
          case 'Digital F9':  pushDigital('F9'); break;
          case 'Analog H13':  pushAnalog('H13'); break;
          case 'Digital H13': pushDigital('H13');break;
          case 'Analog H14':  pushAnalog('H14'); break;
          case 'Digital H14': pushDigital('H14');break;
          default: break;
        }
      }
    }

    // 14) VFD Integration
    if (vfdIntegration === 'VFD' && vfdProtocolIntegration !== '' && vfdIntegrationPoints !== '') {
      const parsedPoints = parseInt(vfdIntegrationPoints) || 0;

      const protocol = {
        modbusRtu: 0,
        modbusTcp: 0,
        bacnetMstp: 0,
        bacnetIp: 0,
        mbus: 0
      };

      switch (vfdProtocolIntegration) {
        case 'Modbus RTU':    protocol.modbusRtu  = parsedPoints; break;
        case 'Modbus TCP IP': protocol.modbusTcp  = parsedPoints; break;
        case 'Bacnet MSTP':   protocol.bacnetMstp = parsedPoints; break;
        case 'Bacnet IP':     protocol.bacnetIp   = parsedPoints; break;
        default: break;
      }

      rows.push({
        point: 'Heat Reclaim VFD Integration',
        description, location,
        ai: 0, ao: 0, di: 0, do: 0,
        modbusRtu: protocol.modbusRtu,
        modbusTcp: protocol.modbusTcp,
        bacnetMstp: protocol.bacnetMstp,
        bacnetIp: protocol.bacnetIp,
        mbus: protocol.mbus,
        projectCode
      });
    }

    setTableRows(rows);
    setShowTable(true);
  };

  // Tablodaki Project Code'a göre pool'a yaz; ardından tabloyu temizle
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
      system: 'heatReclaim',
      rows: tableRows,
      createdAt: new Date().toISOString(),
      meta: { description, location }
    };

    localStorage.setItem(key, JSON.stringify([...existing, payload]));

    setSnackbarMsg(`Added ${tableRows.length} row(s) to Pool`);
    setSnackbarOpen(true);

    // Tabloyu temizle
    setTableRows([]);
    setShowTable(false);
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Heat Reclaim System Input</Typography>
            <Stack spacing={2}>
              <TextField
                label="Project Code"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
                }}
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
                  }
                }}
              />

              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
                }}
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
                  }
                }}
              />

              <TextField
                label="Located"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ sx: { color: '#90A4AE', '&.Mui-focused': { color: '#B0BEC5' } } }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
                }}
                InputProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' }
                  }
                }}
              />

              {renderDropdown('Control Type',  controlType,  (e) => setControlType(e.target.value as string),  ['none', 'Local', 'own Panel'])}

              {renderDropdown('Control Protocol Integration',  controlProtocolIntegration,  (e) => setControlProtocolIntegration(e.target.value as string),  ['Modbus RTU', 'Modbus TCP IP', 'Bacnet MSTP', 'Bacnet IP'],  isControlLocal)}

              <TextField
                label="Control Panel Integration Points"
                value={controlPanelIntegrationPoints}
                onChange={(e) => setControlPanelIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isControlLocal}
                InputLabelProps={{
                  sx: {
                    color: '#90A4AE',
                    '&.Mui-focused': { color: '#B0BEC5' },
                    '&.Mui-disabled': { color: '#888' },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlLocal) ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlLocal) ? '#555' : '#CFD8DC',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlLocal) ? '#555' : '#90A4AE',
                  },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: (isControlLocal) ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              {renderDropdown('Control Panel Hard Points',  controlPanelHardPoints,  (e) => setControlPanelHardPoints(e.target.value as string),  ['none', 'Statuses', 'Command', 'Statuses and Command'],  isControlLocal)}
              {renderDropdown('Pieces', pieces, (e) => setPieces(e.target.value as string),  ['1','2','3','4','5','6','7','8'], isControlOwnPanel)}

              {renderDropdown('Power', power, (e) => setPower(e.target.value as string),  ['0,55','0,75','1,1','1,5','2,2','3','4','5,5','7,5','11','15','18,5','22','30','37','45','55','75','90','110','132','160'], isControlOwnPanel)}
              {renderDropdown('Voltage', voltage, (e) => setVoltage(e.target.value as string),  ['230','380'], isControlOwnPanel)}
              {renderDropdown('Maintenance Safety Contacts', maintenanceSafety, (e) => setMaintenanceSafety(e.target.value as string),  ['none', 'for Each Heat Reclaim', 'for All Heat Reclaim'], isControlOwnPanel)}

              {renderDropdown('Emergency Safety Contacts', emergencySafety, (e) => setEmergencySafety(e.target.value as string),  ['none', 'for Each Heat Reclaim', 'for All Heat Reclaim'], isControlOwnPanel)}

              {renderDropdown('Fire Safety Contacts', fireSafety, (e) => setFireSafety(e.target.value as string),  ['none', 'only Viewing', 'Viewing and Control'], isControlOwnPanel)}

              {renderDropdown('Heating Valve Function', heatingValveFunction, (e) => setHeatingValveFunction(e.target.value as string),
                ['none','On/Off Valve Actuator','On/Off Valve Actuator with Feedback','Floating Valve Actuator','Floating Valve Actuator with Feedback','Proportional Valve Actuator','Proportional Valve Actuator with Feedback'], isControlOwnPanel)}

              {renderDropdown('Cooling Valve Function', coolingValveFunction, (e) => setCoolingValveFunction(e.target.value as string),
                ['none','On/Off Valve Actuator','On/Off Valve Actuator with Feedback','Floating Valve Actuator','Floating Valve Actuator with Feedback','Proportional Valve Actuator','Proportional Valve Actuator with Feedback'], isControlOwnPanel)}

              {renderDropdown('Temperature Measurement', temperatureMeasurement, (e) => setTemperatureMeasurement(e.target.value as string),
                ['none','Supply Air Temperature','Return Air Temperature','Fresh Air Temperature','Exhaust Air Temperature','Inside Air Temperature','Outside Air Temperature','Inlet Air Temperature','Outlet Air Temperature','Inlet and Outlet Air Temperature'], isControlOwnPanel)}

              {renderDropdown('Fresh Air Filter', freshAirFilter, (e) => setFreshAirFilter(e.target.value as string),
                ['none','Analog G4','Digital G4','Analog F5','Digital F5','Analog F6','Digital F6','Analog F7','Digital F7','Analog F8','Digital F8','Analog F9','Digital F9','Analog H13','Digital H13','Analog H14','Digital H14'], isControlOwnPanel)}

              {renderDropdown('Supply Air Filter', supplyAirFilter, (e) => setSupplyAirFilter(e.target.value as string),
                ['none','Analog G4','Digital G4','Analog F5','Digital F5','Analog F6','Digital F6','Analog F7','Digital F7','Analog F8','Digital F8','Analog F9','Digital F9','Analog H13','Digital H13','Analog H14','Digital H14'], isControlOwnPanel)}

              {renderDropdown('Return Air Filter', returnAirFilter, (e) => setReturnAirFilter(e.target.value as string),
                ['none','Analog G4','Digital G4','Analog F5','Digital F5','Analog F6','Digital F6','Analog F7','Digital F7','Analog F8','Digital F8','Analog F9','Digital F9','Analog H13','Digital H13','Analog H14','Digital H14'], isControlOwnPanel)}

              {renderDropdown('VFD Integration', vfdIntegration, (e) => setVfdIntegration(e.target.value as string),
                ['none','VFD'], isControlOwnPanel)}
              {renderDropdown('VFD Protocol Integration', vfdProtocolIntegration,
                (e) => setVfdProtocolIntegration(e.target.value as string),
                ['Modbus RTU','Modbus TCP IP','Bacnet MSTP','Bacnet IP'],
                isControlOwnPanel || isVfdNone
              )}

              <TextField
                label="VFD Integration Points"
                value={vfdIntegrationPoints}
                onChange={(e) => setVfdIntegrationPoints(e.target.value)}
                fullWidth
                variant="outlined"
                disabled={isControlOwnPanel || isVfdNone}
                InputLabelProps={{
                  sx: {
                    color: '#90A4AE',
                    '&.Mui-focused': { color: '#B0BEC5' },
                    '&.Mui-disabled': { color: '#888' },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlOwnPanel || isVfdNone) ? '#555' : '#B0BEC5',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlOwnPanel || isVfdNone) ? '#555' : '#CFD8DC',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: (isControlOwnPanel || isVfdNone) ? '#555' : '#90A4AE',
                  },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: (isControlOwnPanel || isVfdNone) ? '#1e1e1e' : 'transparent',
                    '& .MuiInputBase-input': { color: '#ECEFF1' },
                    '&.Mui-disabled .MuiInputBase-input': { WebkitTextFillColor: '#888', color: '#888' },
                  },
                }}
              />

              <PrimaryButton sx={{ width: '100%' }} onClick={handleSaveHeatReclaim}>Send to Table</PrimaryButton>

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
            {projectCode ? `${projectCode} Output Table` : 'Heat Reclaim Output Table'}
          </Typography>

          <Box sx={{ overflowX: 'auto', overflowY: 'auto', maxWidth: '100%' }} />

          {showTable && tableRows.length > 0 && (
            <table style={{
              minWidth: '1200px',
              borderCollapse: 'collapse',
              backgroundColor: '#ffffff',
              fontSize: '0.875rem',
              fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e0e0e0',
              color: '#333'
            }}>
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2200}
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
