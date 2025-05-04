import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const schema = z.object({ identifier: z.string().min(3) });
type Values = z.infer<typeof schema>;

export const ResetPasswordRequestPage = () => {
  const { requestReset, loading, error, resetError } = useAuthStore();
  const [success, setSuccess] = useState<string | null>(null);
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } =
    useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    try {
      const devToken = await requestReset(v.identifier);
      setSuccess('Reset link sent. Check your email or phone.');
      // dev navigation (remove in prod)
      if (devToken) nav(`/reset-password/confirm?token=${devToken}`);
    } catch {
      setSuccess(null);
    }
  };

  return (
    <Box sx={pageWrapper}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={card}>
        <Typography variant="h5" textAlign="center">
          Forgot your password?
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Email or Phone"
          {...register('identifier')}
          error={!!errors.identifier}
          helperText={errors.identifier?.message}
          fullWidth
          onChange={() => { resetError(); setSuccess(null); }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send Reset Link'}
        </Button>
      </Box>
    </Box>
  );
};

/* ---------- reusable card / wrapper styles ------------- */
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
