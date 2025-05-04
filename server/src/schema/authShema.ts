import { z } from 'zod';

export const RegisterSchema = z.object({
  fullName: z.string().min(3),
  email:    z.string().email(),
  phone:    z.string().regex(/^0\d{9}$/, 'Phone must be 10 digits starting with 0'),
  password: z.string().min(8),
});

export const LoginSchema = z
  .object({
    identifier: z.string().min(5, 'Email or phone is required'),
    password:   z.string().min(6, 'Password is required'),
  })
  .superRefine((data, _ctx) => {
    console.log('🧪 LoginSchema data being validated:', data);
  });
