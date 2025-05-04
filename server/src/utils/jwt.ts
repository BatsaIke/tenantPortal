import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

// assert your env var exists
const JWT_SECRET = process.env.JWT_SECRET as string;

// 👇 Cast to `StringValue` to satisfy SignOptions.expiresIn
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}`;

/**
 * Generate a JWT token from userId
 */
export const generateToken = (userId: string | Types.ObjectId): string => {
  const payload = { userId: userId.toString() };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
