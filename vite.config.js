// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0', // Listen on all network interfaces
//     port: 5173,      // Default port, can be customized
//   },
// })

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: false, // Disable HTTPS in production
    proxy: {
      '/api': {
        target: 'http://your-api-url', // Your backend API URL
        changeOrigin: true,
        secure: false, // Allow insecure (HTTP) backend communication
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
