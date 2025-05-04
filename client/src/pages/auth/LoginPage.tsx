import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

export const LoginPage = () => (
  <Box
    sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default',
      p: 2,
    }}
  >
    <LoginForm />

    <Typography variant="body2" mt={3}>
      Don&apos;t have an account?{' '}
      <Link component={RouterLink} to="/register">
        Sign up
      </Link>
    </Typography>

    <Typography variant="body2" mt={1}>
      <Link component={RouterLink} to="/reset-password">
        Forgot password?
      </Link>
    </Typography>
  </Box>
);
