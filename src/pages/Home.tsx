import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Snackbar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { LoginModalWrapper } from '../components/LoginModalWrapper';

interface FormData {
  projectName: string;
  buildingType: string;
  system: string;
  city: string;
  country: string;
  responsible: string;
  [key: string]: string;
}

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

const OutlinedButton = styled(ModernButton)({
  backgroundColor: 'transparent',
  borderColor: 'rgba(25, 118, 210, 0.5)',
  color: '#1976d2',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
    borderColor: '#1976d2'
  }
});

const HeroSection = styled(Box)({
  minHeight: '80vh',
  background: 'radial-gradient(circle at top right, #1A237E, #000000)',
  color: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden'
});

const HeroText = styled(Typography)({
  fontWeight: 700,
  lineHeight: 1.2,
  textAlign: 'left',
  '& span': {
    background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('Hello Guest');
  const [showAlert, setShowAlert] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showLearnMoreAlert, setShowLearnMoreAlert] = React.useState(false);
  const [showDemoAlert, setShowDemoAlert] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    projectName: '',
    buildingType: '',
    system: '',
    city: '',
    country: '',
    responsible: ''
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('Hello Guest');
  };

  const handleLoginSuccess = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    setShowLogin(false);
    localStorage.setItem('loggedInUser', user);
  };

  const handleOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      setShowAlert(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: String(value) }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
  // Eksik alan kontrolü
  if (!formData.projectName || 
      !formData.buildingType || 
      !formData.system || 
      !formData.city || 
      !formData.country || 
      !formData.responsible) {
    setValidationError(true); // Validasyon hatasını tetikle
    return; // Fonksiyonu durdur
  }

  localStorage.setItem('currentProject', JSON.stringify(formData));
  handleClose();
  window.location.href = '/projects'; 
};

  return (
    <Box sx={{ backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <Box sx={{ 
      py: 2, 
      px: 4, 
      display: 'flex', 
      justifyContent: 'flex-end', // 'space-between' yerine 'flex-end'
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)' 
    }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography 
          variant="body1" 
          sx={{ 
          mr: 2, 
          fontWeight: 500,
          color: '#1976d2' // Mavi renk eklendi
  }}
>
  {username}
</Typography>
          <PrimaryButton onClick={() => setShowDemoAlert(true)}>Demo Request</PrimaryButton>
          {isLoggedIn ? (
            <PrimaryButton 
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              sx={{ marginLeft: '8px', textTransform: 'none' }}
            >
              Logout
            </PrimaryButton>
          ) : (
            <PrimaryButton 
              onClick={() => setShowLogin(true)} 
              sx={{ marginLeft: '8px', textTransform: 'none' }}
            >
              Login
            </PrimaryButton>
          )}
        </Stack>
      </Box>

      {/* Hero */}
      <HeroSection>
        <Container sx={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2, py: 10 }}>
          <Box sx={{ width: '50%' }}>
            <HeroText variant="h2" sx={{ mb: 3, fontSize: '3.5rem' }}>
              Create your projects accurately and quickly
            </HeroText>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontStyle: 'italic', color: '#e0e0e0' }}>
              We've built something amazing, stay tuned!
            </Typography>
            <Stack direction="row" spacing={2}>
              <PrimaryButton 
                startIcon={<AddIcon sx={{ fontSize: '1rem' }} />} 
                sx={{ minWidth: '140px' }} 
                onClick={() => isLoggedIn ? handleOpen() : setShowAlert(true)}
              >
                New Project
              </PrimaryButton>
              <OutlinedButton 
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.7)', '&:hover': { borderColor: 'white' } }}
                onClick={() => setShowLearnMoreAlert(true)}
              >
                Learn More
              </OutlinedButton>
            </Stack>
          </Box>

          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: '500px', height: '400px', backgroundImage: 'url(/assets/hvac-dashboard.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
          </Box>
        </Container>
      </HeroSection>

      {/* Create Project Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{ '& .MuiPaper-root': { background: 'linear-gradient(to bottom, #f8fafc, #e6f0fa)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)' } }}>
        <DialogTitle sx={{ color: '#1976d2', fontWeight: 600, borderBottom: '1px solid rgba(25, 118, 210, 0.1)' }}>
          Create New Project
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3}>
            <TextField
              name="projectName"
              label="Project Name"
              fullWidth
              size="small"
              value={formData.projectName}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': { color: '#1976d2' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(25, 118, 210, 0.3)' },
                  '&:hover fieldset': { borderColor: '#1976d2' },
                  '& .MuiInputBase-input': { 
                    color: '#000000',
                  },
                }
              }}
            />
            <Select
              name="buildingType"
              value={formData.buildingType}
              onChange={handleSelectChange}
              displayEmpty
              size="small"
              fullWidth
              sx={{
                bgcolor: '#fff',
                '& .MuiInputBase-input': { color: '#000' },
                '& fieldset': { borderColor: 'rgba(25, 118, 210, 0.3)' },
                '&:hover fieldset': { borderColor: '#1976d2' }
              }}
            >
              <MenuItem value="" disabled>Select Building Type</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="Mall">Mall</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <Select
              name="system"
              value={formData.system}
              onChange={handleSelectChange}
              displayEmpty
              size="small"
              fullWidth
              sx={{
                bgcolor: '#fff',
                '& .MuiInputBase-input': { color: '#000' },
                '& fieldset': { borderColor: 'rgba(25, 118, 210, 0.3)' },
                '&:hover fieldset': { borderColor: '#1976d2' }
              }}
            >
              <MenuItem value="" disabled>Select System</MenuItem>
              <MenuItem value="Access">Access</MenuItem>
              <MenuItem value="CCTV">Cctv</MenuItem>
              <MenuItem value="Energy Monitoring">Energy</MenuItem>
              <MenuItem value="Fire Detecting Systems">Fire Detecting Systems</MenuItem>
              <MenuItem value="HVAC">Hvac</MenuItem>
              <MenuItem value="KNX">Knx</MenuItem>

            </Select>
            {(['city', 'country', 'responsible'] as const).map((field) => (
              <TextField
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                size="small"
                value={formData[field]}
                onChange={handleChange}
                sx={{
                  input: {
                    backgroundColor: '#fff',
                    color: '#000'
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1976d2',
                    fontSize: '0.875rem',
                    '&.Mui-focused': { color: '#1976d2' }
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(25, 118, 210, 0.3)',
                      borderRadius: '6px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: '1px'
                    }
                  }
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(25, 118, 210, 0.1)' }}>
          <OutlinedButton onClick={handleClose}>Cancel</OutlinedButton>
          <PrimaryButton onClick={handleSubmit}>Save Project</PrimaryButton>
        </DialogActions>
      </Dialog>

      
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        message="Please log in or continue with demo"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ 
          '& .MuiSnackbarContent-root': { 
            backgroundColor: '#d21947ff',
            color: 'white' 
          } 
        }}
      />
      <Snackbar
        open={showLearnMoreAlert}
        autoHideDuration={3000}
        onClose={() => setShowLearnMoreAlert(false)}
        message="Under construction"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ 
          '& .MuiSnackbarContent-root': { 
            backgroundColor: '#FFA500',
            color: 'black',
            fontWeight: 500 
          } 
        }}
      />
      <Snackbar
        open={showDemoAlert}
        autoHideDuration={3000}
        onClose={() => setShowDemoAlert(false)}
        message="Under construction"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ 
          '& .MuiSnackbarContent-root': { 
            backgroundColor: '#FFA500',
            color: 'black',
            fontWeight: 500 
          } 
        }}
      />

      <Snackbar
  open={validationError}
  autoHideDuration={3000}
  onClose={() => setValidationError(false)}
  message="Please fill in all required fields"
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  sx={{ 
    '& .MuiSnackbarContent-root': { 
      backgroundColor: '#d21947',
      color: 'white'
    } 
  }}
/>

      <LoginModalWrapper
  open={showLogin}
  onClose={() => setShowLogin(false)}
  onSuccess={handleLoginSuccess} // Bu satır doğru, değiştirmeyin
  setIsLoggedIn={setIsLoggedIn}
/>
    </Box>
  );
}