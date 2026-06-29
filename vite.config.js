import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/policy-hunter/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['react-chartjs-2', 'chart.js'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'chartjs': ['chart.js', 'react-chartjs-2'],
          'lucide': ['lucide-react'],
          'react-query': ['react-query'],
          'i18n': ['i18next', 'react-i18next'],
          'react-dom': ['react-dom/client'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
  },
})
