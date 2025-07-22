import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocation, useNavigate } from 'react-router-dom';

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

export default function Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location.state as { projectData?: any };
const localStorageData = localStorage.getItem('currentProject');
const projectData = locationData?.projectData || (localStorageData ? JSON.parse(localStorageData) : null);

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #1A237E, #000000)',
      color: '#FFFFFF'
    }}>
      {/* Header - Home.tsx ile aynı yapı */}
      <Box sx={{
        py: 2,
        px: 4,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{
            mr: 2,
            fontWeight: 500,
            color: '#1976d2'
          }}>
            {projectData?.responsible || 'Admin'}
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

      {/* Proje Detayları */}
      <Container maxWidth="sm" sx={{ py: 6, px: 2 }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          p: 4,
          mb: 6
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
          </Stack>
        </Box>

        {/* Butonlar */}
        <Typography variant="h5" sx={{
          mb: 3,
          color: 'white',
          fontWeight: 600
        }}>
          Project Actions
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: '300px' }}>
          <PrimaryButton sx={{ width: '100%' }}>Add System</PrimaryButton>
          <PrimaryButton sx={{ width: '100%' }}>Add Panel</PrimaryButton>
          <PrimaryButton sx={{ width: '100%' }}>Add Material</PrimaryButton>
          <PrimaryButton sx={{ width: '100%' }}>Add Hardware</PrimaryButton>
          <PrimaryButton sx={{ width: '100%' }}>Add Software</PrimaryButton>
          <PrimaryButton sx={{ width: '100%' }} onClick={handleBackToHome}>Back to Home</PrimaryButton>
        </Stack>
      </Container>
    </Box>
  );
}
