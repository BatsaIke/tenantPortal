import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    console.error('Register Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
   
    
    const { identifier, password } = req.body;
    
    const result = await userService.login(identifier, password);
    res.json(result);
  } catch (err: any) {
    console.error('Login Error:', err.message);
    res.status(401).json({ 
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};

