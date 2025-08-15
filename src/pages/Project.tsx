import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

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

export default function Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const localStorageData = localStorage.getItem('currentProject');
  const projectData = localStorageData ? JSON.parse(localStorageData) : null;
  const loggedInUser = localStorage.getItem('loggedInUser');

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
    const route = system.toLowerCase().replace(/\s/g, '').replace('(', '').replace(')', '');
    navigate(`/${route}`);
    handleClose();
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
              Add System
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

            <PrimaryButton sx={{ width: '100%' }}>Add Panel</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Material</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Hardware</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }}>Add Software</PrimaryButton>
            <PrimaryButton sx={{ width: '100%' }} onClick={handleBackToHome}>Back to Home</PrimaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
