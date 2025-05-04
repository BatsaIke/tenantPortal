import express from 'express';
import cors    from 'cors';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { propertyRouter } from './routes/propertyRoutes.js';
import { userRouter      } from './routes/authRoutes.js';
import { passwordRouter  } from './routes/passwordRoutes.js';
import { errorHandler    } from './middlewares/errorHandler.js';

/* -------------------------------------------------- */
/* Helpers to reproduce __dirname in native ESM       */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
/* -------------------------------------------------- */

export const createApp = () => {
  const app = express();

  /* ---------------  MIDDLEWARE  -------------------- */
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5173'
          : undefined,     // allow same origin in prod
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /* ------------------- ROUTES ---------------------- */
  app.use('/api/v1/properties', propertyRouter);
  app.use('/api/v1/auth',       userRouter);
  app.use('/api/v1/password',   passwordRouter);

  /* ------------- STATIC FRONTEND (prod) ------------ */
  if (process.env.NODE_ENV === 'production') {
    const clientDist = path.resolve(__dirname, '../../client/dist');
    app.use(express.static(clientDist));

    // send index.html for any “unknown” route so React Router works
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  /* ------------- GLOBAL ERROR HANDLER -------------- */
  app.use(errorHandler);

  return app;
};
