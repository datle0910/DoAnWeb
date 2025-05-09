import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// Check if terser is available
let minify = 'terser';
try {
  require.resolve('terser');
} catch (e) {
  // Fallback to esbuild minifier if terser is not available
  console.warn('Terser not found, falling back to esbuild minifier');
  minify = 'esbuild';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: minify,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Ensure proper file extensions for modules
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
