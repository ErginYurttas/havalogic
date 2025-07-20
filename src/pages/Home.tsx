import { Box, Typography, Button, Stack, Container, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { LoginModalWrapper } from '../components/LoginModalWrapper';

interface FormData {
  buildingType: string;
  system: string;
  city: string;
  country: string;
  responsible: string;
  [key: string]: string; // Index signature ekliyoruz
}

// 1. Stil Tanımları (Aynen Korundu)
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

// 2. Ana Bileşen
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    buildingType: '',
    system: '',
    city: '',
    country: '',
    responsible: ''
  });

  const handleOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      setShowAlert(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    handleClose();
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa' }}>
      {/* Üst Navigasyon */}
      <Box sx={{
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <Typography variant="h5" sx={{ 
          fontFamily: 'inherit',
          fontWeight: 500,
          textTransform: 'lowercase',
          fontSize: '1.5rem',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center'
        }}>
          havalogic
        </Typography>

        <Stack direction="row" spacing={2}>
          <PrimaryButton>Demo Request</PrimaryButton>
          <PrimaryButton onClick={() => setShowLogin(true)} sx={{ marginLeft: '8px', textTransform: 'none' }}>
            Login
          </PrimaryButton>
        </Stack>
      </Box>

      {/* Hero Alanı */}
      <HeroSection>
        <Container sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          py: 10
        }}>
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
              <OutlinedButton sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.7)', '&:hover': { borderColor: 'white' } }}>
                Learn More
              </OutlinedButton>
            </Stack>
          </Box>

          <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <Box sx={{
              width: '100%',
              maxWidth: '500px',
              height: '400px',
              backgroundImage: 'url(/assets/hvac-dashboard.png)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }} />
          </Box>
        </Container>
      </HeroSection>

      {/* New Project Popup */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            background: 'linear-gradient(to bottom, #f8fafc, #e6f0fa)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#1976d2',
          fontWeight: 600,
          borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
          backgroundColor: 'transparent'
        }}>
          Create New Project
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={3}>
            {(['buildingType', 'system', 'city', 'country', 'responsible'] as const).map((field) => (
              <TextField
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                size="small"
                sx={{
                  '& .MuiInputLabel-root': { color: '#1976d2' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(25, 118, 210, 0.3)' },
                    '&:hover fieldset': { borderColor: '#1976d2' }
                  }
                }}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(25, 118, 210, 0.1)' }}>
          <OutlinedButton 
            onClick={handleClose}
            sx={{ color: '#1976d2', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' } }}
          >
            Cancel
          </OutlinedButton>
          <PrimaryButton onClick={handleSubmit}>Save Project</PrimaryButton>
        </DialogActions>
      </Dialog>

      {/* Login Uyarısı */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        message="Please log in or continue with demo"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ '& .MuiSnackbarContent-root': { backgroundColor: '#d21947ff', color: 'white' } }}
      />

      {/* ✅ MODERN LOGIN MODAL → TAM BURAYA KOYULDU */}
      <LoginModalWrapper
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Box>
  );
}

