// vite.config.js - FIXED VERSION
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Simple chunking logic - no circular dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('lucide')) {
              return 'icons-vendor';
            }
            if (id.includes('axios') || id.includes('@tanstack')) {
              return 'utils-vendor';
            }
            // Everything else in one chunk
            return 'libs-vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    reportCompressedSize: false
  },
  
  server: {
    port: 3000,
    open: true
  }
});