import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack
} from '@mui/material';

interface LoginFormProps {
  onSuccess: (username: string) => void; // Değişti
  onCancel: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginForm = ({ onSuccess, onCancel, setIsLoggedIn }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (email === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      onSuccess(email); // Değişti (email'i parametre olarak gönderiyoruz)
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <DialogTitle
        sx={{
          fontWeight: 600,
          fontSize: '1.25rem',
          color: '#1976d2',
          px: 3,
          pt: 3,
          pb: 1,
        }}
      >
        Login
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              size="small"
              sx={{
                input: {
                  backgroundColor: '#fff'
                },
                '& .MuiInputBase-input': {
                  color: '#000'
                },
                '& .MuiInputLabel-root': {
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  '&.Mui-focused': { color: '#1976d2' }
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                    borderRadius: '6px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#999'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                    borderWidth: '1px'
                  }
                }
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              size="small"
              sx={{
                input: {
                  backgroundColor: '#fff'
                },
                '& .MuiInputBase-input': {
                  color: '#000'
                },
                '& .MuiInputLabel-root': {
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  '&.Mui-focused': { color: '#1976d2' }
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc',
                    borderRadius: '6px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#999'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                    borderWidth: '1px'
                  }
                }
              }}
            />

            {error && (
              <Typography color="error" fontSize="0.8rem" textAlign="center">
                {error}
              </Typography>
            )}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          justifyContent: 'flex-end',
          gap: 1
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          size="small"
          sx={{
            textTransform: 'none',
            bgcolor: '#1976d2',
            '&:hover': {
            bgcolor: '#1565c0',
            },
          }}
        >
          Sign In
        </Button>
      </DialogActions>
    </>
  );
};