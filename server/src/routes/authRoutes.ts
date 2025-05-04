import { loginUser, registerUser } from '../controller/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { LoginSchema, RegisterSchema } from '../schema/authShema.js';
import express from 'express';

const router = express.Router();

router.post('/register', validateRequest(RegisterSchema), registerUser);
router.post('/login',    validateRequest(LoginSchema),    loginUser);

export { router as userRouter };
