import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'CLIENT',
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: path.resolve(path.resolve(__dirname), 'src'),
      },
    ],
  },
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
    proxy: {
      '^/auth-api/.*': 'http://localhost:3001',
    },
  },
})
