// src/pages/auth/RegisterPage.tsx
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const RegisterPage = () => (
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
    {/* keep form width identical to LoginForm (max 400 px) */}
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <RegisterForm />

      {/* centred helper link */}
      <Typography variant="body2" mt={3} textAlign="center">
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Sign in
        </Link>
      </Typography>
    </Box>
  </Box>
);
