import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html',    // output file
      open: true,                // open in browser after build
      gzipSize: true,             // show gzip sizes
      brotliSize: true             // show brotli sizes
    })
  ],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Bundle vendor dependencies into a separate chunk
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  }
})
