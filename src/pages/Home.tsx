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
  const [showLearnMorePopup, setShowLearnMorePopup] = React.useState(false);
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
            From Concept to Completion Instantly
            </HeroText>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontStyle: 'italic', color: '#e0e0e0' }}>
            For decision-makers who demand efficiency and accuracy
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
              onClick={() => setShowLearnMorePopup(true)}
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
              <MenuItem value="Airport">Airport</MenuItem>
<MenuItem value="Bank">Bank</MenuItem>
<MenuItem value="Data Center">Data Center</MenuItem>
<MenuItem value="Factory">Factory</MenuItem>
<MenuItem value="Government Building">Government Building</MenuItem>
<MenuItem value="Hospital">Hospital</MenuItem>
<MenuItem value="Hotel">Hotel</MenuItem>
<MenuItem value="Laboratory">Laboratory</MenuItem>
<MenuItem value="Library">Library</MenuItem>
<MenuItem value="Mall">Mall</MenuItem>
<MenuItem value="Museum">Museum</MenuItem>
<MenuItem value="Office">Office</MenuItem>
<MenuItem value="Residential">Residential</MenuItem>
<MenuItem value="School">School</MenuItem>
<MenuItem value="Shepyard">Shepyard</MenuItem>
<MenuItem value="Skyscraper">Skyscraper</MenuItem>
<MenuItem value="Sport Complex">Sport Complex</MenuItem>
<MenuItem value="Warehouse">Warehouse</MenuItem>
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

<Dialog
  open={showLearnMorePopup}
  onClose={() => setShowLearnMorePopup(false)}
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
  <DialogTitle sx={{ color: '#1976d2', fontWeight: 600, borderBottom: '1px solid rgba(25, 118, 210, 0.1)' }}>
    Learn More
  </DialogTitle>
  <DialogContent sx={{ py: 4 }}>
  <Stack spacing={2}>
    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
      Designed with Vision, Built for the Future
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      HavaLogic is an original platform developed through the collaboration between a visionary Turk and artificial intelligence.  
      Our goal was to create a tool that is both simple and powerful — starting with the HVAC industry, where we've taken our first step.  
      We're planning to expand soon into the fields of energy, KNX, and other low-current systems.
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      Today, building automation, energy efficiency, and system integration are no longer luxuries — they are necessities.  
      Accessing information is easier than ever, but in real-life projects, finding the right knowledge, filtering it, and applying it effectively is still a major challenge.  
      The industry is overwhelmed by noise and information pollution, which slows down progress.
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      That’s exactly where HavaLogic steps in.  
      It simplifies complexity, accelerates workflows, and offers an intuitive interface for everyone involved.  
      The questions we ask are simple — but the answers you provide lead to meaningful, measurable results in the field.
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      This tool isn’t just for design teams at automation firms.  
      Sales teams can also benefit from it. Even contractors — as long as they know the answers — can easily use the system.  
      HavaLogic is designed to support everyone in the process.  
      <strong>So where do you fit in?</strong>
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      This platform was built not just with today in mind, but with a strong vision for the future.  
      It is the product of a new-generation mindset and a digital transformation perspective.
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      We’re excited — because we believe we've created something that truly contributes to the digital world.  
      We’re hopeful — because together, we believe we can design smarter and more efficient systems.
    </Typography>

    <Typography variant="body2" sx={{ color: '#333' }}>
      We are currently uploading data into our system.  
      Our goal is to reach full performance before the year 2026.
    </Typography>
  </Stack>
</DialogContent>


  <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(25, 118, 210, 0.1)' }}>
    <OutlinedButton onClick={() => setShowLearnMorePopup(false)}>Close</OutlinedButton>
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