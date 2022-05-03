import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'CLIENT',
  server: {
    proxy: {
      '^/auth-api/.*': 'http://localhost:3001',
    },
  },
})
