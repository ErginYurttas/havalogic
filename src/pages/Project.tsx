import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  Menu,
  MenuItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

const getBuildingImage = (type: string): string => {
  const cleaned = type.toLowerCase().replace(/\s/g, '');
  return `/images/buildings/${cleaned}.png`;
};

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

// --- SADECE TextField yazı rengi için EKLENDİ ---
const inputTextLightSx = {
  '& .MuiInputBase-input': { color: '#ECEFF1' },
  '& input:-webkit-autofill': { WebkitTextFillColor: '#ECEFF1' }
};

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

type PanelDraft = {
  name: string;
  description: string;
  located: string;
  supplyType: string;
  voltage: string;
  formType: string;
  brand: string;
  color: string;
};

export default function Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const localStorageData = localStorage.getItem('currentProject');
  const projectData = localStorageData ? JSON.parse(localStorageData) : null;
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('#4CAF50'); // Panel Saved yeşil

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSystemSelect = (system: string) => {
    const routeMap: Record<string, string> = {
      'Energy Viewing': 'energy',
    };

    const normalized =
      routeMap[system] ||
      system.toLowerCase().replace(/\s/g, '').replace(/[()]/g, '');
    navigate(`/${normalized}`);
    handleClose();
  };

  const handleGoPool = () => {
    const projectKey =
      projectData?.projectCode ||
      projectData?.projectName; // fallback

    if (projectKey) {
      navigate(`/pool?project=${encodeURIComponent(projectKey)}`);
    } else {
      setSnackbarMsg('Project Code not found');
      setSnackbarColor('#FFA500');
      setSnackbarOpen(true);
    }
  };

  // -------- Create Panel Wizard ----------
  const [openPanelDlg, setOpenPanelDlg] = useState(false);
  const [step, setStep] = useState(0);

  const [draft, setDraft] = useState<PanelDraft>({
    name: '',
    description: '',
    located: '',
    supplyType: '',
    voltage: '',
    formType: '',
    brand: '',
    color: '',
  });

  const openCreatePanel = () => {
    setDraft({
      name: '',
      description: '',
      located: '',
      supplyType: '',
      voltage: '',
      formType: '',
      brand: '',
      color: '',
    });
    setStep(0);
    setOpenPanelDlg(true);
  };

  const handleCancelPanel = () => setOpenPanelDlg(false);

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handleBackStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const savePanel = () => {
    const projectKey =
      projectData?.projectCode ||
      projectData?.projectName ||
      'unknown';

    const key = `panels:${projectKey}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');

    const record = {
      id: Date.now(),
      projectKey,
      createdAt: new Date().toISOString(),
      panel: {
        name: draft.name,
        description: draft.description,
        located: draft.located,
        supplyType: draft.supplyType,
        voltage: draft.voltage,
        formType: draft.formType,
        brand: draft.brand,
        color: draft.color,
      }
    };

    localStorage.setItem(key, JSON.stringify([...(Array.isArray(existing) ? existing : []), record]));

    setOpenPanelDlg(false);
    setSnackbarMsg('Panel Saved');
    setSnackbarColor('#4CAF50'); // yeşil
    setSnackbarOpen(true);
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B0BEC5' },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90A4AE' },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CFD8DC' }
  };

  const steps: Array<{
    key: keyof PanelDraft;
    label: string;
    kind: 'text' | 'select';
    options?: string[];
  }> = [
    { key: 'name',        label: 'Panel Name', kind: 'text' },
    { key: 'description', label: 'Description', kind: 'text' },
    { key: 'located',     label: 'Located', kind: 'text' }, // Floor+Room birleşimi
    { key: 'supplyType',  label: 'Supply Type', kind: 'select', options: ['Mains', 'UPS'] },
    { key: 'voltage',     label: 'Voltage', kind: 'select', options: ['230', '380'] },
    { key: 'formType',    label: 'Form Type', kind: 'select', options: ['Form1', 'Form2', 'Form2B', 'Form3B', 'Form4', 'Non Standard'] },
    { key: 'brand',       label: 'Brand', kind: 'text' },
    { key: 'color',       label: 'Color', kind: 'text' },
  ];

  const current = steps[step];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #1A237E, #000000)',
      color: '#FFFFFF'
    }}>
      {/* Header */}
      <Box sx={{
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <Typography variant="body1" sx={{ fontWeight: 'normal', fontSize: '1.1rem' }}>
          <span style={{ color: '#1976d2' }}>hava</span>
          <span style={{ color: '#B0BEC5' }}>logic</span>
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{
            mr: 2,
            fontWeight: 500,
            color: '#1976d2'
          }}>
            {loggedInUser || 'User'}
          </Typography>
          <PrimaryButton
            startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />}
            onClick={handleLogout}
            sx={{
              marginLeft: '8px',
              textTransform: 'none',
              minWidth: '100px'
            }}
          >
            Logout
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Project Details */}
      <Container maxWidth="lg" sx={{
        py: 6,
        px: 2,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4
      }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          p: 4,
          mb: 6,
          width: '300px',
          maxWidth: '100%'
        }}>
          <Typography variant="h5" sx={{
            mb: 3,
            color: 'white',
            fontWeight: 600
          }}>
            Project Overview
          </Typography>

          <Stack spacing={2}>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>Project Name:</strong> {projectData?.projectName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>Country:</strong> {projectData?.country}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>City:</strong> {projectData?.city}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>Responsible:</strong> {projectData?.responsible}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>Building Type:</strong> {projectData?.buildingType}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <strong>System:</strong> {projectData?.system}
            </Typography>
            {projectData?.buildingType && (
              <Box
                component="img"
                src={getBuildingImage(projectData.buildingType)}
                alt={projectData.buildingType}
                sx={{
                  width: 180,
                  height: 140,
                  borderRadius: '8px',
                  objectFit: 'contain',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Buttons */}
        <Box>
          <Typography variant="h5" sx={{
            mb: 3,
            color: 'white',
            fontWeight: 600
          }}>
            Project Actions
          </Typography>

          <Stack spacing={2} sx={{ maxWidth: '300px' }}>
            <PrimaryButton sx={{ width: '100%' }} onClick={handleClick}>
              Create System
            </PrimaryButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                style: {
                  maxHeight: 200,
                  width: '200px'
                }
              }}
            >
              {[
                'Ahu',
                'Air Curtain',
                'Boiler',
                'Booster',
                'Chiller',
                'Collector',
                'Cooling Tower',
                'Data Center',
                'Energy Viewing',
                'Fan',
                'Fcu',
                'Generator',
                'Heat Exchanger',
                'Heat Reclaim',
                'Pump',
                'Room',
                'Unit Heater',
                'Ups',
                'Vav',
                'Water Tank',
                'Weather',
                'Manual Entry',
              ].map((item) => (
                <MenuItem key={item} onClick={() => handleSystemSelect(item)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>

            <PrimaryButton sx={{ width: '100%' }} onClick={openCreatePanel}>
              Create Panel
            </PrimaryButton>

            <PrimaryButton sx={{ width: '100%' }} onClick={handleGoPool}>Go To Pool</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Material</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Hardware</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Software</PrimaryButton>

            <PrimaryButton sx={{ width: '100%' }} onClick={handleBackToHome}>
              Back to Home
            </PrimaryButton>
          </Stack>
        </Box>
      </Container>

      {/* Create Panel Wizard Dialog */}
      <Dialog open={openPanelDlg} onClose={handleCancelPanel} fullWidth maxWidth="sm">
        <DialogTitle>Create Panel</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Step {step + 1} / {steps.length}
          </Typography>

          {/* Alan tipi: text ise TextField, select ise Select */}
          {current.kind === 'text' ? (
            <TextField
              autoFocus
              fullWidth
              label={current.label}
              value={draft[current.key] as string}
              onChange={(e) => setDraft(d => ({ ...d, [current.key]: e.target.value }))}
              InputLabelProps={{ sx: labelStyles }}
              sx={textFieldSx}
              InputProps={{ sx: inputTextLightSx }}  // <<< SADECE RENK İÇİN EKLENDİ
            />
          ) : (
            <FormControl fullWidth>
              <InputLabel sx={labelStyles}>{current.label}</InputLabel>
              <Select
                label={current.label}
                value={draft[current.key] as string}
                onChange={(e) => setDraft(d => ({ ...d, [current.key]: String(e.target.value) }))}
                sx={selectStyles}
                native={false}
              >
                {(current.options || []).map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <PrimaryButton onClick={handleCancelPanel}>Cancel</PrimaryButton>
          <PrimaryButton onClick={handleBackStep} disabled={step === 0}>Back</PrimaryButton>
          {step < steps.length - 1 ? (
            <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
          ) : (
            <PrimaryButton onClick={savePanel}>Finish & Save</PrimaryButton>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarColor,
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
