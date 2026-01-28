import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.mjs',
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor_react': ['react', 'react-dom'],
          'vendor_gsap': ['gsap'],
          'vendor_misc': ['lenis', 'framer-motion'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
