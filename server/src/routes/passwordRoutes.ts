import { confirmReset, requestReset } from '../controller/passwordController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import express from 'express';
import { z } from 'zod';

const router = express.Router();

router.post(
  '/request',
  validateRequest(z.object({ identifier: z.string().min(3) })),
  requestReset
);

router.post(
  '/confirm',
  validateRequest(
    z.object({
      token:    z.string().min(10),
      password: z.string().min(6),
    })
  ),
  confirmReset
);

export { router as passwordRouter };
