// server/src/controller/passwordController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

/* ── POST /api/v1/password/request ───────────────────────── */
export const requestReset = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body;
    const { token } = await userService.requestPasswordReset(identifier); // ✅ correct name
    res.json({ message: 'Reset link sent', devToken: token });            // token returned only in dev
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

/* ── POST /api/v1/password/confirm ───────────────────────── */
export const confirmReset = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    await userService.confirmReset(token, password); // ✅ matches service
    res.json({ message: 'Password updated' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
