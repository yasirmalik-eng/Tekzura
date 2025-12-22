import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Use @ for src
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },

  build: {
    target: 'esnext',
    outDir: 'build',  // Vercel deployment directory
    sourcemap: false, // Optional: disable source maps for production
    minify: 'esbuild', // Default minifier
    rollupOptions: {
      output: {
        manualChunks: undefined // Let Vite handle code splitting
      }
    }
  },

  server: {
    port: 3000,
    open: true
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'clsx',
      'lucide-react',
      'tailwind-merge'
    ]
  }
});
