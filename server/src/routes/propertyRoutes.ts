import { createProperty, getProperties } from '../controller/propertyController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { PropertySchemaZod } from '../models/Property.js';
import express from 'express';


const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  validateRequest(
    PropertySchemaZod.omit({ status: true, commission: true, tenantId: true, createdAt: true })
  ),
  createProperty 
);

router.get('/', getProperties);

export { router as propertyRouter };
