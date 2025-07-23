import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Stack,
  Button
} from '@mui/material';
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

export default function CleanRoomPage() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [projectCode, setProjectCode] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleBack = () => {
    navigate('/projects');
  };

  const handleLogout = () => {
    navigate('/');
  };

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
            maxWidth: '100%'
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Clean Room System Input
          </Typography>

          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Clean Room Project Code"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Clean Room Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Clean Room Located"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                style: { color: 'white' }
              }}
            />

            <PrimaryButton sx={{ width: '100%' }}>Save Clean Room</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }} onClick={handleBack}>
              Back to Project Overview
            </PrimaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
