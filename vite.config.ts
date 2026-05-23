import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/n8n-webhook': {
        target: 'https://n8n.srv981435.hstgr.cloud',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/webhook/7a8cc40f-1c4a-4de0-8f76-019b04b2d3d1',
      },
      '/api/n8n-chat-webhook': {
        target: 'https://n8n.srv981435.hstgr.cloud',
        changeOrigin: true,
        secure: true,
        rewrite: () => '/webhook/b4335600-531b-497e-a649-96359f84e2cd',
      },
    },
  },
});
