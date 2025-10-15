import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),
      isProd &&
      visualizer({
        filename: 'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),

    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },

    resolve: {
      alias: isProd
        ? {
          react: 'preact/compat',
          'react-dom': 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react/jsx-runtime': 'preact/jsx-runtime',
        }
        : {},
    },
  }
})