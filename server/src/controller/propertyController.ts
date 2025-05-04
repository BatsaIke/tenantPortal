import { Request, Response } from 'express';
import * as propertyService from '../services/propertyService.js';

export const createProperty = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const property = await propertyService.createProperty(req.body, req.user.id);
      res.status(201).json(property);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
};
  
export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      
      const properties = await propertyService.getPropertiesByTenant(req.user.id);
      res.json(properties);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};