import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3001;

// Vercel serverless function handler
export default async (req: any, res: any) => {
  await connectDB();
  return app(req, res);
};

// Local development server
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

      const shutdown = async () => {
        console.log('🛑 Shutting down gracefully...');
        process.exit(0);
      };

      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}