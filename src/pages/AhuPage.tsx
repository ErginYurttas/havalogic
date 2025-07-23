import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Container,
  Stack,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const PrimaryButton = styled(Button)({
  borderRadius: '8px',
  padding: '8px 16px',
  fontSize: '0.8125rem',
  fontWeight: 500,
  textTransform: 'none',
  letterSpacing: '0.02em',
  transition: 'all 0.2s ease',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0'
  }
});

export default function AhuPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const handleBack = () => {
    navigate('/projects');
  };

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
            {loggedInUser || 'User'}
          </Typography>
          <PrimaryButton
            startIcon={<ExitToAppIcon sx={{ fontSize: '1rem' }} />}
            onClick={() => navigate('/')}
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

      {/* Content */}
      <Container sx={{ px: 0, py: 6 }}>
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',  // tam eşleşen renk
          borderRadius: '12px',
          p: 4,
          mb: 6,
          width: '400px',       // tam eşleşen genişlik
          maxWidth: '100%',
          ml: 4                 // tam eşleşen konum
        }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            AHU System Input
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="AHU Project Code"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{ style: { color: '#000' } }}
              InputLabelProps={{ style: { color: '#1976d2' } }}
            />
            <TextField
              label="AHU Description"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{ style: { color: '#000' } }}
              InputLabelProps={{ style: { color: '#1976d2' } }}
            />
            <TextField
              label="AHU Located"
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{ style: { color: '#000' } }}
              InputLabelProps={{ style: { color: '#1976d2' } }}
            />

            <PrimaryButton>
              Save Ahu
            </PrimaryButton>

            <PrimaryButton onClick={handleBack}>
              Back to Project Overview
            </PrimaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
