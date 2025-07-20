import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { LoginForm } from './LoginForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface LoginModalWrapperProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginModalWrapper = ({
  open,
  onClose,
  onSuccess,
  setIsLoggedIn,
}: LoginModalWrapperProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 8,
          bgcolor: '#ffffff',
          px: 2,
          py: 1,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <LoginForm
        onSuccess={onSuccess}
        onCancel={onClose}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Dialog>
  );
};
