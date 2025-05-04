import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';


dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3001;

/**
 * ✅ 1. Export a default handler for Vercel serverless
 * This is what Vercel uses to invoke your backend
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  return createApp()(req, res);
}

/**
 * ✅ 2. Start local dev server ONLY if not in production (e.g. local nodemon)
 */
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await connectDB();

      app.listen(PORT, () => {
        console.log(`
🚀 Server running in ${process.env.NODE_ENV || 'development'} mode
🔗 API: http://localhost:${PORT}/api/v1
🌍 Web: http://localhost:${PORT}
        `);
      });

      process.on('SIGTERM', () => {
        console.log('🛑 Shutting down...');
        process.exit(0);
      });

      process.on('SIGINT', () => {
        console.log('🛑 Forced exit...');
        process.exit(0);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}
