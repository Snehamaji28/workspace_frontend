// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     // Proxying API requests starting with /api to the backend server
  //     '/api': {
  //       target: 'https://workspace-backend-dnj2.onrender.com', // Your backend API
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
