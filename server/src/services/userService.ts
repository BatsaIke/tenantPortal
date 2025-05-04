// server/src/services/userService.ts
import { IUser, User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { sendResetEmail } from '../utils/mailer.js';
import crypto from 'crypto';


/* ───────────────────────── Register ───────────────────────── */
export const register = async (data: Partial<IUser>) => {
  const user  = await User.create(data);
  const token = generateToken(user._id);
  return { token, user: sanitize(user) };
};

/* ────────────────────────── Login ─────────────────────────── */
export const login = async (identifier: string, password: string) => {
  const user =
    (await User.findOne({ email: identifier })) ||
    (await User.findOne({ phone: identifier }));

  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  return { token, user: sanitize(user) };
};

/* ───────────── Password-reset: REQUEST token ─────────────── */
export const requestPasswordReset = async (identifier: string) => {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) throw new Error('User not found');
  
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 30 * 60_000);
    await user.save();
  
    if (process.env.NODE_ENV === 'development') {
      return { token }; // return token for dev/testing
    }
  
    // ✅ Send reset link via email
    if (user.email) {
      await sendResetEmail(user.email, token);
    }
  
    return { message: 'Reset link sent' };
  };
/* ───────────── Password-reset: CONFIRM token ─────────────── */
export const confirmReset = async (token: string, newPassword: string) => {
  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) throw new Error('Token invalid or expired');

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

/* ────────────────────── Helper ───────────────────────────── */
const sanitize = (u: IUser) => ({
  id:       u._id.toString(),
  fullName: u.fullName,
  email:    u.email,
  phone:    u.phone,
});
