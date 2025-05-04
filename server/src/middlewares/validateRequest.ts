import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

export const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('📥 Incoming body:', req.body);

      req.body = await schema.parseAsync(req.body);  // parse + transform
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('❌ Validation failed:', error.errors);

        // ❌ DON'T return the Response object
        res.status(400).json({
          status: 'fail',
          errors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
        return;         
      }

      next(error);
    }
  };
};
