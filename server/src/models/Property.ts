import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

// Zod validation schema
export const PropertySchemaZod = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  location: z.string().min(3).max(100),
  images: z.array(z.string().url()).min(1),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  commission: z.number().min(0).max(100).default(10),
  tenantId: z.string(),
  createdAt: z.date().optional(),
});

export type IProperty = z.infer<typeof PropertySchemaZod>;

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: { type: [String], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  commission: { type: Number, default: 10 },
  tenantId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Property = mongoose.model<IProperty>('Property', PropertySchema);