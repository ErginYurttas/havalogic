import { Box, Button, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { darkTheme } from '../theme'; // theme dosyanızın yolunu kontrol edin
import Container from '@mui/material/Container';

// Home.tsx'ten kopyalanan buton stilleri
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
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #1A237E, #000000)',
      color: '#FFFFFF',
      p: 4
    }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
          Project Management
        </Typography>
        
        <Stack spacing={2} sx={{ maxWidth: '300px' }}>
          <PrimaryButton>Add System</PrimaryButton>
          <PrimaryButton>Add Panel</PrimaryButton>
          <PrimaryButton>Add Material</PrimaryButton>
          <PrimaryButton>Add Hardware</PrimaryButton>
          <PrimaryButton>Add Software</PrimaryButton>
        </Stack>
      </Container>
    </Box>
  );
}