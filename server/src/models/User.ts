// server/src/models/User.ts
import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

/* ── Zod schema (for registration requests) ───────────────────────────── */
export const UserSchemaZod = z.object({
  fullName: z.string().min(3),
  email:    z.preprocess(
    v => (typeof v === 'string' && v.trim() === '' ? undefined : String(v)),
    z.string().email().optional()          // email truly optional
  ),
  phone:    z.string().regex(/^0\d{9}$/, 'Phone must be 10 digits starting with 0'),
  password: z.string().min(8),
});

/* ── TypeScript interface ──────────────────────────────────────────────── */
export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email?: string;          // optional
  phone: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  matchPassword(raw: string): Promise<boolean>;
}

/* ── Mongoose schema ──────────────────────────────────────────────────── */
const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },

    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // allows multiple docs with undefined email
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: { type: String, required: true },

    resetPasswordToken:   { type: String },
    resetPasswordExpires: { type: Date   },
  },
  { timestamps: true }
);

/* ── Hash password before save ────────────────────────────────────────── */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ── Instance method to compare password ─────────────────────────────── */
userSchema.methods.matchPassword = function (raw: string) {
  return bcrypt.compare(raw, this.password);
};

export const User = model<IUser>('User', userSchema);
