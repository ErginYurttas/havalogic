import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface LoginFormProps {
  onSuccess: () => void;
  setIsLoggedIn: (value: boolean) => void; // Yeni eklenen prop
}

export const LoginForm = ({ onSuccess, setIsLoggedIn }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'admin' && password === '1234') {
      setIsLoggedIn(true); // Login durumunu güncelle
      localStorage.setItem('isLoggedIn', 'true'); // Tarayıcıda sakla
      onSuccess(); // Popup'ı kapat
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      
      {error && <Typography color="error">{error}</Typography>}

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>
    </Box>
  );
};