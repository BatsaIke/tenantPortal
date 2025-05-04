import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';

const schema = z.object({
  password:        z.string().min(6),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});
type Values = z.infer<typeof schema>;

export const ResetPasswordConfirmPage = () => {
  const { confirmReset, loading, error, resetError } = useAuthStore();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';

  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } =
    useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    try {
      await confirmReset(token, v.password);
      setSuccess('Password updated — you can now sign in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setSuccess(null);
    }
  };

  return (
    <Box sx={pageWrapper}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={card}>
        <Typography variant="h5" textAlign="center">
          Choose a new password
        </Typography>

        {error &&   <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          onChange={() => { resetError(); setSuccess(null); }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          onChange={() => { resetError(); setSuccess(null); }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Resetting…' : 'Reset Password'}
        </Button>
      </Box>
    </Box>
  );
};

/* reuse the same styles */
const pageWrapper = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.default',
  p: 2,
};
const card = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  maxWidth: 400,
  width: '100%',
  p: 4,
  borderRadius: 2,
  boxShadow: 3,
  bgcolor: 'background.paper',
};
