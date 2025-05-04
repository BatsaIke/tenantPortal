import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      '@server': path.resolve(__dirname, '../server')
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../server/public'),
    emptyOutDir: true,
  },
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(
      mode === 'production' ? '/api/v1' : 'http://localhost:3001/api/v1'
    )
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    open: mode === 'development',
  }
}));