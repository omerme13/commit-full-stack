import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 5173 falls inside a Windows-reserved port range (5140-5239)
    port: 5300,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
