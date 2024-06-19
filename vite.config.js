import { defineConfig } from 'vite';
import { resolve } from 'path';
require('dotenv').config()
export default defineConfig({
  publicDir: resolve(__dirname,'./src/universal-client/assets'),
  build: {
    outDir: resolve(__dirname, 'public/dist'),
    rollupOptions: {
      input: resolve(__dirname, './src/universal-client/main.js'),
      output: {
        dir: resolve(__dirname, './public/dist'),
        entryFileNames: 'wn-client.universal.min.js', 
        format: 'iife', // Immediately Invoked Function Expression
        name: 'wnClientUniversal', // The global variable name for the IIFE bundle
      },
    },
    ...(process.env.NODE_ENV==='development'?{}:{minify: 'terser'}), // Use 'terser' for minification
    emptyOutDir: true, // Clean output directory before build
    sourcemap: process.env.NODE_ENV==='development', // Enable/disable source maps (optional)
  }
});